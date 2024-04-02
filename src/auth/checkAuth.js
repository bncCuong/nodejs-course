/** @format */

'use strict';

const { findById } = require('../services/apikey.service');

const HEADER = {
  API_KEY: 'x-api-key',
  AUTHORIZATION: 'authorization',
};

const apiKey = async (req, res, next) => {
  try {
    const key = req.header[HEADER.API_KEY].toString(); // check xem header co' apikey hay khong
    if (!key) {
      return res.status(403).json({
        message: 'Forbidden error',
      }); // neu khong co thi tra ve loi
    }

    // check xem apikey co' ton tai trong database khong
    const objKey = await findById(key);
    if (!objKey) {
      return res.status(403).json({
        message: 'Forbidden error',
      }); // neu khong co thi tra ve loi
    }
    req.objKey = objKey;
    next();
  } catch (error) {}
};
module.exports = apiKey;
