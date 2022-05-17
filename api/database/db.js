const mongoose = require('mongoose');
const dbConfig = require('../config/db.config');

module.exports = {
  connect: async () => {
    try {
      await mongoose.connect(dbConfig.dbUri, dbConfig.mongooseOptions);
      console.log('Conectado a MongoDB.');
    } catch (error) {
      console.error('Connection error', error);
    }
  },
};
