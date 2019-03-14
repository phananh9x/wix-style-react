import eyes from 'eyes.it';
import {
  createStoryUrl,
  waitForVisibilityOf,
} from 'wix-ui-test-utils/protractor';
import { headingTestkitFactory } from '../../testkit/protractor';
import { tooltipTestkitFactory } from 'wix-ui-core/dist/src/testkit/protractor';
import autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';
import { APPEARANCES } from './Heading';

import { storySettings } from './docs/storySettings';

describe('Heading', () => {
  const storyUrl = createStoryUrl({
    kind: storySettings.kind,
    story: storySettings.storyName,
    withExamples: false,
  });
  const storyUrlWithExamples = createStoryUrl({
    kind: storySettings.kind,
    story: storySettings.storyName,
    withExamples: true,
  });

  describe('AutoExample', () => {
    beforeEach(() => browser.get(storyUrl));
    afterEach(() => autoExampleDriver.reset());

    eyes.it('children prop', async () => {
      const dataHook = storySettings.dataHook;
      const driver = headingTestkitFactory({ dataHook });
      await waitForVisibilityOf(driver.element(), 'Cannot find Heading');

      expect(driver.getText()).toBe('Hey there, good looking');
    });

    eyes.it('appearance prop', async () => {
      const dataHook = storySettings.dataHook;
      const driver = headingTestkitFactory({ dataHook });

      for (const appearance of Object.keys(APPEARANCES)) {
        await autoExampleDriver.setProps({
          appearance,
          'data-hook': storySettings.dataHook,
        });
        await waitForVisibilityOf(driver.element(), 'Cannot find Heading');
        await eyes.checkWindow(appearance);
      }
    });

    eyes.it('light prop', async () => {
      const dataHook = storySettings.dataHook;
      const driver = headingTestkitFactory({ dataHook });

      await waitForVisibilityOf(driver.element(), 'Cannot find Heading');
      await eyes.checkWindow('dark');

      await autoExampleDriver.setProps({ light: true });
      await waitForVisibilityOf(driver.element(), 'Cannot find Heading');
      await eyes.checkWindow('light');
    });
  });

  describe('with tooltip', () => {
    eyes.it(
      'should not show tooltip on hover when text is not truncated with ellipses',
      async () => {
        await browser.get(storyUrl);
        const dataHook = storySettings.dataHook;
        const driver = headingTestkitFactory({ dataHook });
        const tooltipDriver = tooltipTestkitFactory({ dataHook });
        await waitForVisibilityOf(driver.element(), 'Cannot find Heading');
        expect(tooltipDriver.isContentElementExists()).toBeFalsy();
        await tooltipDriver.mouseEnter();
        expect(tooltipDriver.isContentElementExists()).toBeFalsy();
      },
    );

    eyes.it(
      'should show tooltip on hover when text is truncated with ellipses',
      async () => {
        await browser.get(storyUrlWithExamples);
        const dataHook = 'heading-with-ellipses';
        const driver = headingTestkitFactory({ dataHook });
        const tooltipDriver = tooltipTestkitFactory({ dataHook });
        await waitForVisibilityOf(driver.element(), 'Cannot find Heading');
        expect(tooltipDriver.isContentElementExists()).toBeFalsy();
        await tooltipDriver.mouseEnter();
        expect(tooltipDriver.isContentElementExists()).toBeTruthy();
      },
    );
  });
});
