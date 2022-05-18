const UserSchema = require('../schemas/User.schema');
const { v4: uuid } = require('uuid');
const bcryptjs = require("bcryptjs");


module.exports = {
  register: async (req, res) => {
    const { email, password } = req.body;
    let existingUser;
    try {
      existingUser = await UserSchema.findOne({ email });
    } catch (error) {
      console.error('SIGNUP ERROR ==>', error);
    }
    if (existingUser) {
      return res.status(409).send('Email already in use');
    }

    const hashedPassword = bcryptjs.hashSync(password);

    const newUser = new UserSchema({
      _id: uuid(),
      email,
      password: hashedPassword,
    });

    try {
      await newUser.save();
    } catch (error) {
      console.error('SIGNUP ERROR (SAVING USER)', error);
    }

    return res.status(201).send({ user: newUser });
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    let existingUser;
    try {
      existingUser = await UserSchema.findOne({ email });
    } catch (error) {
      console.error('SIGNUP ERROR ==>', error);
    }
    if (!existingUser) {
      return res.status(409).send('Wrong email or password');
    }
    
    const validPwd = bcryptjs.compareSync(password,existingUser.password);
    if(!validPwd){
        return res.status(409).send('Wrong email or password');
    }


    return res.status(200).send({ message: "Success" });
  },
};
