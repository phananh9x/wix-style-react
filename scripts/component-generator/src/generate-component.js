const chalk = require('chalk');

const logger = require('./logger');
const runPrompts = require('./tasks/run-prompts');

module.exports = async (cwd, options) => {
  const answers = options.answers || (await runPrompts());

  logger.info(
    `Generating ${chalk.cyan(`<${answers.ComponentName}/>`)} component...`,
  );

  return [
    {
      // requires are here for a reason, they're to delay code execution until needed. That's because one task
      // might change files that another task relies on. If all files are required beforehand, consecutive tasks will
      // not see file changes and thus, component generation becomes falsy
      task: () => require('./tasks/verify-working-directory')(cwd),
      skipped: options.force,
      message: 'Verifying clean working directory',
    },
    {
      task: () => require('./tasks/copy-templates')(answers),
      message: 'Copy files',
    },
    {
      task: () => require('./tasks/run-codemods')(answers),
      message: 'Run codemods',
      skipped: options.skipCodemods,
    },
    {
      task: () => require('../../generate-testkit-exports')(),
      message: 'Generate testkit exports',
    },
    {
      task: () => require('./tasks/run-lint-fix')(answers),
      message: 'Run lint fix',
    },
  ]

    .filter(({ skipped }) => !skipped)

    .reduce(
      (promise, { task, message = '' }) =>
        promise.then(() => {
          const spinner = logger.spinner(message);

          return task().then(() => {
            spinner.stop();
            logger.success(`Done: ${message}`);
          });
        }),
      Promise.resolve(),
    )

    .then(() =>
      logger.success(
        `${chalk.cyan(`<${answers.ComponentName}/>`)} generated successfully!`,
      ),
    )
    .catch(e => {
      logger.error(e);
      process.exit(1);
    });
};
