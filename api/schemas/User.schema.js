const { Schema, model } = require('mongoose');
const collections = require('../resources/collections');
const constants = require('../commons/constants');

const UserSchema = new Schema(
  {
    _id: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
    },
    password: String,
    creation_date: String,
    roles: [{
      type: String,
      ref: collections(constants.ROLES),
    }],
  },
  {
    _id: false,
  }
);

module.exports = model(collections(constants.USERS), UserSchema);
