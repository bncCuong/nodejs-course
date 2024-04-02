/** @format */

'use strict';

const JWT = require('jsonwebtoken');

const createTokenPair = async (payload, publicKey, privateKey) => {
  //publicKey de verify token
  //privateKey de tao token
  //payload mang thong tin tu he thong nay qua he thong khac

  try {
    const accessToken = JWT.sign(payload, publicKey, {
      expiresIn: '2 days',
    });
    const refreshToken = JWT.sign(payload, privateKey, {
      expiresIn: '7 days',
    });

    JWT.verify(accessToken, publicKey, (err, decode) => {
      if (err) {
        console.error('error verify', err);
      } else console.log('decode verify', decode);
    });
    return { accessToken, refreshToken };
  } catch (error) {
    return error;
  }
};

module.exports = { createTokenPair };
