import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';
import { testkit as inputUniDriverFactory } from '../Input/Input.uni.driver';

const dataHookOf = dataHook => `[data-hook="${dataHook}"]`;

export const editableTitleUniDriverFactory = base => {
  const dataHook = {
    heading: dataHookOf('heading'),
    renamingField: dataHookOf('renaming-field'),
  };

  const inputDriver = () =>
    inputUniDriverFactory(base.$(dataHook.renamingField));
  const heading = base.$(dataHook.heading);

  return {
    ...baseUniDriverFactory(base),

    getInput: inputDriver,
    getHeadingText: () => heading.text(),
    clickHeading: () => heading.click(),

    exists: () => !!base.exists(),
  };
};
