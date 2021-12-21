import User from "../models/usersModel.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.json({ msg: err });
  }
};
