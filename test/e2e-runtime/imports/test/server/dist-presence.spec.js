const formatErrorMessage = message => {
  return `Module ${message.match(/dist(\w|\/)+/)[0]} not found`
};

const throwIfNotFound = error => {
  if (error.message.includes('Cannot find module')) {
    throw formatErrorMessage(error.message);
  }
};

describe('testkit', () => {
  it('load teskit files', async () => {
    try {
      require('../../../../../dist/testkit')
    } catch (e) {
      throwIfNotFound(e)
    }
  });
});

describe('test utils', () => {
  it('load test utils files', async () => {
    try {
      require('../../../../../dist/test/utils')
    } catch (e) {
      throwIfNotFound(e)
    }
  });
});
