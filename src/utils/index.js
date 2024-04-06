/** @format */

const _ = require("lodash");
const { createTokenPair } = require("../auth/authUtils");
const crypto = require("node:crypto");

const getInfoData = (fields = [], object = {}) => {
  return _.pick(object, fields);
}; // Function get someinfo

const httpStatusCode = {
  StatusCodes: require("../constants/statusCode"),
  ReasonPhrases: require("../constants/reasonPhrases"),
};

const createToken = async (id, email) => {
  const privateKey = crypto.randomBytes(64).toString("hex");
  const publicKey = crypto.randomBytes(64).toString("hex");
  const tokens = await createTokenPair(
    {
      userId: id,
      email,
    },
    privateKey,
    publicKey
  );
  return { tokens, privateKey, publicKey };
};

module.exports = {
  getInfoData,
  httpStatusCode,
  createToken,
};
