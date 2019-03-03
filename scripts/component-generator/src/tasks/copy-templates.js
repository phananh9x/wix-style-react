const fs = require('fs-extra');
const logger = require('../logger');
const utils = require('../utils');
const replaceTemplates = require('../replace-templates');
const createValuesMap = require('../create-values-map');

const createFileMap = ({ ComponentName, description, testComponent }) => {
  const filesToCopy = [
    'src/Component/Component.uni.driver.js',
    'src/Component/Component.meta.js',
    'src/Component/Component.private.uni.driver.js',
    'src/Component/Component.e2e.js',
    'src/Component/Component.js',
    'src/Component/Component.scss',
    'src/Component/Component.spec.js',
    'src/Component/index.js',

    // If `testComponent === true`, we won't generate a story for now
    ...(!testComponent
      ? [
          'stories/Component/storySettings.js',
          'stories/Component/index.story.js',
        ]
      : []),

    // Create README only if we have a description
    ...(description ? ['src/Component/README.md'] : []),
  ];

  return filesToCopy.reduce((res, curr) => {
    res[curr] = curr.replace(/Component/g, ComponentName);

    return res;
  }, {});
};

const copyTemplate = (src, dest, valuesMap, template) => {
  const templatePath = utils.getTemplatePath(src, template);
  const destinationPath = utils.getDestinationPath(dest);

  const transformedFileContents = replaceTemplates(
    fs.readFileSync(templatePath, 'utf-8'),
    valuesMap,
  );

  fs.outputFileSync(destinationPath, transformedFileContents);
};

const copyTemplates = async (fileMap, valuesMap, template = 'component') => {
  for (const [src, dest] of Object.entries(fileMap)) {
    try {
      await copyTemplate(src, dest, valuesMap, template);
      logger.success(`Creating ${dest}`);
    } catch (e) {
      logger.error(`Creating ${dest}`);
      throw e;
    }
  }
};

module.exports = async answers => {
  const fileMap = createFileMap(answers);
  const valuesMap = createValuesMap(answers);

  // Copy file
  await copyTemplates(fileMap, valuesMap);

  // Copy `testComponent` files
  if (answers.testComponent) {
    await copyTemplates(
      {
        'stories/Component/storySettings.js': `stories/${
          answers.ComponentName
        }/storySettings.js`,
        'stories/Component/index.story.js': `stories/${
          answers.ComponentName
        }/index.story.js`,
      },
      valuesMap,
      'test-component',
    );
  }
};
