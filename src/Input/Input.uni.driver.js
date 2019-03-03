import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';
import styles from './Input.scss';
import { ReactBase } from '../../test/utils/unidriver';

export const testkit = (base, body, document) => {
  const input = base.$('input');

  const reactBase = ReactBase(base);
  const reactBaseInput = ReactBase(input, document);

  const clearButtonNode = base.$(`[data-hook=input-clear-button]`);
  const unitNode = base.$(`.${styles.unit}`);
  const menuArrowNode = base.$(`.${styles.menuArrow}`);
  const magnifyingGlassNode = base.$(`.${styles.magnifyingGlass}`);

  const driver = {
    ...baseUniDriverFactory(base),
    getInputElementClasses: async () => await reactBaseInput.getClassList(),
    suffixComponentExists: async className =>
      await base.$(`.${styles.suffix} ${className}`).exists(),
    getRootElementClasses: async () => await reactBase.getClassList(),
    getAriaDescribedby: async () =>
      await reactBaseInput.attr('aria-describedby'),
    getAriaLabel: async () => await reactBaseInput.attr('aria-label'),
    getName: async () => await reactBaseInput.attr('name'),
    getType: async () => await reactBaseInput.attr('type'),
    getAriaControls: async () => await reactBaseInput.attr('aria-controls'),
    clickIconAffix: async () =>
      await base.$(`[data-hook="icon-affix"]`).click(),
    clickCustomAffix: async () =>
      await base.$(`[data-hook="custom-affix"]`).click(),
    isMenuArrowLast: async () => {
      const selector = `.${styles.suffixes} .${styles.suffix}:last-child > .${
        styles.menuArrow
      }`;
      return (await base.$$(selector).count()) === 1;
    },
    hasSuffixesClass: async () =>
      (await base.$$(`.${styles.input}.${styles.withSuffixes}`).count()) === 1,
    hasSuffixClass: async () =>
      (await base.$$(`.${styles.input}.${styles.withSuffix}`).count()) === 1,
    hasSuffix: async () => await base.$(`.${styles.suffix}`).exists(),
    hasPrefixClass: async () =>
      (await base.$$(`.${styles.input}.${styles.withPrefix}`).count()) === 1,
    prefixComponentExists: async style =>
      (await base.$$(`.${styles.prefix} ${style}`).count()) === 1,
    hasPrefix: async () => (await base.$$(`.${styles.prefix}`).count()) === 1,
    hasClearButton: async () => await clearButtonNode.exists(),
    clickClear: async () => await ReactBase(clearButtonNode).click(),
    getValue: async () => await input.value(),
    isOfStyle: async style => await base.hasClass(styles[`theme-${style}`]),
    isDisabled: async () => await base.hasClass(styles.disabled),
    isHoveredStyle: async () => await base.hasClass(styles.hasHover),
    isFocusedStyle: async () => await base.hasClass(styles.hasFocus),
    getRequired: async () => await reactBaseInput.required(),
    enterText: async value => await reactBaseInput.enterValue(value),
    getAutocomplete: async () => await reactBaseInput.attr('autocomplete'),
    getDefaultValue: async () => await reactBaseInput.defaultValue(),
    getUnit: async () => {
      return await ReactBase(unitNode).textContent();
    },
    getTabIndex: async () => await reactBaseInput.tabIndex(),
    getReadOnly: async () => await reactBaseInput.readOnly(),
    getTextOverflow: async () =>
      (await reactBaseInput.getStyle())['text-overflow'],
    hasExclamation: async () => await base.$(`.${styles.exclamation}`).exists(),
    hasError: async () => await base.hasClass(styles.hasError),
    hasLoader: async () => {
      // There actually should be only 1  element with `.loaderContainer`, this is a component bug that there are actually 2.
      return (await base.$$(`.${styles.loaderContainer}`).count()) > 0;
    },
    focus: async () => await reactBaseInput.focus(),
    blur: async () => await reactBaseInput.blur(),
    keyUp: async () => await reactBaseInput.keyup(),
    keyDown: async () => await reactBaseInput.keydown(),
    paste: async () => await reactBaseInput.paste(),
    trigger: async (value, event) => {
      if (value === 'focus') {
        return await driver.focus();
      }
      if (value === 'blur') {
        return await driver.blur();
      }
      if (value === 'keyUp') {
        return await driver.keyUp();
      }
      if (value === 'keyDown') {
        return await driver.keyDown(event);
      }
      if (value === 'paste') {
        return await driver.paste();
      }
      if (value === 'change') {
        return await driver.enterText(value);
      }
    },
    isFocus: async () => await reactBaseInput.isFocus(),
    hasHelp: async () => await base.$(`.${styles.help}`).exists(),
    clickUnit: async () => await unitNode.click(),
    hasMagnifyingGlass: async () => await magnifyingGlassNode.exists(),
    clickMagnifyingGlass: async () => await magnifyingGlassNode.click(),
    clickMenuArrow: async () => await menuArrowNode.click(),
    hasMenuArrow: async () => await menuArrowNode.exists(),
    isNarrowError: async () => await base.$(`.${styles.narrow}`).exists(),
    isRTL: async () => await base.hasClass(styles.rtl),
    getCursorLocation: async () => await reactBaseInput.selectionStart(),
  };

  return driver;
};
