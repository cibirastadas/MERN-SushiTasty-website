import mongoose from "mongoose";
import { productSchema } from "./productModel.js";
const OrderProductsSchema = mongoose.Schema({
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
  },
  product: productSchema,
});

export default mongoose.model("OrderProduct", OrderProductsSchema);
