const fs = require('fs');
const path = require('path');
const simpleGit = require('simple-git');

const getProjectRoot = () => path.join(__dirname, '..', '..', '..');

const isProjectRoot = dir =>
  path.resolve(dir) === path.resolve(getProjectRoot());

const isGitRepoClean = cwd =>
  new Promise(resolve => {
    simpleGit(cwd).status((err, status) => {
      resolve(status.isClean());
    });
  });

const isPascalCase = value => /^([A-Z][a-z]*)+$/.test(value);

const pascalCaseToCamelCase = str =>
  str.replace(/^./, match => match.toLowerCase());

const pascalCaseToSnakeCase = str =>
  pascalCaseToCamelCase(str).replace(
    /[A-Z]/g,
    match => `-${match.toLowerCase()}`,
  );

const getComponentPath = componentName =>
  path.join(getProjectRoot(), 'src', componentName);

const getComponentStoryPath = componentName =>
  path.join(getProjectRoot(), 'stories', componentName);

const isComponentExists = componentName =>
  fs.existsSync(getComponentPath(componentName));

const getTemplatePath = (p, template) =>
  path.join(__dirname, '../templates', template, p);

const getDestinationPath = p => path.join(getProjectRoot(), p);

// Extracted from
// https://github.com/wix/yoshi/blob/master/packages/yoshi-helpers/queries.js
const isInTeamCity = () =>
  process.env.BUILD_NUMBER || process.env.TEAMCITY_VERSION;

module.exports = {
  getProjectRoot,
  isProjectRoot,
  isGitRepoClean,
  isPascalCase,
  pascalCaseToCamelCase,
  pascalCaseToSnakeCase,
  getComponentPath,
  getComponentStoryPath,
  isComponentExists,
  getTemplatePath,
  getDestinationPath,
  isInTeamCity,
};
