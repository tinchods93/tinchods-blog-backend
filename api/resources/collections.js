//Nombre de las colecciones

const { stackPrefix } = require('../config/api.config');

const names = {
  USERS: 'users-:stackPrefix-tables',
  SESSIONS: 'sessions-:stackPrefix-tables',
  POSTS: 'posts-:stackPrefix-tables',
  CATEGORIES: 'categories-:stackPrefix-tables',
  COMMENTS: 'comments-:stackPrefix-tables',
};

module.exports = (collection) => {
  return names[collection].replace(':stackPrefix', stackPrefix);
};
