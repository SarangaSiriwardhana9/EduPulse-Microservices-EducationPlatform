import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["user", "admin", "creator"],
    default: "user",
  },
});

export default mongoose.model("User", userSchema);
