import mongoose from "mongoose";

const FeedbacksSchema = mongoose.Schema({
  user: {
    name: { type: String },
    _id: { type: mongoose.Schema.Types.ObjectId },
  },
  rating: { type: String, required: true },
  userText: { type: String, required: true },
  adminText: { type: String, required: false },
  response: { type: Boolean, default: false },
  adminUpdatedAt: {
    type: Date,
  },
  userUpdatedAt: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Feedbacks", FeedbacksSchema);
