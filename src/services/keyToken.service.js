/** @format */

'use strict';

const keyTokenModel = require('../models/keyToken.model');
const { Types } = require('mongoose');

//crete token

class KeyTokenService {
  // hàm tạo token
  static createKeyToken = async ({
    userId,
    publicKey,
    privateKey,
    refreshToken,
    accessToken,
  }) => {
    try {
      //convert to string for save database
      // const tokens = await keyTokenModel.create({
      //   user: userId,
      //   publicKey,
      //   privateKey,
      // });
      // return tokens ? tokens.publicKey : null;
      const filter = { user: userId };
      const update = {
        accessToken,
        publicKey,
        privateKey,
        refreshTokensUsed: [],
        refreshToken,
      };
      const options = { upsert: true, new: true }; //  neu chua co thi insert moi, con co roi thi update
      const tokens = await keyTokenModel.findOneAndUpdate(
        filter,
        update,
        options
      );

      return tokens ? tokens.publicKey : null;
    } catch (error) {
      return error;
    }
  };

  //Xoá token khi logout
  static removeTokenById = async (userId) => {
    return await keyTokenModel.deleteOne(userId);
  };

  static findByUserId = async (userId) => {
    return await keyTokenModel.findOne({ user: userId }).lean();
  };

  static findRefreshTokenUsed = async (refreshToken) => {
    return await keyTokenModel
      .findOne({ refreshTokensUsed: refreshToken })
      .lean();
  };

  static deleteRefreshTokenUsedById = async (userId) => {
    return await keyTokenModel.deleteOne({ user: Types.ObjectId(userId) });
  };

  static findByRefreshToken = async (refreshToken) => {
    return await keyTokenModel.findOne({ refreshToken });
  };
}

module.exports = KeyTokenService;
