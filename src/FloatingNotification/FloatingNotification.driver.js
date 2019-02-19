import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';
import {
  BUTTON_DATA_HOOK,
  TEXT_BUTTON_DATA_HOOK,
  TEXT_DATA_HOOK,
  CLOSE_BUTTON_DATA_HOOK,
} from './datahooks';

export const floatingNotificationDriverFactory = base => {
  return {
    ...baseUniDriverFactory(base),

    /** Click the button */
    clickButton: async () =>
      base.$(`[data-hook="${BUTTON_DATA_HOOK}"]`).click(),

    /** Get the button's text */
    getButtonLabel: async () =>
      base.$(`[data-hook="${BUTTON_DATA_HOOK}"]`).text(),

    /** Click the text button */
    clickTextButton: async () =>
      base.$(`[data-hook="${TEXT_BUTTON_DATA_HOOK}"]`).click(),

    /** Get the text button's text */
    getTextButtonLabel: async () =>
      base.$(`[data-hook="${TEXT_BUTTON_DATA_HOOK}"]`).text(),

    /** Click the button */
    clickCloseButton: async () =>
      base.$(`[data-hook="${CLOSE_BUTTON_DATA_HOOK}"]`).click(),

    /** get notification text */
    getText: async () => base.$(`[data-hook="${TEXT_DATA_HOOK}"]`).text(),

    /** get button tag name */
    isButtonAs: async as =>
      await base.$(`${as}[data-hook="${BUTTON_DATA_HOOK}"]`).exists(),

    /** get button href */
    getButtonHref: async () =>
      base.$(`[data-hook="${BUTTON_DATA_HOOK}"]`).attr('href'),

    /** get text button tag name */
    isTextButtonAs: async as =>
      await base.$(`${as}[data-hook="${TEXT_BUTTON_DATA_HOOK}"]`).exists(),

    /** get button href */
    getTextButtonHref: async () =>
      base.$(`[data-hook="${TEXT_BUTTON_DATA_HOOK}"]`).attr('href'),
  };
};
