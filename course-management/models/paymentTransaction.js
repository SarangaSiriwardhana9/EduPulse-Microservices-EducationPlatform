import mongoose from "mongoose";

const paymentTransactionSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: true,
  },
  refundId: {
    type: String,
  },
  userId: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  courseId: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const PaymentTransaction = mongoose.model(
  "PaymentTransaction",
  paymentTransactionSchema
);

export default PaymentTransaction;