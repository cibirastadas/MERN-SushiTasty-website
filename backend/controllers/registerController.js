import Users from "../models/usersModel.js";
import { hash } from "bcrypt";
export const createNewUser = async (req, res, next) => {
  try {
    const findUser = await Users.findOne({ email: req.body.email });
    if (findUser) {
      return res.status(400).send("Netinkamas elektroninis paštas");
    }
    const hashedPassword = await hash(req.body.password, 10);
    const user = Users({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    await user.save();
    res.status(200).json("Registracija buvo sekminga, prašome prisijungti");
  } catch (err) {
    next(err);
  }
};
