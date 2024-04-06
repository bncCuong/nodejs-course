/** @format */

"use strict";

const { findById } = require("../services/apikey.service");

const HEADER = {
  API_KEY: "x-api-key",
  AUTHORIZATION: "authorization",
};

const apiKey = async (req, res, next) => {
  try {
    const key = req.headers[HEADER.API_KEY].toString(); // check xem header co' apikey hay khong
    if (!key) {
      return res.status(403).json({
        message: "Forbidden error",
      }); // neu khong co thi tra ve loi
    }

    // check xem apikey co' ton tai trong database khong
    const objKey = await findById(key);

    if (!objKey) {
      return res.status(403).json({
        message: "Forbidden error",
      }); // neu khong co thi tra ve loi
    }
    req.objKey = objKey;
    return next();
  } catch (error) {
    console.log(error);
  }
};

const checkPermission = (permission) => {
  return (req, res, next) => {
    if (
      !req.objKey.permissions ||
      !req.objKey.permissions.includes(permission)
    ) {
      return res.status(403).json({
        message: "Permission denied ",
      });
    }

    console.log("Permission: ", req.objKey.permissions);
    return next();
  };
}; // hàm check permission của user

const asyncHanlder = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

module.exports = { apiKey, checkPermission, asyncHanlder };
