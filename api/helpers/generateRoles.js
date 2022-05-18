const { v4: uuid } = require('uuid');
const Role = require('../schemas/Roles.model');

module.exports = () => {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        _id: uuid(),
        name: 'user',
      }).save((err) => {
        if (err) {
          console.log('error', err);
        }

        console.log("added 'user' to roles collection");
      });

      //   new Role({
      // _id:uuid(),
      //     name: 'moderator',
      //   }).save((err) => {
      //     if (err) {
      //       console.log('error', err);
      //     }

      //     console.log("added 'moderator' to roles collection");
      //   });

      new Role({
        _id: uuid(),
        name: 'admin',
      }).save((err) => {
        if (err) {
          console.log('error', err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
};
