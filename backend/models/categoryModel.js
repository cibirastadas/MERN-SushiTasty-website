import mongoose from "mongoose";

const CategorySchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    path: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Category", CategorySchema);
