import { createTestStoryUrl } from '../../test/utils/storybook-helpers';
import { eyesItInstance } from '../../test/utils/eyes-it';
import { storySettings } from './docs/storySettings';

const eyes = eyesItInstance();

describe('FloatingNotification', () => {
  describe('run ltr tests', () => {
    runTests();
  });

  describe('run rtl tests', () => {
    runTests(true);
  });

  function runTests(isRtl) {
    describe('Test Page', () => {
      function testUrl(testName) {
        return createTestStoryUrl({
          category: storySettings.category,
          storyName: storySettings.storyName,
          testName,
          rtl: isRtl,
        });
      }

      eyes.it('should render with all variations', async () => {
        await browser.get(testUrl(storySettings.testStories.ALL));
      });
    });
  }
});
