/** @format */

"use strict";
const mongoose = require("mongoose");

const connectString =
  "mongodb+srv://cuongbn2011:Bv5J4LxDuiO21b9S@cluster0.haz4uii.mongodb.net/";

class Database {
  constructor() {
    this.connect();
  }

  //connect
  connect() {
    if (1 === 1) {
      mongoose.set("debug", true);
      mongoose.set("debug", { color: true });
    }

    mongoose
      .connect(connectString)
      .then((_) => console.log("Connected Mongodb Success"))
      .catch((err) => console.log("Error connect!"));
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

const instanceMongodb = Database.getInstance();
module.exports = instanceMongodb;
