const fs = require('fs');
const path = require('path');

const NON_COMPONENT_FOLDER_NAMES = [
  'utils',
  'providers',
  'new-icons',
  'dnd-styles',
  'assets',
  'clients',
  'mixins',
  'common',
  'FieldLabelAttributes',
  'Backoffice',
  'BaseComponents',
  'Deprecated',
  'Typography',
  'Animations',
];

const matches = haystack => needle => haystack.some(h => needle === h);

const componentNameInvalidators = [
  path.extname,
  matches(NON_COMPONENT_FOLDER_NAMES),
];

module.exports = ({ cwd }) =>
  fs
    .readdirSync(cwd)
    .filter(file => !componentNameInvalidators.some(v => v(file)));
