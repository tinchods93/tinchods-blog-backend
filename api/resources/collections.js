//Nombre de las colecciones

const constants = require('../commons/constants');
const { stackPrefix } = require('../config/api.config');

const names = {
  [constants.USERS]: 'users-:stackPrefix-tables',
  [constants.SESSIONS]: 'sessions-:stackPrefix-tables',
  [constants.POSTS]: 'posts-:stackPrefix-tables',
  [constants.CATEGORIES]: 'categories-:stackPrefix-tables',
  [constants.COMMENTS]: 'comments-:stackPrefix-tables',
  [constants.ROLES]: 'roles-:stackPrefix-tables',
  [constants.REFRESH_TOKEN]: 'refreshToken-:stackPrefix-tables'
};

module.exports = (collection) => {
  return names[collection].replace(':stackPrefix', stackPrefix);
};
