import { eyesItInstance } from '../../test/utils/eyes-it';
import eventually from 'wix-eventually';

import { pageTestkitFactory } from '../../testkit/protractor';
import {
  waitForVisibilityOf,
  scrollToElement,
} from 'wix-ui-test-utils/protractor';
import { createTestStoryUrl } from '../../test/utils/storybook-helpers';
import { storySettings } from '../../stories/components/Page/storySettings';

const { category, storyName } = storySettings;

const testStoryUrl = testName =>
  createTestStoryUrl({
    category,
    storyName: `${storyName}/Deprecated`,
    testName,
  });

describe('Page Deprecated', () => {
  const initTest = async ({ storyUrl, dataHook }) => {
    await browser.get(storyUrl);
    const driver = pageTestkitFactory({ dataHook });
    await waitForVisibilityOf(driver.element(), 'Cannot find Page');
    await scrollToElement(driver.element());
    return driver;
  };

  const runTestCases = initTestConfig => {
    const eyes = eyesItInstance({
      enableSnapshotAtBrowserGet: false,
      enableSnapshotAtEnd: false,
    });

    eyes.it('should hide title on scroll threshold', async () => {
      const driver = await initTest(initTestConfig);

      await expect(await driver.titleExists()).toBeTruthy();
      await eyes.checkWindow('Page title shown');

      await driver.scrollDown();
      await eventually(() => !driver.titleExists());
      await eyes.checkWindow('Page title hidden');

      await driver.scrollUp();
      await eventually(() => driver.titleExists());
      await eyes.checkWindow('Page title appears');
    });
  };

  describe('Header + Tail + Content', () => {
    const dataHook = 'story-page';

    describe('With Background-Image', () => {
      const storyUrl = testStoryUrl('Header-Tail-Content: 1. Image');
      runTestCases({ storyUrl, dataHook });
    });

    describe('With gradientCoverTail', () => {
      const storyUrl = testStoryUrl(
        'Header-Tail-Content: 2. Gradient Cover Tail',
      );
      runTestCases({ storyUrl, dataHook, props: { backgroundImageUrl: '' } });
    });
  });

  describe('Header + Content', () => {
    const dataHook = 'story-page';

    describe('With Background-Image', () => {
      const storyUrl = testStoryUrl('1. Image');
      runTestCases({ storyUrl, dataHook });
    });

    describe('With Gradient', () => {
      const storyUrl = testStoryUrl('2. Gradient');
      runTestCases({ storyUrl, dataHook });
    });
  });

  describe('Header + FixedContent + Content', () => {
    const dataHook = 'story-page';

    describe('With Background-Image', () => {
      const storyUrl = testStoryUrl('3. FC-Image');
      runTestCases({ storyUrl, dataHook });
    });

    describe('With Gradient', () => {
      const storyUrl = testStoryUrl('4. FC-Gradient');
      runTestCases({ storyUrl, dataHook });
    });
  });

  describe('With EmptyState', () => {
    const storyUrl = testStoryUrl('8. Empty State');
    const eyes = eyesItInstance();
    eyes.it('should not break design', async () => {
      await browser.get(storyUrl);
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

    const eyes = eyesItInstance();
    describe('Default values', () => {
      const url = testStoryUrl('5. Default [min/max]-width');

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
      const url = testStoryUrl('6. Custom [min/max]-width');
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
});
