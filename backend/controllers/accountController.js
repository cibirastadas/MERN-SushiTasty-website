import User from "../models/usersModel.js";
import { compare, hash } from "bcrypt";
import jwt from "jsonwebtoken";
export const getAccountById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    res.json(user);
  } catch (err) {
    res.json(err);
  }
};

export const deleteAccountById = async (req, res, next) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.status(200).json("Paskyra buvo sėkmingai ištrinta");
  } catch (err) {
    res.json(err);
  }
};

export const updateAccountPasswordById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!(await compare(req.body.oldPassword, user.password))) {
      return res.status(401).json("Senas slaptažodis nėra atpažintas");
    }
    const hashedPassword = await hash(req.body.password, 10);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json("Slaptažodis sėkmingai atnaujintas");
  } catch (err) {
    res.json(err);
  }
};
export const updateAccountInformationById = async (req, res, next) => {
  try {
    if (req.body.oldPassword) {
      return next();
    }
    const user = await User.findById(req.params.id);
    if (
      user.email !== req.body.email &&
      (await User.findOne({ email: req.body.email }))
    ) {
      return res.status(400).send("Netinkamas elektroninis paštas");
    }
    const accessToken = jwt.sign(
      { name: user.name, role: user.role, id: user.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "90m" }
    );
    user.name = req.body.name;
    user.email = req.body.email;
    await user.save();
    res.status(200).json({
      user: { name: user.name, role: user.role, id: user.id },
      msg: "Informacija sėkmingai atnaujinta",
      accessToken,
    });
  } catch (err) {
    res.json(err);
  }
};
