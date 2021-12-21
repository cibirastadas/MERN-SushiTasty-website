import { Product } from "../models/productModel.js";
import Category from "../models/categoryModel.js";
export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.json(err);
  }
};

export const getAllSelectedProducts = async (req, res, next) => {
  try {
    const products = await Product.find({ _id: { $in: req.body } });
    res.json(products);
  } catch (err) {
    res.json(err);
  }
};

export const createNewProduct = async (req, res, next) => {
  try {
    const product = Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      image: req.body.image,
      units: req.body.units || 0,
      amount: req.body.amount || 0,
      popular: req.body.popular,
      categoryId: req.body.category,
    });
    const category = await Category.findById(req.body.category);
    category.products.push(product._id);
    await product.save();
    await category.save();
    res
      .status(200)
      .send({ id: product._id, message: "Produktas buvo sėkmingai sukūrtas" });
  } catch (err) {
    res.json(err);
  }
};

export const deleteProductById = async (req, res, next) => {
  try {
    const category = await Category.findOne().populate({
      path: "products",
      match: {
        _id: req.params.id,
      },
    });
    category.products.pull({ _id: req.params.id });
    category.save();
    await Product.deleteOne({ _id: req.params.id });
    res.status(200).send("Produktas buvo sėkmingai ištryntas");
  } catch (err) {
    res.json(err);
  }
};
export const updateProductById = async (req, res, next) => {
  try {
    await Product.updateOne(
      { _id: req.params.id },
      {
        name: req.body.name,
        description: req.body.description,
        price: req.body.price || 0,
        image: req.body.image,
        units: req.body.units || 0,
        amount: req.body.amount || 0,
        popular: req.body.popular,
        categoryId: req.body.category,
      }
    );
    if (req.body.category !== req.body.categoryId) {
      Category.findByIdAndUpdate(req.body.categoryId, {
        $pull: { products: req.params.id },
      });
      Category.findByIdAndUpdate(req.body.category, {
        $push: { products: req.params.id },
      });
    }
    res.status(200).send("Produktas buvo sėkmingai atnaujintas");
  } catch (err) {
    res.json(err);
  }
};
