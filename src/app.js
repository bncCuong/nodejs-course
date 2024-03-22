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

//init db
require("./dbs/init.mongodb");

const { countConnect, checkOverLoad } = require("./helpers/check.connect");
//handle error

//init routes

module.exports = app;
