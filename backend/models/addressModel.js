import mongoose from "mongoose";

const AddressSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    city: {
      type: String,
      required: false,
    },
    street: {
      type: String,
      required: false,
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    additionalInformation: {
      type: String,
      required: false,
    },
    addressType: {
      type: String,
      enum: ["Home", "Work", "Other"],
      default: "Other",
    },
  },
  { timestamps: true }
);

export const addressSchema = AddressSchema;
export default mongoose.model("Address", AddressSchema);
