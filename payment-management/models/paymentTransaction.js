import mongoose from "mongoose";
import Course from "./course.js";
import User from "./Users.js";

const courseModel = mongoose.model("Course", Course.schema);
const userModel = mongoose.model("User", User.schema);

const paymentTransactionSchema = new mongoose.Schema({
  transactionId: {
    type: String,
    required: true,
  },
  refundId: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: userModel,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  courseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: courseModel,
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