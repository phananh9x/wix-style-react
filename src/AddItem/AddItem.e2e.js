import { eyesItInstance } from '../../test/utils/eyes-it';
import autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';

import { createStoryUrl } from '../../test/utils/storybook-helpers';

import { addItemTestkitFactory } from '../../testkit/protractor';
import { storySettings } from './docs/storySettings';
import { runFocusTests } from '../common/Focusable/FocusableTestsE2E';

describe('AddItem', () => {
  const storyUrl = createStoryUrl({
    kind: storySettings.kind,
    story: storySettings.storyName,
  });

  const eyes = eyesItInstance();

  // TEMP - ADDED BY EREZ - FOR INVESTIGATING EYES FAILURES
  // I put this in AddItem since its the first test that runs, I didn't have time to figure out where I could initialize this.
  // const ConsoleLogHandler = require('eyes.selenium').ConsoleLogHandler;
  // eyes.setLogHandler(new ConsoleLogHandler(true));

  beforeAll(async () => {
    await browser.get(storyUrl);
  });

  beforeEach(() => {
    return autoExampleDriver.remount();
  });

  describe(`'alignItems' prop`, () => {
    ['', 'left', 'right'].map(alignItems =>
      eyes.it(`should render with value ${alignItems}`, async () => {
        await autoExampleDriver.setProps({ alignItems });
      }),
    );
  });

  describe(`'theme' prop`, () => {
    ['', 'filled', 'plain', 'image'].map(theme =>
      eyes.it(`should render with theme ${theme}`, async () => {
        await autoExampleDriver.setProps({ theme });
      }),
    );
  });

  describe(`'size' prop`, () => {
    ['large', 'medium', 'small', ''].map(size =>
      eyes.it(`should render with ${size} icon`, async () => {
        await autoExampleDriver.setProps({ size });
      }),
    );
  });

  describe(`'disable' prop`, () => {
    ['dashes', 'filled', 'plain', 'image'].map(theme =>
      eyes.it(`should render with theme ${theme}`, async () => {
        await autoExampleDriver.setProps({ disabled: true, theme });
      }),
    );
  });

  describe('Generic', () => {
    const driver = addItemTestkitFactory({ dataHook: storySettings.dataHook });
    runFocusTests(driver, storyUrl);
  });
});
