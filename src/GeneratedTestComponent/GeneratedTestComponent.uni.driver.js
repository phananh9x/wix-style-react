import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';

export const generatedTestComponentDriverFactory = base => {
  return {
    ...baseUniDriverFactory(base),

    /** Get the current count */
    getCountText: async () =>
      base.$('[data-hook="generatedTestComponent-count"]').text(),

    /** Click the button */
    clickButton: async () =>
      base.$('[data-hook="generatedTestComponent-button"]').click(),

    /** Get the button's text */
    getButtonText: async () =>
      base.$('[data-hook="generatedTestComponent-button"]').text(),
  };
};
