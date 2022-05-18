require('dotenv').config();

const stage = process.env.STAGE ?? 'develop';
const branch = process.env.FB_BRANCH;
let basePath = `api${branch ? `-${branch}` : ''}`;

module.exports = {
  basePath,
  stage,
  branch: branch ?? '',
  stackPrefix: `${stage}${branch ? `-${branch}` : ''}`,
};
