import mongoose from "mongoose";

const UsersSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["Normal", "Admin", "KitchenWorker", "Courier"],
      default: "Normal",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", UsersSchema);
