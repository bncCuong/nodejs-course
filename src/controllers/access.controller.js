/** @format */

'use strict';

const { CREATED, succsessReponse } = require('../core/success.reponse');
const AccessServices = require('../services/access.services');

class AccessController {
  handleRefreshToken = async (req, res, next) => {
    new succsessReponse({
      message: 'Get refresh token successfully!',
      metadata: await AccessServices.refreshToken({
        refreshToken: req.refreshToken,
        user: req.user,
        keyStore: req.keyStore,
      }),
    }).send(res);
  };

  logout = async (req, res, next) => {
    new succsessReponse({
      message: 'Logout successfully!',
      metadata: await AccessServices.logout(req.keyStore),
    }).send(res);
  };

  login = async (req, res, next) => {
    new succsessReponse({
      metadata: await AccessServices.login(req.body),
    }).send(res);
  };

  signUp = async (req, res, next) => {
    new CREATED({
      message: 'Registed successfully!',
      metadata: await AccessServices.signUp(req.body),
      options: {
        limit: 10,
      },
    }).send(res);

    // return res.status(201).json(await AccessServices.signUp(req.body));
  };
}

module.exports = new AccessController();
