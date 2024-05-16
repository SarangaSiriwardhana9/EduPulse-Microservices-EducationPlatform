import mongoose from "mongoose";
import User from "./Users.js";


const { Schema } = mongoose;

const cardSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: User,
    required: true,
  },
  customerId: {
    type: String,
    required: true,
  },
  SourceId: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Card = mongoose.model("Card", cardSchema);

export default Card;
