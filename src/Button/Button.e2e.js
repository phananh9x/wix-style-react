import { eyesItInstance } from '../../test/utils/eyes-it';

import { createTestStoryUrl } from '../../test/utils/storybook-helpers';
import { storySettings, testStories } from './docs/storySettings';
import { disableCSSAnimation } from '../../test/utils/protractor-helpers';

const testStoryUrl = testName =>
  createTestStoryUrl({ ...storySettings, testName });

describe('Button', () => {
  const eyes = eyesItInstance();
  describe('test stories', () => {
    const checkTestStory = async testName => {
      await browser.executeScript(disableCSSAnimation);
      await browser.get(testStoryUrl(testName));
      eyes.checkWindow(testName);
    };

    eyes.it('check button skins', async () => {
      await checkTestStory(testStories.BUTTON_SKINS);
    });

    eyes.it('check button sizes', async () => {
      await checkTestStory(testStories.BUTTON_SIZES);
    });

    eyes.it('check button sizes affixes', async () => {
      await checkTestStory(testStories.BUTTON_AFFIXES);
    });

    eyes.it('check button render as anchor', async () => {
      await checkTestStory(testStories.BUTTON_AS);
    });
  });
});
