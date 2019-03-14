import {
  createStoryUrl,
  waitForVisibilityOf,
} from 'wix-ui-test-utils/protractor';

import { eyesItInstance } from '../../test/utils/eyes-it';
import { calendarPanelTestkitFactory } from '../../testkit/protractor';
import { storySettings } from './docs/storySettings';
import autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';

const eyes = eyesItInstance();

describe('CalendarPanel', () => {
  const storyUrl = createStoryUrl({
    kind: storySettings.category,
    story: storySettings.storyName,
    withExamples: false,
  });

  eyes.it(
    'no presets',
    async () => {
      await browser.get(storyUrl);
      const dataHook = storySettings.dataHook;
      const driver = calendarPanelTestkitFactory({ dataHook });
      await autoExampleDriver.setProps({
        presets: [],
        value: new Date(1990, 3, 29),
        footer: false,
      });
      await waitForVisibilityOf(driver.element(), 'Cannot find CalendarPanel');
    },
    { enableSnapshotAtBrowserGet: false },
  );

  eyes.it(
    'with presets',
    async () => {
      await browser.get(storyUrl);
      const dataHook = storySettings.dataHook;
      const driver = calendarPanelTestkitFactory({ dataHook });
      await autoExampleDriver.setProps({
        presets: [
          { id: 1, value: 'a day', selectedDays: new Date(2018, 1, 1) },
          {
            id: 2,
            value: 'a range',
            selectedDays: {
              from: new Date(2018, 1, 1),
              to: new Date(2018, 2, 1),
            },
          },
        ],
        value: new Date(1990, 3, 29),
        footer: false,
      });
      await waitForVisibilityOf(driver.element(), 'Cannot find CalendarPanel');
    },
    { enableSnapshotAtBrowserGet: false },
  );
});
