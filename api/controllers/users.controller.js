const UserSchema = require('../schemas/user.schema');

const getAll = async (req, res) => {};
const getById = async (req, res) => {
  console.log('REQUEST', req.userId);
  try {
    const user = await UserSchema.findById(req.userId).populate('roles','-__v');
    
    res.send({
      _id: user.id,
      email: user.email,
      roles: user.roles
    });
  } catch (error) {
    res.status(500).send({ message: error, code: 'INTERNAL_SERVER_ERROR' });
  }
};

module.exports = {
  getAll,
  getById,
};
