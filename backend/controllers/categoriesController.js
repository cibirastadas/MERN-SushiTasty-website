import Category from "../models/categoryModel.js";

export const getAllCategories = async (req, res, next) => {
  let category;
  try {
    if (req.params.id === "names") {
      category = await Category.find({}).select("name");
      category = category.map((item) => ({ name: item.name, value: item._id }));
    } else {
      category = await Category.find().lean().populate("products");
    }
    res.json(category);
  } catch (err) {
    res.json({ msg: err });
  }
};

export const createNewCategory = async (req, res, next) => {
  const category = Category({
    name: req.body.name,
    path: req.body.path,
  });
  try {
    await category.save();
    res.json(200);
  } catch (err) {
    res.json({ message: err });
  }
};

export const deleteCategorykById = async (req, res, next) => {
  try {
    await Category.deleteOne({ _id: req.params.id });
    res.json(200);
  } catch (err) {
    res.json({ msg: err });
  }
};

export const updateCategoryById = async (req, res, next) => {
  try {
    await Category.updateOne(
      { _id: req.params.id },
      { name: req.body.name, path: req.body.path },
      { multi: false, runValidators: true, omitUndefined: true }
    );
    res.json(200);
  } catch (err) {
    res.json({ msg: err });
  }
};
