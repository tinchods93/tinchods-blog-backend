const { Schema, model } = require('mongoose');
const config = require('../config/auth.config');
const collections = require('../resources/collections');
const constants = require('../commons/constants');
const { v4: uuid } = require('uuid');

const RefreshTokenSchema = new Schema(
  {
    _id: {
      type: String,
    },
    token: String,
    user: {
      type: String,
      ref: collections(constants.USERS),
    },
    expiryDate: Date,
  },
  { _id: false }
);

RefreshTokenSchema.statics.createToken = async function (user) {
  let expiredAt = new Date();

  expiredAt.setSeconds(expiredAt.getSeconds() + config.jwtRefreshExpiration);

  let _token = uuid();

  let payload = new this({
    _id: uuid(),
    token: _token,
    user: user._id,
    expiryDate: expiredAt.getTime(),
  });

  let refreshToken = await payload.save();

  return refreshToken;
};

RefreshTokenSchema.statics.verifyExpiration = (token) => {
  return token.expiryDate.getTime() < new Date().getTime();
};

const RefreshToken = model(
  collections(constants.REFRESH_TOKEN),
  RefreshTokenSchema
);

module.exports = RefreshToken;
