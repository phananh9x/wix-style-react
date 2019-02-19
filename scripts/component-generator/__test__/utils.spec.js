const path = require('path');
const utils = require('../src/utils');

describe('utils', () => {
  test('getProjectRoot', () => {
    expect(utils.getProjectRoot()).toEqual(path.join(__dirname, '../../..'));
  });

  test('isProjectRoot', () => {
    expect(utils.isProjectRoot(__dirname)).toBeFalsy();
    expect(utils.isProjectRoot(path.join(__dirname, '../../../'))).toBeTruthy();
  });

  test('isPascalCase', () => {
    expect(utils.isPascalCase('camelCase')).toBeFalsy();
    expect(utils.isPascalCase('snake-case')).toBeFalsy();
    expect(utils.isPascalCase('nocase')).toBeFalsy();
    expect(utils.isPascalCase('MaybeNumbers123')).toBeFalsy();

    expect(utils.isPascalCase('Pascal')).toBeTruthy();
    expect(utils.isPascalCase('PascalCase')).toBeTruthy();
    expect(utils.isPascalCase('PCase')).toBeTruthy();
  });

  test('pascalCaseToCamelCase', () => {
    expect(utils.pascalCaseToCamelCase('Component')).toEqual('component');
    expect(utils.pascalCaseToCamelCase('MyComponent')).toEqual('myComponent');
  });

  test('pascalCaseToSnakeCase', () => {
    expect(utils.pascalCaseToSnakeCase('Component')).toEqual('component');
    expect(utils.pascalCaseToSnakeCase('MyComponent')).toEqual('my-component');
    expect(utils.pascalCaseToSnakeCase('MyAwesomeComponent')).toEqual(
      'my-awesome-component',
    );
  });

  test('getComponentPath', () => {
    expect(utils.getComponentPath('MyComponent')).toEqual(
      path.join(__dirname, '../../../src/MyComponent'),
    );
  });

  test('getComponentStoryPath', () => {
    expect(utils.getComponentStoryPath('MyComponent')).toEqual(
      path.join(__dirname, '../../../stories/MyComponent'),
    );
  });

  test('isComponentExists', () => {
    expect(utils.isComponentExists('EmptyState')).toEqual(true);
    expect(utils.isComponentExists('MyNewComponent')).toEqual(false);
  });

  test('getTemplatePath', () => {
    expect(
      utils.getTemplatePath('src/Component/index.js', 'component'),
    ).toEqual(
      path.join(__dirname, '../templates/component/src/Component/index.js'),
    );

    expect(
      utils.getTemplatePath('src/Component/index.js', 'test-component'),
    ).toEqual(
      path.join(
        __dirname,
        '../templates/test-component/src/Component/index.js',
      ),
    );
  });

  test('getDestinationPath', () => {
    expect(utils.getDestinationPath('src/Component/index.js')).toEqual(
      path.join(__dirname, '../../../src/Component/index.js'),
    );
  });
});
