import Feedbacks from "../models/feedbacksModel.js";

export const getAllFeedbacks = async (req, res, next) => {
  res.json(res.paginatedResults);
};
export const getFeedbacksForHome = async (req, res, next) => {
  try {
    const feedbacks = await Feedbacks.find().sort("-createdAt").limit(8);
    res.json(feedbacks);
  } catch (err) {
    res.json({ message: err });
  }
};

export const getAllUserFeedbacks = async (req, res, next) => {
  try {
    res.json(res.paginatedResults);
  } catch (err) {
    res.json({ message: err });
  }
};

export const deleteFeedbackById = async (req, res, next) => {
  try {
    await Feedbacks.deleteOne({ _id: req.params.id });
    res.json("Atsiliepimas buvo pašalintas");
  } catch (err) {
    res.json({ msg: err });
  }
};

export const createNewFeedback = async (req, res, next) => {
  try {
    const feedback = Feedbacks({
      user: {
        name: req.body.user.name,
        _id: req.body.user.userId,
      },
      userUpdatedAt: req.body.userUpdatedAt,
      rating: req.body.rating,
      userText: req.body.userText,
    });
    await feedback.save();
    res.json("Atsiliepimas buvo sekmingai paliktas");
  } catch (err) {
    res.json({ message: err });
  }
};

export const updatFeedbackById = async (req, res, next) => {
  try {
    await Feedbacks.updateOne(
      { _id: req.params.id },
      {
        $set: {
          userUpdatedAt: req.body.userUpdatedAt,
          adminUpdatedAt: req.body.adminUpdatedAt,
          rating: req.body.rating,
          userText: req.body.userText,
          adminText: req.body.adminText,
          response: req.body.response,
        },
      }
    );
    res.json("Atsiliepimas buvo atnaujintas");
  } catch (err) {
    res.json({ msg: err });
  }
};
