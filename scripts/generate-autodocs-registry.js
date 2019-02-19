require('../.autotools/node-require-hooks.js');
const Registry = require('@ui-autotools/registry').default;
const glob = require('glob');
const gatherAll = require('react-autodocs-utils/src/gather-all');
const fs = require('fs');

const OUTPUT_DIR = 'autodocs-registry';

const projectPath = process.cwd();

glob
  .sync('src/**/*.meta.js', { absolute: true, cwd: projectPath })
  .forEach(filePath => {
    require(filePath);
  });

async function generate() {
  const gatherAllPromises = [];
  Registry.metadata.components.forEach(async comp => {
    gatherAllPromises.push(gatherAll(comp.path).then({}));
  });
  const allParsed = await Promise.all(gatherAllPromises);

  const parsedReg = {};
  allParsed.forEach(parsedSource => {
    const key = parsedSource.displayName;
    parsedReg[key] = parsedSource;
  });

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }

  fs.writeFileSync(
    'autodocs-registry/autodocs-registry.json',
    JSON.stringify(parsedReg),
  );
}

generate();
