const utils = require('./utils');

module.exports = answers => {
  const componentName = utils.pascalCaseToCamelCase(answers.ComponentName);
  const componentNameSnake = utils.pascalCaseToSnakeCase(answers.ComponentName);

  return {
    ...answers,
    descriptionJSDoc:
      answers.description === undefined
        ? ''
        : `/**
 * ${answers.description}
 */`,
    componentName,
    CATEGORY: answers.testComponent ? 'TESTS' : 'COMPONENTS',
    'component-name': componentNameSnake,
  };
};
