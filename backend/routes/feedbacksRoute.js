import { Router } from "express";
import Feedbacks from "../models/feedbacksModel.js";
import authJWT from "../utils/authJWT.js";
import paginateResults from "../utils/paginateResults.js";
import { authAdminRole, authAdminAndNormalRole } from "../utils/authRoles.js";
const router = Router();
import {
  getAllFeedbacks,
  getAllUserFeedbacks,
  deleteFeedbackById,
  createNewFeedback,
  updatFeedbackById,
  getFeedbacksForHome,
} from "../controllers/feedbacksController.js";

router.get(
  "/",
  authJWT,
  authAdminRole,
  paginateResults(Feedbacks),
  getAllFeedbacks
);

router.get("/home", getFeedbacksForHome);

router.get(
  "/:userId",
  authJWT,
  authAdminAndNormalRole,
  paginateResults(Feedbacks, "user._id"),
  getAllUserFeedbacks
);

router.post("/", authJWT, authAdminAndNormalRole, createNewFeedback);

router.delete("/:id", authJWT, authAdminAndNormalRole, deleteFeedbackById);

router.patch("/:id", authJWT, authAdminAndNormalRole, updatFeedbackById);

export default router;
