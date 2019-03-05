import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';
import { headingUniDriverFactory } from '../Heading/Heading.uni.driver';
import { testkit as inputUniDriverFactory } from '../Input/Input.uni.driver';

export const editableTitleUniDriverFactory = base => {
  const dataHook = {
    heading: `[data-hook="heading"]`,
    label: `[data-hook="label"]`,
  };

  return {
    ...baseUniDriverFactory(base),

    getInput: inputUniDriverFactory(base),
    getHeading: headingUniDriverFactory(base.$(dataHook.heading)),

    getLabelText: () => base.$(dataHook.label).text(),
    getHeadingText: () => base.$(dataHook.heading).text(),
    clickHeading: () => base.$(dataHook.heading).click(),
    exists: () => !!base.exists(),
  };
};
