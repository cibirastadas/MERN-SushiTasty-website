import { Router } from "express";
const router = Router();
/* middlewares */
import authJWT from "../utils/authJWT.js";
import {
  getAllFeedbacks,
  getAllUserFeedbacks,
  deleteFeedbackById,
  createNewFeedback,
  updatFeedbackById,
  getFeedbacksForHome,
} from "../controllers/feedbacksController.js";

router.get("/", authJWT, getAllFeedbacks);

router.get("/home", getFeedbacksForHome);

router.get("/:userId", authJWT, getAllUserFeedbacks);

router.post("/", authJWT, createNewFeedback);

router.delete("/:id", authJWT, deleteFeedbackById);

router.patch("/:id", authJWT, updatFeedbackById);

export default router;
