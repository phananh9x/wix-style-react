module.exports = (file, api, options) => {
  const j = api.jscodeshift;
  const root = j(file.source);
  const imports = root.find(j.ImportDeclaration).paths();

  const { ComponentName } = options;

  j(imports[imports.length - 1]).insertAfter(
    `// This import was added by the component generator
require('../src/${ComponentName}/docs/index.story');

// This import was added by the component generator
require('../src/${ComponentName}/test/${ComponentName}Stories');`,
  );

  return root.toSource();
};
