const UserSchema = require('../schemas/user.schema');
const { v4: uuid } = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const RefreshToken = require('../schemas/refreshToken.model');
const authConfig = require('../config/auth.config');
const RolesModel = require('../schemas/Roles.model');
const collections = require('../resources/collections');
const constants = require('../commons/constants');

module.exports = {
  register: async (req, res) => {
    const { email, password } = req.body;
    // Validamos si el email esta en uso
    let existingUser;
    try {
      existingUser = await UserSchema.findOne({ email });
    } catch (error) {
      console.error('SIGNUP ERROR ==>', error);
    }
    if (existingUser) {
      return res.status(409).send('Email already in use');
    }

    // Hasheamos la contraseña
    const hashedPassword = bcrypt.hashSync(password);
    const newUser = new UserSchema({
      _id: uuid(),
      email,
      password: hashedPassword,
    });

    // Buscamos el rol por defecto
    let role;
    let err;
    try {
      role = await RolesModel.findOne({ name: 'user' });
    } catch (error) {
      console.log('ERROR==> ', error);
      err = error;
    }
    // Si no encontramos ese rol, devolvemos un error
    if (err) {
      return res.status(500).send({ message: err });
    }

    // Si lo encontramos, guardamos el id del rol en el usuario
    newUser.roles = [role._id];

    // Guardamos el usuario
    newUser.save((err) => {
      if (err) {
        console.error('SIGNUP ERROR (SAVING USER)', error);
        return res.status(500).send({ message: err });
      }

      res.status(201).send({ message: 'User was registered successfully!' });
    });
  },
  login: (req, res) => {
    // Buscamos el registro del usuario por su email
    UserSchema.findOne({ email: req.body.email })
      .populate('roles', '-__v')
      .exec(async (err, user) => {
        // Si no existe o hay error, devolvemos dicho error o un mensaje de Unauthorized
        if (err) {
          return res.status(500).send({ message: err });
        }
        if (!user) {
          return res
            .status(401)
            .send({ message: 'Invalid Email or Password.' });
        }

        // Validamos la contraseña
        let isValidPwd = bcrypt.compareSync(req.body.password, user.password);

        if (!isValidPwd) {
          return res.status(401).send({
            accessToken: null,
            message: 'Invalid Email or Password.',
          });
        }
        
        // Generamos el token
        let token = jwt.sign({ id: user.id }, authConfig.secret, {
          expiresIn: authConfig.jwtExpiration,
        });

        let refreshToken = await RefreshToken.createToken(user);

        let authorizations = [];

        for (let i = 0; i < user.roles.length; i++) {
          authorizations.push('ROLE_' + user.roles[i].name.toUpperCase());
        }

        res.status(200).send({
          id: user._id,
          email: user.email,
          roles: authorizations,
          accessToken: token,
          refreshToken: refreshToken,
        });
      });
  },
};
