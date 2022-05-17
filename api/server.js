const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');
const path = require('path');
const apiConfig = require('./config/api.config');
const database = require('./database/db');
/* Routers */
const userRouter = require('./routes/users.routes');
//DB
database.connect();
//Express config
const app = express();

// const corsOptions = {
//   origin: 'http://localhost:3000',
//   methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
//   credentials: true,
// };
//middlewares
app.use(express.static(path.resolve(__dirname, './public')));
// app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));



/* Routes */
app.use(`/${apiConfig.basePath}/auth`, userRouter);

//Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`El servidor esta corriendo en el puerto: ${PORT}.`);
});

module.exports = { app };
