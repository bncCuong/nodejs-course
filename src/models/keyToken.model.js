/** @format */

'use strict';

const { Schema, model } = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'Key';
const COLLECTION_NAME = 'Keys';

// Declare the Schema of the Mongo model
var keyTokenSchema = Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'SHOP',
    },
    publicKey: {
      type: String,
      required: true,
    },
    privateKey: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      required: true,
    },
    accessToken: {
      type: String,
      required: true,
    },
    refreshTokensUsed: {
      type: Array,
      default: [], // RT da su dung
    },
  },
  {
    conllection: COLLECTION_NAME,
    timestamps: true,
  }
);

//Export the model
module.exports = model(DOCUMENT_NAME, keyTokenSchema);
