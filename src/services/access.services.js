/** @format */

'use strict';

const shopModel = require('../models/shop.model');

//library ma hoa password thanh ma hash
const bcrypt = require('bcrypt');

//library tao ra key
const KeyTokenService = require('./keyToken.service');
// const { createTokenPair } = require("../auth/authUtils");
const { getInfoData, createToken } = require('../utils');
const { BadRequestError, AuthFailureError } = require('../core/error.response');
const findByEmail = require('./shop.service');

const RoleShop = {
  SHOP: 'SHOP',
  WRITER: '0001',
  EDITOR: 'EDITOR',
  ADMIN: 'ADMIN',
};

class AccessServices {
  // đăng ký tài khoản shop
  static signUp = async ({ name, email, password }) => {
    // try {
    //step1: check email exists
    const holderShop = await shopModel.findOne({ email }).lean();
    if (holderShop) {
      throw new BadRequestError('Error: Shop already registered!');
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

      const { tokens, publicKey } = await createToken(newShop._id, email);

      const keyStore = await KeyTokenService.createKeyToken({
        userId: newShop._id,
        publicKey,
      });
      if (!keyStore) {
        throw new BadRequestError('Error: Shop already registered!');
      } //Neu tao key that bai thi send error ve

      //neu tao key thanh cong thi tao cap accessToken va refreshToken
      // const tokens = await createTokenPair(
      //   {
      //     userId: newShop._id,
      //     email,
      //   },
      //   publicKey,
      //   privateKey
      // );

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
    // } catch (error) {
    //   return {
    //     code: "xxx",
    //     message: error.message,
    //     status: error,
    //   };
    // }
  };

  static login = async ({ email, password, refreshToken = null }) => {
    /**
     * 1. Kiểm tra email có tồn tại không
     * 2. Kiểm tra password có đúng không
     * 3. Create token pair: accessToken, refreshToken
     * 4. Generate token pair
     * 5. Get data và return login
     */
    //step1: check email exists
    const foundShop = await findByEmail({ email });
    if (!foundShop) {
      throw new BadRequestError('Error: Shop not exists!');
    }

    //step2: check password
    const matchPassword = await bcrypt.compare(password, foundShop.password);

    if (!matchPassword) {
      throw new AuthFailureError('Error: Authentication Error!');
    }

    //step3 + 4 : create token pair
    const { tokens, publicKey, privateKey } = await createToken(
      foundShop._id,
      email
    );

    await KeyTokenService.createKeyToken({
      refreshToken: publicKey,
      userId: foundShop._id,
      publicKey,
      privateKey,
    });
    return {
      metadata: {
        shop: getInfoData(['name', 'email', '_id'], foundShop),
        tokens,
      },
    };
  };

  static logout = async (keyStore) => {
    const delKey = await KeyTokenService.removeTokenById(keyStore.userId);
    console.log(`::P::DelKey::`, delKey);
    return delKey;
  };
}

module.exports = AccessServices;
