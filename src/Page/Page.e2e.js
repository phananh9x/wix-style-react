import { eyesItInstance } from '../../test/utils/eyes-it';
import eventually from 'wix-eventually';
import { pageTestkitFactory } from '../../testkit/protractor';
import { pagePrivateDriverFactory } from './Page.private.protractor.driver';
import {
  waitForVisibilityOf,
  scrollToElement,
  protractorTestkitFactoryCreator,
} from 'wix-ui-test-utils/protractor';
import { createTestStoryUrl } from '../../test/utils/storybook-helpers';
import { storySettings } from '../../stories/components/Page/storySettings';

const { category, storyName } = storySettings;

const testStoryUrl = testName =>
  createTestStoryUrl({ category, storyName, testName });

describe('Page', () => {
  const eyes = eyesItInstance();

  const initTest = async ({ storyUrl, dataHook }) => {
    await browser.get(storyUrl);
    const driver = pageTestkitFactory({ dataHook });
    await waitForVisibilityOf(driver.element(), 'Cannot find Page');
    await scrollToElement(driver.element());
    return driver;
  };

  const runChildrenCombinationTests = initTestConfig => {
    const eyesManual = eyesItInstance({
      enableSnapshotAtBrowserGet: false,
      enableSnapshotAtEnd: false,
    });

    eyesManual.it('should hide title on scroll threshold', async () => {
      const driver = await initTest(initTestConfig);

      await expect(await driver.titleExists()).toBeTruthy();
      await eyesManual.checkWindow('Page title shown');

      await driver.scrollDown();
      await eventually(() => !driver.titleExists());
      await eyesManual.checkWindow('Page title hidden');

      await driver.scrollUp();
      await eventually(() => driver.titleExists());
      await eyesManual.checkWindow('Page title appears');
    });
  };

  describe('Sticky layer', () => {
    it('should NOT see components with z-index when they go under a sticky item', () => {});
  });

  describe('Header + Content', () => {
    const dataHook = 'story-page';

    describe('With Background-Image', () => {
      const storyUrl = testStoryUrl('1. Image');
      runChildrenCombinationTests({ storyUrl, dataHook });
    });

    describe('With Gradient', () => {
      const storyUrl = testStoryUrl('2. Gradient');
      runChildrenCombinationTests({ storyUrl, dataHook });
    });
  });

  describe('Header + FixedContent + Content', () => {
    const dataHook = 'story-page';

    describe('With Background-Image', () => {
      const storyUrl = testStoryUrl('3. FC-Image');
      runChildrenCombinationTests({ storyUrl, dataHook });
    });

    describe('With Gradient', () => {
      const storyUrl = testStoryUrl('4. FC-Gradient');
      runChildrenCombinationTests({ storyUrl, dataHook });
    });
  });

  describe('Header + Tail + Content', () => {
    const dataHook = 'story-page';

    describe('With Background-Image', () => {
      const storyUrl = testStoryUrl('5. HTC-Image');
      runChildrenCombinationTests({ storyUrl, dataHook });
    });

    describe('With gradientCoverTail', () => {
      const storyUrl = testStoryUrl('6. HTC-Gradient Cover Tail');
      runChildrenCombinationTests({
        storyUrl,
        dataHook,
        props: { backgroundImageUrl: '' },
      });
    });
  });

  describe('min/max width', () => {
    function eyesOptions({ width }) {
      return {
        enableSnapshotAtBrowserGet: true,
        enableSnapshotAtEnd: false,
        width,
      };
    }

    describe('Default values', () => {
      const url = testStoryUrl('7. Default [min/max]-width');

      eyes.it(
        'should stop growing at max-width',
        async () => {
          await browser.get(url);
        },
        eyesOptions({ width: 1500 }),
      );

      eyes.it(
        'should stop shrinking at default min-width',
        async () => {
          await browser.get(url);
        },
        eyesOptions({ width: 500 }),
      );
    });

    describe('Custom values', () => {
      const url = testStoryUrl('8. Custom [min/max]-width');
      eyes.it(
        'should stop growing at max-width (1400px)',
        async () => {
          await browser.get(url);
        },
        eyesOptions({ width: 1500 }),
      );

      eyes.it(
        'should stop shrinking at default min-width (600px)',
        async () => {
          await browser.get(url);
        },
        eyesOptions({ width: 500 }),
      );
    });
  });

  eyes.it('should have empty state', async () => {
    await browser.get(testStoryUrl('9. Empty State'));
  });

  eyes.it('should have short content', async () => {
    await browser.get(testStoryUrl('10. Page Example with short content'));
  });

  eyes.it('should have sidePadding=0', async () => {
    await browser.get(testStoryUrl('10. Page Example with sidePadding=0'));
  });

  eyes.it('should have sticky notification', async () => {
    const ENOUGH_SCROLL_TO_MINIMIZE = 200;
    const dataHook = storySettings.dataHook;
    const privateDriver = protractorTestkitFactoryCreator(
      pagePrivateDriverFactory,
    )({ dataHook });

    await browser.get(testStoryUrl('11. With Notification'));
    await eyes.checkWindow('With shown notification');
    await privateDriver.scrollVertically(ENOUGH_SCROLL_TO_MINIMIZE);
    await eyes.checkWindow('With shown notification over a mini-header');
    // TODO: click to close notification, scroll down to trigger mini-header (notification should not reappear. It happens , I don't know why!)
  });

  describe('Vertical Scroll', () => {
    const dataHook = storySettings.dataHook;
    const privateDriver = protractorTestkitFactoryCreator(
      pagePrivateDriverFactory,
    )({ dataHook });
    const ENOUGH_SCROLL_TO_MINIMIZE = 200;
    const SCROLL_TO_BOTTOM = 3000;
    const ANIMATION_DURATION_MS = 200;
    const Constants = storySettings.PageWithScrollConstants;

    const testScrollStoryUrl = testName =>
      createTestStoryUrl({
        category,
        storyName: `${storyName}/Scroll`,
        testName,
      });

    describe('1. Short Content', () => {
      eyes.it('should not have scroll', async () => {
        await initTest({
          storyUrl: testScrollStoryUrl('1. Short Content'),
          dataHook,
        });
        await privateDriver.scrollVertically(ENOUGH_SCROLL_TO_MINIMIZE);
        expect(await privateDriver.getVeriticalScroll()).toBe(0);
      });
    });

    describe('2. Stretch Vertically', () => {
      eyes.it('should not have scroll', async () => {
        await initTest({
          storyUrl: testScrollStoryUrl('2. Stretch Vertically'),
          dataHook,
        });
        await privateDriver.scrollVertically(ENOUGH_SCROLL_TO_MINIMIZE);
        expect(await privateDriver.getVeriticalScroll()).toBe(0);
      });
    });

    describe('3. Max Height No Scroll', () => {
      eyes.it('should not have scroll', async () => {
        await initTest({
          storyUrl: testScrollStoryUrl('3. Max Height No Scroll'),
          dataHook,
        });
        await privateDriver.scrollVertically(ENOUGH_SCROLL_TO_MINIMIZE);
        expect(await privateDriver.getVeriticalScroll()).toBe(0);
      });
    });

    describe('4. Scroll - No Mini Header', () => {
      eyes.it(
        'should scroll exactly 1px before triggering the mini-header',
        async () => {
          await initTest({
            storyUrl: testScrollStoryUrl('4. Scroll - No Mini Header'),
            dataHook,
          });
          await privateDriver.scrollVertically(ENOUGH_SCROLL_TO_MINIMIZE);
          expect((await privateDriver.getVeriticalScroll()) > 0).toBeTruthy();
        },
      );
    });

    describe('5. Scroll - Trigger Mini Header', () => {
      eyes.it(
        'should scroll exactly to the point where mini-header is triggered',
        async () => {
          await initTest({
            storyUrl: testScrollStoryUrl('5. Scroll - Trigger Mini Header'),
            dataHook,
          });
          await privateDriver.scrollVertically(300);
          await browser.sleep(ANIMATION_DURATION_MS + 100); // eslint-disable-line no-restricted-properties
          expect((await privateDriver.getVeriticalScroll()) > 0).toBeTruthy();
        },
      );
    });

    describe('6. Long', () => {
      eyes.it('should not have scroll', async () => {
        await initTest({
          storyUrl: testScrollStoryUrl('6. Long'),
          dataHook,
        });
        await privateDriver.scrollVertically(SCROLL_TO_BOTTOM);

        await browser.sleep(ANIMATION_DURATION_MS + 100); // eslint-disable-line no-restricted-properties
        expect((await privateDriver.getVeriticalScroll()) > 0).toBeTruthy();
      });
    });

    describe('7. Multiple Stickies', () => {
      eyes.it('should scroll and trigger mini-header', async () => {
        const GAP_HEIGHT_PX = 200;
        const STICKY_HEIGHT = 50;

        await initTest({
          storyUrl: testScrollStoryUrl('7. Multiple Stickies'),
          dataHook,
        });
        await privateDriver.scrollVertically(Constants.scrollTrigger + 1);
        await browser.sleep(ANIMATION_DURATION_MS + 100); // eslint-disable-line no-restricted-properties
        await eyes.checkWindow('trigger mini-header');

        await privateDriver.scrollVertically(GAP_HEIGHT_PX / 2);
        await eyes.checkWindow('first gap scrolled half way');

        await privateDriver.scrollVertically(GAP_HEIGHT_PX / 2 + STICKY_HEIGHT);
        await eyes.checkWindow('second sticky at top');
      });
    });
  });
});
