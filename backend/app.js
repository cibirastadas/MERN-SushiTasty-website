const express = require("express");
const app = express();
const mongoose = require("mongoose")
const bodyParser = require("body-parser")
const homeRoute = require("./routes/homeRoute")

const logins = require("./routes/loginsRoute")
const register = require("./routes/registerRoute")
const products = require("./routes/productsRoute")
const feedbacks = require("./routes/feedbacksRoute")

const cors = require("cors");
const AppError = require("./utils/appError");
require("dotenv/config")


app.use(cors());
app.use(bodyParser.json());


/* Home */

app.use("/", homeRoute)

/* Login */

app.use("/login", logins) 

/* Register */

app.use("/register", register) 

/* Products */

app.use("/products", products)

/* Feedbacks */

app.use("/feedbacks", feedbacks) 

/* Random route*/

app.all("*", (req, res, next)=>{
  const err = new AppError(`requested url ${req.path} not found`, 404)
  next(err)/* priima errora ir iskviexiu konkrecia middleware, jei nenurodau iskviecia kita middleware*/
})

/* Error handler */

app.use((err, req, res, next)=>{
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: 0,
    message: err.message,
    stack: err.stack
  })
})

/* Connect to DB */
mongoose.connect(process.env.DB_CONNECTION,
  {useNewUrlParser: true,useUnifiedTopology: true}, 
()=> console.log("Connected to database"))

/* Connect to Heroku */


/* Connect to server */
app.listen(process.env.PORT || 5000, ()=>console.log("Connected to server"))
