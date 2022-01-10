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
      throw new AppError("Naudotojas nebuvo rastas, pagal el. paštą", 404);
    }
    if (await compare(req.body.password, user.password)) {
      const accessToken = jwt.sign(
        { name: user.name, role: user.role, id: user.id },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "90m" }
      );
      return res.status(200).json({
        user: { name: user.name, role: user.role, id: user.id },
        message: `Sekmingai prisijungėte: ${user.name}`,
        accessToken,
      });
    }
    throw new AppError("Naudotojo slaptažodis nėra atpažintas", 401);
  } catch (err) {
    next(err);
  }
};
