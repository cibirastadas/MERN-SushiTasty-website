import express, { urlencoded, json } from "express";
import mongoose from "mongoose";
import authJWT from "./utils/authJWT.js";
import { authAdminRole } from "./utils/authRoles.js";
import logins from "./routes/loginsRoute.js";
import register from "./routes/registerRoute.js";
import products from "./routes/productsRoute.js";
import feedbacks from "./routes/feedbacksRoute.js";
import categories from "./routes/categoriesRoute.js";
import orders from "./routes/ordersRoute.js";
import orderProducts from "./routes/orderProductsRoute.js";
import addresses from "./routes/addressesRoute.js";
import workers from "./routes/workersRoute.js";
import account from "./routes/accountRoute.js";

import cors from "cors";
import AppError from "./utils/appError.js";
import "dotenv/config";
const app = express();
app.use(cors());
app.use(urlencoded({ extended: true, limit: "5mb" }));
app.use(json({ limit: "5mb" }));

app.use("/login", logins);

app.use("/register", register);

app.use("/products", products);

app.use("/feedbacks", feedbacks);

app.use("/categories", categories);

app.use("/order", authJWT, orders);

app.use("/addresses", authJWT, addresses);

app.use("/orderProducts", authJWT, orderProducts);

app.use("/workers", authJWT, authAdminRole, workers);

app.use("/account", authJWT, account);

app.all("*", (req, res, next) => {
  const err = new AppError(`requested url ${req.path} not found`, 404);
  next(err);
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 5000;
  res.status(statusCode).json({
    success: 0,
    message: err.message,
    stack: err.stack,
  });
});

/* Connect to DB */
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to database")
);

/* Connect to server */
app.listen(process.env.PORT || 5000, () => console.log("Connected to server"));
