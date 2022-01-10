import User from "../models/usersModel.js";
import { hash } from "bcrypt";
export const getAllWorkers = async (req, res, next) => {
  res.json(res.paginatedResults);
};

export const deleteWorkerById = async (req, res, next) => {
  try {
    await User.deleteOne({ _id: req.params.id });
    res.status(200).json("Darbuotojas buvo pašalintas");
  } catch (err) {
    res.json(err);
  }
};
export const getWorkerEnums = async (req, res, next) => {
  try {
    res.json(User.schema.path("role").enumValues);
  } catch (err) {
    res.json(err);
  }
};
export const createNewWorker = async (req, res, next) => {
  try {
    const findUser = await User.findOne({ email: req.body.email });
    if (findUser) {
      return res.status(400).send("Netinkamas elektroninis paštas");
    }
    const hashedPassword = await hash(req.body.password, 10);
    const user = User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
      role: req.body.role,
    });
    await user.save();
    res
      .status(200)
      .json({ _id: user._id, msg: "Darbuotojas buvo sėkmingai sukūrtas" });
  } catch (err) {
    res.json(err);
  }
};

export const updateWorkerById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (user.email !== req.body.email && await User.findOne({ email: req.body.email })) {
      return res.status(400).send("Netinkamas elektroninis paštas");
    }
    await User.updateOne(
      { _id: req.params.id },
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          role: req.body.role,
        },
      }
    );
    res.status(200).json("Darbuotojas buvo sėkmingai atnaujintas");
  } catch (err) {
    res.json(err);
  }
};
