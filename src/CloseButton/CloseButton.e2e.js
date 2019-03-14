import { eyesItInstance } from '../../test/utils/eyes-it';

import {
  createStoryUrl,
  createTestStoryUrl,
} from '../../test/utils/storybook-helpers';
import { storySettings, testStories } from './docs/storySettings';

describe('CloseButton', () => {
  const storyUrl = createStoryUrl({
    kind: storySettings.kind,
    story: storySettings.storyName,
  });

  beforeAll(async () => {
    await browser.get(storyUrl);
  });

  const testStoryUrl = testName =>
    createTestStoryUrl({ ...storySettings, testName });

  const eyes = eyesItInstance();

  eyes.it('Make a screenshoft of all CloseButton examples', () => {
    expect(true).toBeTruthy();
  });

  describe('test stories', () => {
    const checkTestStory = async testName => {
      await browser.get(testStoryUrl(testName));
      eyes.checkWindow(testName);
    };

    eyes.it('check closebutton skins', async () => {
      await checkTestStory(testStories.CLOSEBUTTON_SKINS);
    });

    eyes.it('check closebutton sizes', async () => {
      await checkTestStory(testStories.CLOSEBUTTON_AS);
    });
  });
});
