import Stripe from "stripe";
import Card from "../models/cardDetailsModal.js";
import PaymentTransaction from "../models/paymentTransaction.js";
import { sendEmail } from "./emailService.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2020-08-27",
});

// save Card details in database
const saveCardDetailsDb = async (userId, customerId, SourceId) => {
  try {
    const card = new Card({ userId, customerId, SourceId });
    const response = await card.save();
    return {
      message: "Card details saved successfully",
      data: response,
    };
  } catch (error) {
    return {
      message: "Failed to save card details",
    };
  }
};

// save payment transaction in database
const savePaymentTransaction = async (transaction) => {
  try {
    const paymentTransaction = new PaymentTransaction(transaction);
    const response = await paymentTransaction.save();
    return {
      message: "Payment transaction saved successfully",
      data: response,
    };
  } catch (error) {
    return {
      message: "Failed to save payment transaction",
    };
  }
};

// save Card details in stripe
const saveCard = async (card) => {
  const { token, userId } = card;
  try {
    const customer = await stripe.customers.create({
      source: token,
    });

    //find customer id and source id
    const customerId = customer.id;
    const SourceId = customer.default_source;

    // Save the card details in the database
    await saveCardDetailsDb(userId, customerId, SourceId);

    // Handle success
    return {
      message: "Card saved successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to save card",
    };
  }
};

// Endpoint to retrieve card details by customer ID in stripe
const getCard = async (userId) => {
  // Get the customer ID from the database
  const card = await Card.findOne({ userId });

  const customerId = card.customerId;
  const SourceId = card.SourceId;

  console.log(customerId, SourceId);

  //   Retrieve the card details using the customer ID
  try {
    const cardDetails = await stripe.customers.retrieveSource(
      customerId,
      SourceId
    );
    return cardDetails;
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to get card details",
    };
  }
};

//update card details
const updateCardDetails = async (userId, updatedCardDetails) => {
  //find customer id  by user id
  const card = await Card.findOne({ userId });

  if (!card) {
    return {
      message: "Card details not found",
    };
  }

  const customerId = card.customerId;
  const cardSourceId = card.SourceId;

  try {
    // Create a new card source with the updated card details
    const newSource = await stripe.customers.createSource(customerId, {
      source: updatedCardDetails.token,
    });

    // Set the new card source as the default source for the customer
    await stripe.customers.update(customerId, {
      default_source: newSource.id,
    });

    //find old card source details using card source id
    const oldCardSource = await stripe.customers.retrieveSource(
      customerId,
      cardSourceId
    );

    const oldCardSourceId = oldCardSource.id;

    // Detach the old card source from the customer
    await stripe.customers.deleteSource(customerId, oldCardSourceId);

    //update card details in database
    await Card.findOneAndUpdate(
      { userId },
      { customerId, SourceId: newSource.id }
    );

    return {
      message: "Card details updated successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to update card details",
      error: error.message,
    };
  }
};

//delete card details from stripe
const deleteCard = async (userId) => {
  //find customer id  by user id
  const card = await Card.findOne({ userId });

  if (!card) {
    return {
      message: "Card details not found",
    };
  }

  const customerId = card.customerId;
  const cardSourceId = card.SourceId;

  try {
    //delete card source from stripe
    await stripe.customers.deleteSource(customerId, cardSourceId);

    //delete card details from database
    await Card.findOneAndDelete({ userId });

    return {
      message: "Card details deleted successfully",
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to delete card details",
      error: error.message,
    };
  }
};

//create a payment intent
const createPaymentIntent = async (userId, amount, courseId) => {
  //find  customer id  by user id
  const card = await Card.findOne({ userId });

  if (!card) {
    return {
      message: "Card details not found",
    };
  }

  const customerId = card.customerId;
  const cardSourceId = card.SourceId;

  amount = amount * 100;

  const currency = "usd";
  const description = `Payment for course ${courseId}`;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      customer: customerId,
      payment_method: cardSourceId,
      description,
      confirm: true,
    });

    // Save the payment transaction in the database
    const transaction = {
      transactionId: paymentIntent.id,
      userId,
      amount,
      courseId,
      status: paymentIntent.status,
    };

    // Save the payment transaction in the database
    const response =  await savePaymentTransaction(transaction);

    //send email to user
    await sendEmail(
      "imesh6687@gmail.com",
      "Payment Confirmation",
      `Your payment of $${
        amount / 100
      } for course ${courseId} has been successfully processed`,
      `<p>Your payment of $${
        amount / 100
      } for course ${courseId} has been successfully processed</p>`
    );

    return {
      message: "Payment intent created successfully",
      data: response.data,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to create payment intent",
      error: error.message,
    };
  }
};

//cancel payment transaction by id
const cancelPaymentTransaction = async (userId, transactionId) => {
  //find the transaction by userId and transactionId
  let paymentTransaction = await PaymentTransaction.findOne({
    userId,
    transactionId,
  });

  if (!paymentTransaction) {
    return {
      message: "Payment transaction not found",
    };
  }

  //refund the payment transaction
  try {
    const refund = await stripe.refunds.create({
      payment_intent: transactionId,
      amount: paymentTransaction.amount,
    });

    //update the payment transaction status
    const updatedTransaction = await PaymentTransaction.findOneAndUpdate(
      { userId, transactionId },
      { $set: { status: "refunded", refundId: refund.id } },
      { new: true } // Return the updated document
    );

    //send email to user
    await sendEmail(
      "imesh6687@gmail.com",
      "Payment Refund",
      `Your payment of $${paymentTransaction.amount / 100} has been refunded`,
      `<p>Your payment of $${
        paymentTransaction.amount / 100
      } has been refunded</p>`
    );

    return {
      message: "Refund processed successfully",
      data: updatedTransaction,
    };
  } catch (error) {
    console.error(error);
    return {
      message: "Failed to process refund",
      error: error.message,
    };
  }
};

export {
  saveCard,
  getCard,
  updateCardDetails,
  deleteCard,
  createPaymentIntent,
  cancelPaymentTransaction,
};
