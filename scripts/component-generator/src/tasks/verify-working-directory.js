const logger = require('../logger');
const utils = require('../utils');

module.exports = async cwd => {
  if (!(await utils.isGitRepoClean(cwd))) {
    logger.error(
      'Git working directory is dirty. Commit or stash your changes, or run the generator with the --force flag',
    );
    process.exit(1);
  }
};
