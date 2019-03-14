import {
  createStoryUrl,
  waitForVisibilityOf,
  scrollToElement,
} from 'wix-ui-test-utils/protractor';

import { eyesItInstance } from '../../test/utils/eyes-it';
import { dropdownBaseTestkitFactory } from '../../testkit/protractor';
import { storySettings } from './docs/storySettings';

const eyes = eyesItInstance();

describe('DropdownBase', () => {
  const storyUrl = createStoryUrl({
    kind: storySettings.category,
    story: storySettings.storyName,
  });

  const createDriver = async (dataHook = storySettings.dataHook) => {
    const driver = dropdownBaseTestkitFactory({ dataHook });

    await waitForVisibilityOf(
      await driver.element(),
      `Cannot find <DropdownBase/> component with dataHook of ${dataHook}`,
    );

    await scrollToElement(await driver.element());

    return driver;
  };

  beforeAll(async () => {
    await browser.get(storyUrl);
  });

  eyes.it('should render', async () => {
    await createDriver();
  });

  [
    'story-dropdown-base-uncontrolled-click',
    'story-dropdown-base-uncontrolled-icon',
    'story-dropdown-base-controlled-mouse',
    'story-dropdown-base-controlled-input',
  ].forEach(dataHook => {
    eyes.it(`should render ${dataHook}`, async () => {
      const driver = await createDriver(dataHook);
      await driver.clickTargetElement();
    });
  });
});
