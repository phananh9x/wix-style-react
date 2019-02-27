import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';

function accordionDriverFactory(base) {
  return {
    ...baseUniDriverFactory(base),

    getItemTitleAt: async idx =>
      getItemAt(idx, base)
        .$('[data-hook="title"]')
        .text(),
    isIconExistsAt: async idx =>
      getItemAt(idx, base)
        .$('[data-hook="icon"]')
        .exists(),
    isItemExpandedAt: async idx =>
      getItemAt(idx, base)
        .$('[data-hook="content"]')
        .exists(),
    clickToggleButtonAt: async idx =>
      getItemAt(idx, base)
        .$('[data-hook="toggle-accordion-wrapper"]')
        .click(),
    getToggleButtonLabelAt: async idx =>
      getItemAt(idx, base)
        .$('[data-hook="toggle-accordion-wrapper"]')
        .$('[data-hook="toggle-accordion-button"]')
        .text(),
  };
}

function getItemAt(idx, base) {
  return base.$$('[data-hook="accordion-item"]').get(idx);
}

export default accordionDriverFactory;

export { getItemAt };
