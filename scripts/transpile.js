/* eslint no-console: 0 */

const execa = require('execa');
const ProgressBar = require('progress');
const rm = require('rimraf');
const mkdirp = require('mkdirp');
const transpileSrc = require('./transpileSrc');

const STEPS = 4;
const TOTAL_STEPS_WIDTH = 20;
const STEP_WIDTH = TOTAL_STEPS_WIDTH / STEPS;
const options = { stdio: 'pipe', env: { FORCE_COLOR: true } };
const startTime = new Date();
const progress = new ProgressBar(
  'Transpiling `src` -> `dist` :bar :percent :dir',
  {
    total: STEP_WIDTH * STEPS,
  },
);

const cleanDist = () => {
  rm.sync('./dist');
  mkdirp.sync('./dist');
  progress.tick(STEP_WIDTH, {
    dir: 'dist',
  });
};

const transpileAndCopyFiles = name => {
  return execa
    .shell(
      `babel ${name} --out-dir dist/${name} --copy-files --plugins=@babel/plugin-transform-modules-commonjs`,
      {
        ...options,
      },
    )
    .then(() => {
      progress.tick(STEP_WIDTH, {
        dir: name,
      });
    });
};

cleanDist();

const testkit = transpileAndCopyFiles('testkit');
const test = transpileAndCopyFiles('test');
const src = transpileSrc().then(() => {
  progress.tick(STEP_WIDTH, {
    dir: 'src',
  });
});

Promise.all([testkit, test, src])
  .then(() => {
    console.log(`🚀 Done in ${Math.round(new Date() - startTime) / 1000}s`);
  })
  .catch(error => {
    progress.interrupt('Error');
    return Promise.reject(error);
  });
