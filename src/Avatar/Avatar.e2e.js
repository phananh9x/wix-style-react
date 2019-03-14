import { eyesItInstance } from '../../test/utils/eyes-it';
import { createStoryUrl } from '../../test/utils/storybook-helpers';
import { avatarTestkitFactory } from '../../testkit/protractor';
import { storySettings } from './docs/storySettings';
import { getTestStoryKind } from '../../stories/storiesHierarchy';

describe('Avatar', () => {
  describe('AutoStory Page', () => {
    const avatarDriver = avatarTestkitFactory({
      dataHook: storySettings.dataHook,
    });
    const url = createStoryUrl({
      kind: storySettings.category,
      story: storySettings.storyName,
    });

    describe('driver sanity', () => {
      it(`should have text content type by default`, async () => {
        await browser.get(url);
        await browser.wait(
          avatarDriver.exists(),
          5000,
          'Cannot find <Avatar/>',
        );
        expect(await avatarDriver.getContentType()).toBe('text');
        expect(await avatarDriver.getTextContent()).toBe('JD');
      });
    });
  });

  describe('Test Pages', () => {
    const eyes = eyesItInstance();

    function testUrl(testCase) {
      return createStoryUrl({
        kind: getTestStoryKind({
          category: storySettings.category,
          storyName: storySettings.storyName,
        }),
        story: testCase,
      });
    }

    eyes.it(`should render in all sizes`, async () => {
      await browser.get(testUrl(storySettings.testStories.SIZES));
    });

    eyes.it(`should render text with all bg colors`, async () => {
      await browser.get(testUrl(storySettings.testStories.COLORS));
    });
  });
});
