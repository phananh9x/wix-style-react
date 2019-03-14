import eyes from 'eyes.it';
import autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';
import {
  createStoryUrl,
  scrollToElement,
  waitForVisibilityOf,
} from 'wix-ui-test-utils/protractor';
import { tooltipTestkitFactory } from 'wix-ui-core/dist/src/testkit/protractor';
import { textTestkitFactory } from '../../testkit/protractor';
import { SIZES, SKINS, WEIGHTS } from './constants';
import { storySettings } from './docs/storySettings';

describe('Text', () => {
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

  const init = async ({ url, dataHook }) => {
    await browser.get(url);
    const driver = textTestkitFactory({ dataHook });
    await waitForVisibilityOf(driver.element(), 'Cannot find Text');
    return driver;
  };

  describe('AutoExample', () => {
    let driver;
    beforeAll(async () => {
      driver = await init({ url: storyUrl, dataHook: 'storybook-text' });
    });
    afterEach(() => autoExampleDriver.reset());

    eyes.it('should display correct content', async () => {
      expect(await driver.getText()).toBe('Some text');
    });

    eyes.it('light prop', async () => {
      await eyes.checkWindow('dark');

      await autoExampleDriver.setProps({ light: true });
      await waitForVisibilityOf(driver.element(), 'Cannot find Text');
      await eyes.checkWindow('light');
    });

    eyes.it('size prop', async () => {
      for (const size of Object.keys(SIZES)) {
        await autoExampleDriver.setProps({ size });
        await waitForVisibilityOf(driver.element(), 'Cannot find Text');
        await eyes.checkWindow(size);
      }
    });

    eyes.it('skin prop', async () => {
      for (const skin of Object.keys(SKINS)) {
        await autoExampleDriver.setProps({ skin });
        await waitForVisibilityOf(driver.element(), 'Cannot find Text');
        await eyes.checkWindow(skin);
      }
    });

    eyes.it('weight prop', async () => {
      for (const weight of Object.keys(WEIGHTS)) {
        await autoExampleDriver.setProps({ weight });
        await waitForVisibilityOf(driver.element(), 'Cannot find Text');
        await eyes.checkWindow(weight);
      }
    });
  });

  describe('with tooltip', () => {
    eyes.it(
      'should not show tooltip on hover when text is not truncated with ellipses',
      async () => {
        const dataHook = 'storybook-text';
        const driver = await init({ url: storyUrl, dataHook });
        const tooltipDriver = tooltipTestkitFactory({ dataHook });
        await waitForVisibilityOf(driver.element(), 'Cannot find Text');
        expect(await tooltipDriver.isContentElementExists()).toBeFalsy();
        await tooltipDriver.mouseEnter();
        expect(await tooltipDriver.isContentElementExists()).toBeFalsy();
      },
    );

    eyes.it(
      'should show tooltip on hover when text is truncated with ellipses',
      async () => {
        const dataHook = 'text-with-ellipses';
        const driver = await init({ url: storyUrlWithExamples, dataHook });
        const tooltipDriver = tooltipTestkitFactory({ dataHook });
        await waitForVisibilityOf(driver.element(), 'Cannot find Text');
        expect(await tooltipDriver.isContentElementExists()).toBeFalsy();
        await tooltipDriver.mouseEnter();
        expect(await tooltipDriver.isContentElementExists()).toBeTruthy();
      },
    );
  });

  describe('anchors', () => {
    const testName = 'should apply link styling only to direct <a> children';

    eyes.it(testName, async () => {
      const driver = await init({
        url: storyUrlWithExamples,
        dataHook: 'storybook-text-link',
      });
      await scrollToElement(driver.element());
      await eyes.checkWindow(testName);
    });
  });
});
