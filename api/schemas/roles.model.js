const { Schema, model } = require('mongoose');
const constants = require('../commons/constants');
const collections = require('../resources/collections');

const Role = new Schema(
  {
    _id: {
      type: String,
    },
    name: String,
  },
  { _id: false }
);

module.exports = model(collections(constants.ROLES), Role);
