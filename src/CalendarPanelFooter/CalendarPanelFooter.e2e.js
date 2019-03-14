import {
  createStoryUrl,
  waitForVisibilityOf,
  scrollToElement,
} from 'wix-ui-test-utils/protractor';

import { eyesItInstance } from '../../test/utils/eyes-it';
import { calendarPanelFooterTestkitFactory } from '../../testkit/protractor';
import { storySettings } from './docs/storySettings';

const eyes = eyesItInstance();

describe('CalendarPanelFooter', () => {
  const storyUrl = createStoryUrl({
    kind: storySettings.category,
    story: storySettings.storyName,
    withExamples: false,
  });

  const createDriver = async (dataHook = storySettings.dataHook) => {
    const driver = calendarPanelFooterTestkitFactory({ dataHook });

    await waitForVisibilityOf(
      await driver.element(),
      `Cannot find <CalendarPanelFooter/> component with dataHook of ${dataHook}`,
    );

    await scrollToElement(await driver.element());

    return driver;
  };

  beforeAll(async () => {
    await browser.get(storyUrl);
  });

  eyes.it('should render', async () => {
    await createDriver();
  });
});
