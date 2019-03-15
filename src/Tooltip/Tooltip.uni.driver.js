import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';

export const tooltipDriverFactory = base => {
  return {
    ...baseUniDriverFactory(base),

    /** Get the current count */
    getCountText: async () => base.$('[data-hook="tooltip-count"]').text(),

    /** Click the button */
    clickButton: async () => base.$('[data-hook="tooltip-button"]').click(),

    /** Get the button's text */
    getButtonText: async () => base.$('[data-hook="tooltip-button"]').text(),
  };
};
