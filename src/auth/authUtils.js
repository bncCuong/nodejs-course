/** @format */

'use strict';

const JWT = require('jsonwebtoken');
const asyncHanlder = require('../helpers/asyncHandler');
const { AuthFailureError, NotFound } = require('../core/error.response');
const KeyTokenService = require('../services/keyToken.service');

const HEADER = {
  API_KEY: 'x-api-key',
  AUTHORIZATION: 'authorization',
  CLIENT_ID: 'x-client-id',
  REFRESH_TOKEN: 'refreshtoken',
};

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

const authentication = asyncHanlder(async (req, res, next) => {
  /**
   * 1. Check userId có tồn tại không
   * 2. Get accessToken
   * 3. Verify Token
   * 4. Check user in dbs
   * 5. Check keystore with ủserId
   * 6. Return next()
   */

  //1. Check userId có tồn tại không
  const userId = req.headers[HEADER.CLIENT_ID];
  if (!userId) throw new AuthFailureError('Error: Invalid User id!');

  //2. Get accessToken
  const keyStore = await KeyTokenService.findByUserId(userId);
  if (!keyStore) throw new NotFound('Not Found: Key store!');

  if (req.headers[HEADER.REFRESH_TOKEN]) {
    const refreshToken = req.headers[HEADER.REFRESH_TOKEN];

    console.log(1234);
    const decodedUser = JWT.verify(refreshToken, keyStore.privateKey);
    console.log(decodedUser, 'decodedUser123');

    if (userId !== decodedUser?.userId)
      throw new AuthFailureError('Error: Invalid UserId!');

    req.keyStore = keyStore;
    req.userId = decodedUser.userId;
    req.refreshToken = refreshToken;
    return next();
  }

  //3. Verify Token
  const accessToken = req.headers[HEADER.AUTHORIZATION];
  if (!accessToken) throw new AuthFailureError('Error: Invalid AccessToken!');

  //4. Check user in dbs
  try {
    JWT.verify(accessToken, keyStore.privateKey, function (decodedUser) {
      if (userId !== decodedUser?.userId)
        throw new "AuthFailureError('Error: Invalid UserId!')"();
      req.keyStore = keyStore;
      return next();
    });
  } catch (error) {
    console.log(error, 'error');
    throw error;
  }
});

const verifyJWT = async (refreshToken, secretToken) => {
  return JWT.verify(refreshToken, secretToken);
};
module.exports = { createTokenPair, authentication, verifyJWT };
