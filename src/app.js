/** @format */

//Khai báo middleware
require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const compression = require("compression");
const helmet = require("helmet");
const app = express();

//init middleware
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);
//init db
require("./dbs/init.mongodb");

//count so connect, check qua tai sever
const { countConnect, checkOverLoad } = require("./helpers/check.connect");
//handle error

//init routes

app.use("/", require("./routes"));

//handle error

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
}); // func bao loi

app.use((error, req, res, next) => {
  const statusCode = error.status || 500;
  return res.status(statusCode).json({
    status: "error",
    code: statusCode,
    error: {
      message: error.message || "Internal Server Error",
    },
  });
}); //func quan ly loi

module.exports = app;
