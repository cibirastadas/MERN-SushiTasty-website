import mongoose from "mongoose";
import { addressSchema } from "../models/addressModel.js";
const OrderChema = mongoose.Schema(
  {
    total: {
      type: Number,
      required: true,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    deliveryType: {
      type: String,
      enum: ["DeliveryHome", "TakeAwayHome", "EatInside"],
      default: "DeliveryHome",
    },
    deliveryAddress: { type: addressSchema, required: false },
    trackOrder: {
      type: String,
      enum: [
        "Draft",
        "Ordered",
        "Canceled",
        "Preparing",
        "Prepared",
        "Delivery",
        "Completed",
      ],
      default: "Draft",
    },
    paymentMethod: {
      type: String,
      enum: ["PayLocally"],
      default: "PayLocally",
    },
    timeToMake: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderChema);
