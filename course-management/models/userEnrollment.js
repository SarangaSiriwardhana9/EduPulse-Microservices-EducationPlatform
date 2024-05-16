import mongoose from "mongoose";
import User from "./Users.js";
import Course from "./course.js";
import PaymentTransaction from "./paymentTransaction.js";

// Register the User model with Mongoose
const UserModel = mongoose.models.User || mongoose.model("User", User.schema);
const CourseModel = mongoose.models.Course || mongoose.model("Course", Course.schema);
const PaymentModel = mongoose.models.PaymentTransaction || mongoose.model("PaymentTransaction", PaymentTransaction.schema);

const { Schema } = mongoose;

const courseContentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: UserModel,
    required: true,
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: CourseModel,
    required: true,
  },
  paymentId: {
    type: Schema.Types.ObjectId,
    ref: PaymentModel,
    required: true,
  },
  enrolledOn: {
    type: Date,
    default: Date.now,
  },
  step: {
    type: Number,
    default: 0,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

const UserEnrollment = mongoose.model("UserEnrollment", courseContentSchema);

export default UserEnrollment;