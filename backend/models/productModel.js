import mongoose from "mongoose";

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    image: {
      type: String,
      required: true,
    },
    units: {
      type: Number,
      required: false,
      default: 0,
    },
    amount: {
      type: Number,
      required: false,
      default: 0,
    },
    popular: {
      type: Boolean,
      default: false,
    },
    categoryId: { type: mongoose.Schema.Types.ObjectId },
  },
  { timestamps: true }
);
export const productSchema = ProductSchema;
export const Product = mongoose.model("Product", ProductSchema);
