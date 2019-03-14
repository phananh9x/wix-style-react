import autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';
import { eyesItInstance } from '../../test/utils/eyes-it';
import { popoverTestkitFactory } from '../../testkit/protractor';
import {
  createStoryUrl,
  waitForVisibilityOf,
  scrollToElement,
} from 'wix-ui-test-utils/protractor';
import { createTestStoryUrl } from '../../test/utils/storybook-helpers';
import { storySettings, testStories } from './docs/storySettings';
import { placements } from './Popover';

describe('Popover', () => {
  const eyes = eyesItInstance({
    enableSnapshotAtBrowserGet: false,
  });

  const storyUrl = createStoryUrl({
    kind: storySettings.kind,
    story: storySettings.storyName,
  });

  const testStoryUrl = testName =>
    createTestStoryUrl({ ...storySettings, testName });

  const createDriver = async (dataHook = storySettings.dataHook) => {
    const driver = popoverTestkitFactory({ dataHook });

    await waitForVisibilityOf(
      driver.element(),
      `Cannot find Popover component ${dataHook}`,
    );

    await scrollToElement(driver.element());
    return driver;
  };

  describe('examples', () => {
    beforeAll(async () => {
      await browser.get(storyUrl);
    });

    beforeEach(async () => {
      await autoExampleDriver.reset();
    });

    eyes.it('should render', async () => {
      await autoExampleDriver.setProps({ shown: true });
      await createDriver();
    });

    eyes.it('should render with dark theme', async () => {
      await autoExampleDriver.setProps({ shown: true, theme: 'dark' });
      await createDriver();
    });

    eyes.it('AppendTo prop example', async () => {
      await createDriver('story-popover-append-to');
    });

    eyes.it('positioning example', async () => {
      const examplePlacements = placements.filter(p => !p.includes('auto'));

      // Scroll and focus on the example container
      await createDriver('story-popover-positioning');

      for (const placement of examplePlacements) {
        const driver = popoverTestkitFactory({
          dataHook: `story-popover-positioning-${placement}`,
        });

        await driver.mouseEnter();
        eyes.checkWindow(`${placements} position`);
      }
    });

    eyes.it('Flip behaviour example', async () => {
      await createDriver('story-popover-flip-behaviour');
    });

    eyes.it('Fixed behaviour example', async () => {
      const dataHooks = [
        'story-popover-fixed-enabled',
        'story-popover-fixed-disabled',
        'story-popover-fixed-disabled-flip-disabled',
      ];

      for (const dataHook of dataHooks) {
        // Just to scroll to the element
        await createDriver(dataHook);

        // Scroll to the bottom of the container
        await browser.executeScript(
          `document.querySelector('[data-hook="${dataHook}"]').scrollTop = 50`,
        );

        eyes.checkWindow(`${dataHook} scrolled down`);
      }
    });
  });

  describe('test stories', () => {
    const checkTestStory = async testName => {
      await browser.get(testStoryUrl(testName));
      eyes.checkWindow(testName);
    };

    eyes.it('check auto positioning', async () => {
      await checkTestStory(testStories.AUTO_POSITIONING);
    });

    eyes.it('check arrow adjusting', async () => {
      await checkTestStory(testStories.ARROW_ADJUSTING);
    });

    eyes.it('check arrow edge adjusting', async () => {
      await checkTestStory(testStories.ARROW_EDGE_ADJUSTING);
    });
  });
});
