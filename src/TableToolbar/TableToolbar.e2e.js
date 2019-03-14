import { eyesItInstance } from '../../test/utils/eyes-it';

import { createTestStoryUrl } from '../../test/utils/storybook-helpers';
import { storySettings } from './docs/storySettings';

describe('TableToolbar', () => {
  const eyes = eyesItInstance();

  const storyUrl = createTestStoryUrl({
    ...storySettings,
    testName: '1. Toolbar',
  });

  eyes.it('should display table toolbar', async () => {
    await browser.get(storyUrl);
  });
});
