/* require("dotenv").config(); */
import Users from "../models/usersModel.js";
import AppError from "../utils/appError.js";
import jwt from "jsonwebtoken";
import { compare } from "bcrypt";
export const findUser = async (req, res, next) => {
  try {
    const user = await Users.findOne({
      email: req.body.email,
    });
    if (user === null) {
      throw new AppError("Naudotojas nebuvo rastas, bandykite dar kartą", 404);
    }
    if (await compare(req.body.password, user.password)) {
      const accessToken = jwt.sign(
        { name: user.name, role: user.role, id: user.id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "90m" }
      );
      res.status(200).json({
        user: { name: user.name, role: user.role, id: user.id },
        accessToken,
      });
      return;
    }
    throw new AppError("Naudotojo slaptažodis nėra atpažintas", 401);
  } catch (err) {
    next(err);
  }
};
