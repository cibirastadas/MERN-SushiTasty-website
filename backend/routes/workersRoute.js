import { Router } from "express";
import User from "../models/usersModel.js";
import paginateResults from "../utils/paginateResults.js";

import {
  getAllWorkers,
  deleteWorkerById,
  createNewWorker,
  updateWorkerById,
  getWorkerEnums,
} from "../controllers/workersController.js";

const router = Router();

router.get(
  "/",
  paginateResults(User, "role", "-password", [
    "KitchenWorker",
    "Courier",
    "Admin",
  ]),
  getAllWorkers
);

router.get("/roles", getWorkerEnums);

router.post("/", createNewWorker);

router.delete("/:id", deleteWorkerById);

router.patch("/:id", updateWorkerById);

export default router;
