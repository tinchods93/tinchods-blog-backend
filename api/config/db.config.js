const apiConfig = require('./api.config');

require('dotenv').config();
// const config = require('../../project_config.json');

// let dbName =`${process.env.DB_NAME}-${config.stage}${config.tarea}`;
let dbName =`${process.env.DB_NAME}-${apiConfig.stage}${apiConfig.branch}`;

const dbUri = `${process.env.DB_ACCESS_DATA}.mongodb.net/${dbName}?retryWrites=true&w=majority`;

const mongooseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

module.exports = {
  dbUri,
  mongooseOptions,
};
