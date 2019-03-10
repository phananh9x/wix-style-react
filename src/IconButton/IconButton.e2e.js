import { eyesItInstance } from '../../test/utils/eyes-it';
import { createTestStoryUrl } from '../../test/utils/storybook-helpers';
import { storySettings, testStories } from './docs/storySettings';

describe('IconButton', () => {
  const testStoryUrl = testName =>
    createTestStoryUrl({ ...storySettings, testName });

  const eyes = eyesItInstance();

  describe('test stories', () => {
    const checkTestStory = async testName => {
      await browser.get(testStoryUrl(testName));
      eyes.checkWindow(testName);
    };

    eyes.it('check iconbutton skins', async () => {
      await checkTestStory(testStories.ICONBUTTON_SKINS);
    });

    eyes.it('check iconbutton affixes', async () => {
      await checkTestStory(testStories.ICONBUTTON_SIZES);
    });

    eyes.it('check iconbutton sizes', async () => {
      await checkTestStory(testStories.ICONBUTTON_AS);
    });
  });
});
