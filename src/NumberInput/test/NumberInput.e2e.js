import { createTestStoryUrl } from '../../../test/utils/storybook-helpers';

import { eyesItInstance } from '../../../test/utils/eyes-it';
import { storySettings, testStories } from './storySettings';

describe('NumberInput', () => {
  const eyes = eyesItInstance();
  const testStoryUrl = testName =>
    createTestStoryUrl({ ...storySettings, testName });
  eyes.it('should render NumberInput with variations', async () => {
    await browser.get(testStoryUrl(testStories.numberInputVariations));
  });
});
