const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');
const cors = require("cors");
const path = require('path');
const { basePath } = require('./config/api.config');
const database = require('./database/db');
/* Routers */
const authRouter = require('./routes/auth.routes');
const usersRouter = require('./routes/user.routes');
const adminRouter = require('./routes/admin.routes');
//DB
database.connect();
//Express config
const app = express();

const corsOptions = {
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'DELETE', 'PATCH'],
  credentials: true,
};
//middlewares
app.use(express.static(path.resolve(__dirname, './public')));
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));
app.use(function (req, res, next) {
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, Content-Type, Accept, Authorization',    
  );
  next();
});

/* Routes */
app.use(`/${basePath}/auth`, authRouter);
app.use(`/${basePath}/users`, usersRouter);
app.use(`/${basePath}/management`, adminRouter);

//Start server
const PORT = process.env.PORT ?? 4000;
app.listen(PORT, () => {
  console.log(`El servidor esta corriendo en el puerto: ${PORT}.`);
  console.log(`basePath: /${basePath}/`);
});

module.exports = { app };
