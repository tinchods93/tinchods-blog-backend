const mongoose = require('mongoose');
const dbConfig = require('../config/db.config');
const generateRoles = require('../helpers/generateRoles');

module.exports = {
  connect: () => {
    try {
      mongoose.connect(dbConfig.dbUri, dbConfig.mongooseOptions).then((x) => {
        generateRoles();
      });

      console.log('Conectado a MongoDB.');
    } catch (error) {
      console.error('Connection error', error);
    }
  },
};
