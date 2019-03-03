import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';

export default base => {
  return {
    ...baseUniDriverFactory(base),
  };
};
