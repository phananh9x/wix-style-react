import {
  waitForVisibilityOf,
  scrollToElement,
} from 'wix-ui-test-utils/protractor';

import { eyesItInstance } from '../../test/utils/eyes-it';
import { thumbnailTestkitFactory } from '../../testkit/protractor';
import { createTestStoryUrl } from '../../test/utils/storybook-helpers';
import { storySettings, testStories } from './docs/storySettings';

const storyUrl = createTestStoryUrl({
  category: storySettings.category,
  storyName: storySettings.storyName,
  testName: testStories.multipleThumbnails,
});

const eyes = eyesItInstance();

describe('Thumbnail', () => {
  const createDriver = async (dataHook = storySettings.dataHook) => {
    const driver = thumbnailTestkitFactory({ dataHook });

    await waitForVisibilityOf(
      await driver.element(),
      `Cannot find <Thumbnail/> component with dataHook of ${dataHook}`,
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
});
