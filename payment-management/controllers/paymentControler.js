import express from "express";
import {
  savePaymentTransaction,
  getAllPaymentTransactions,
  findPaymentTransactionById,
  updatePaymentTransaction,
} from "../services/paymentTransactionService.js";
import {
  saveCard,
  getCard,
  updateCardDetails,
  deleteCard,
  createPaymentIntent,
  cancelPaymentTransaction,
} from "../services/stripeService.js";

const router = express.Router();

//create payment transaction
router.post("/saveTansaction", async (req, res) => {
  const { userId, amount, courseId } = req.body;
  const response = await createPaymentIntent(userId, amount, courseId);
  res.send(response);
});

// get all payment transactions
router.get("/all", async (req, res) => {
  const response = await getAllPaymentTransactions();
  res.send(response);
});

//find payment transaction by id
router.get("/saveTansaction/:id", async (req, res) => {
  const { id } = req.params;
  const response = await findPaymentTransactionById(id);
  res.send(response);
});

//update payment transaction by id
router.put("/saveTansaction/:id", async (req, res) => {
  const { id } = req.params;
  const transaction = req.body;
  const response = await updatePaymentTransaction(id, transaction);
  res.send(response);
});

//cancel payment transaction by id
router.delete("/saveTansaction/cancel", async (req, res) => {
  const { userId, transactionId } = req.body;
  const response = await cancelPaymentTransaction(userId, transactionId);
  res.send(response);
});

//save card details
router.post("/save-card", async (req, res) => {
  const card = req.body;
  const response = await saveCard(card);
  res.send(response);
});

//get card details
router.get("/get-card", async (req, res) => {
  const { userId } = req.query; // Retrieve userId from query parameters
  const response = await getCard(userId);
  res.send(response);
});

// Update card details
router.post("/update-card", async (req, res) => {
  const { userId, updatedCardDetails } = req.body;
  const response = await updateCardDetails(userId, updatedCardDetails);
  res.send(response);
});

//delete card details
router.delete("/delete-card", async (req, res) => {
  const { userId } = req.body;
  const response = await deleteCard(userId);
  res.send(response);
});

export default router;
