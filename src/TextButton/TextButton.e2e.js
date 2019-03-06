import { eyesItInstance } from '../../test/utils/eyes-it';
import {
  createStoryUrl,
  createTestStoryUrl,
} from '../../test/utils/storybook-helpers';
import { storySettings, testStories } from './docs/storySettings';

describe('TextButton', () => {
  const testStoryUrl = testName =>
    createTestStoryUrl({ ...storySettings, testName });

  const eyes = eyesItInstance();

  describe('test stories', () => {
    const checkTestStory = async testName => {
      await browser.get(testStoryUrl(testName));
      eyes.checkWindow(testName);
    };

    eyes.it('check textbutton skins', async () => {
      await checkTestStory(testStories.TEXTBUTTON_SKINS);
    });

    eyes.it('check textbutton affixes', async () => {
      await checkTestStory(testStories.TEXTBUTTON_AFFIXES);
    });

    eyes.it('check textbutton sizes', async () => {
      await checkTestStory(testStories.TEXTBUTTON_AS);
    });
  });
});
