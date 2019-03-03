require('../.autotools/node-require-hooks.js');
const Registry = require('@ui-autotools/registry');
const glob = require('glob');
const gatherAll = require('react-autodocs-utils/src/gather-all');
const fs = require('fs');

const OUTPUT_DIR = 'autodocs-registry';

function initUiAutotoolsRegistry() {
  const projectPath = process.cwd();
  glob
    .sync('src/**/*.meta.js', { absolute: true, cwd: projectPath })
    .forEach(filePath => {
      require(filePath);
    });
}

async function generate() {
  initUiAutotoolsRegistry();

  const autodocsRegistry = {};
  const gatherAllPromises = [];
  Registry.default.metadata.components.forEach(async comp => {
    gatherAllPromises.push(
      gatherAll(comp.path).then(parsedSource => {
        // Registry.getCompName gets a unique component id.
        const key = Registry.getCompName(comp.component);
        autodocsRegistry[key] = parsedSource;
      }),
    );
  });

  await Promise.all(gatherAllPromises);

  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR);
  }

  fs.writeFileSync(
    'autodocs-registry/autodocs-registry.json',
    JSON.stringify(autodocsRegistry),
  );
}

generate();
