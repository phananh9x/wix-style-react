import { eyesItInstance } from '../../test/utils/eyes-it';
import { storySettings, testStories } from './docs/storySettings';

import {
  createStoryUrl,
  createTestStoryUrl,
} from '../../test/utils/storybook-helpers';

const testStoryUrl = testName =>
  createTestStoryUrl({ ...storySettings, testName });

describe('SegmentedToggle', () => {
  const storyUrl = createStoryUrl({
    kind: storySettings.kind,
    story: storySettings.storyName,
  });

  beforeAll(async () => {
    await browser.get(storyUrl);
  });

  const eyes = eyesItInstance();

  describe('test stories', () => {
    const checkTestStory = async testName => {
      await browser.get(testStoryUrl(testName));
      eyes.checkWindow(testName);
    };

    eyes.it('text & prefix', async () => {
      await checkTestStory(testStories.textAndPrefix);
    });

    eyes.it('icon', async () => {
      await checkTestStory(testStories.icon);
    });
  });
});
