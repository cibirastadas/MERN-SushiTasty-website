import { Product } from "../models/productModel.js";

export const getAllProducts = async (req, res, next) => {
  try {
    res.json(res.paginatedResults);
  } catch (err) {
    res.json(err);
  }
};

export const getAllProductsByCategory = async (req, res, next) => {
  try {
    res.json(res.paginatedResults);
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
    await product.save();
    res
      .status(200)
      .send({ id: product._id, message: "Produktas buvo sėkmingai sukūrtas" });
  } catch (err) {
    res.json(err);
  }
};

export const deleteProductById = async (req, res, next) => {
  try {
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
        popular: req.body.popular || false,
        categoryId: req.body.category,
      }
    );
    res.status(200).send("Produktas buvo sėkmingai atnaujintas");
  } catch (err) {
    res.json(err);
  }
};
