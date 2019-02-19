const generate = require('./generate');
const path = require('path');

const pathResolve = (...a) => path.resolve(__dirname, ...a);

const generateTestkits = () =>
  [
    // enzyme testkit exports
    generate({
      templatePath: pathResolve('templates', 'enzyme.js'),
      outputPath: pathResolve('..', '..', 'testkit', 'enzyme.js'),
      factoryCreator: 'enzymeTestkitFactoryCreator',
      uniFactoryCreator: 'enzymeUniTestkitFactoryCreator',
    }),

    // vanilla (ReactTestUtils) testkit exports
    generate({
      templatePath: pathResolve('templates', 'vanilla.js'),
      outputPath: pathResolve('..', '..', 'testkit', 'index.js'),
      factoryCreator: 'testkitFactoryCreator',
      uniFactoryCreator: 'uniTestkitFactoryCreator',
    }),
  ].reduce((p, currentP) => p.then(currentP), Promise.resolve());

module.exports = generateTestkits;

// execute only what run as script (node generate-testkit-exports)
if (typeof module !== 'undefined' && !module.parent) {
  generateTestkits();
}
