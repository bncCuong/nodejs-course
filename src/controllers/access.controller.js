/** @format */

"use strict";

const { CREATED } = require("../core/success.reponse");
const AccessServices = require("../services/access.services");

class AccessController {
  signUp = async (req, res, next) => {
    new CREATED({
      message: "Registed successfully!",
      metadata: await AccessServices.signUp(req.body),
      options: {
        limit: 10,
      },
    }).send(res);

    // return res.status(201).json(await AccessServices.signUp(req.body));
  };
}

module.exports = new AccessController();
