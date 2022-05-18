const { Schema, model } = require('mongoose');
const collections = require('../resources/collections');

const UserSchema = new Schema(
  {
    _id: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      default: "user"
    },
  },
  {
    versionKey: false,
    _id: false,
  }
);


module.exports = model(collections("USERS"), UserSchema);