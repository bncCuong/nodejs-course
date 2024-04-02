/** @format */

'use strict';

const shopModel = require('../models/shop.model');

//library ma hoa password thanh ma hash
const bcrypt = require('bcrypt');

//library tao ra key
const crypto = require('node:crypto');
const KeyTokenService = require('./keyToken.service');
const { createTokenPair } = require('../auth/authUtils');
const { getInfoData } = require('../utils');

const RoleShop = {
  SHOP: 'SHOP',
  WRITER: '0001',
  EDITOR: 'EDITOR',
  ADMIN: 'ADMIN',
};

class AccessServices {
  static signUp = async ({ name, email, password }) => {
    try {
      //step1: check email exists
      const holderShop = await shopModel.findOne({ email }).lean();
      if (holderShop) {
        return {
          code: 'xxxx',
          message: 'Shop already registered!',
        };
      }
      //10 - do kho' cua thuat toan hash
      const passwordHash = await bcrypt.hash(password, 10);

      //khoi tao 1 new shop
      const newShop = await shopModel.create({
        name,
        password: passwordHash,
        email,
        role: [RoleShop.SHOP],
      });

      if (newShop) {
        //create privatekey and punlicKey
        // const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
        //   modulusLength: 4096,
        //   publicKeyEncoding: {
        //     type: 'pkcs1',
        //     format: 'pem',
        //   },
        //   privateKeyEncoding: {
        //     type: 'pkcs1',
        //     format: 'pem',
        //   },
        // });
        // console.log({ privateKey, publicKey });

        const privateKey = crypto.randomBytes(64).toString('hex');
        const publicKey = crypto.randomBytes(64).toString('hex');

        const keyStore = await KeyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey,
        });
        if (!keyStore) {
          return {
            code: 'xxxx',
            message: 'Error',
          };
        } //Neu tao key that bai thi send error ve

        //neu tao key thanh cong thi tao cap accessToken va refreshToken
        const tokens = await createTokenPair(
          {
            userId: newShop._id,
            email,
          },
          publicKey,
          privateKey
        );
        console.log('Created Tokens Success::', tokens);
        return {
          code: 201,
          metadata: {
            //neu muon lay 1 so thong tin thif dung getinfoData
            shop: getInfoData(['name', 'email', '_id'], newShop),
            tokens,
          },
        };
      } // nếu khởi tạo thành công shop, thì sẽ tạo 1 accessToken, refreshToken cho user sử dụng để truy cập vào hệ thống

      return {
        code: 200,
        metadata: null,
      };
    } catch (error) {
      return {
        code: 'xxx',
        message: error.message,
        status: error,
      };
    }
  };
}

module.exports = AccessServices;
