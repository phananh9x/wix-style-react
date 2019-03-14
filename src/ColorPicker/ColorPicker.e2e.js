import autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';
import { createStoryUrl } from 'wix-ui-test-utils/protractor';

import { eyesItInstance } from '../../test/utils/eyes-it';
import { storySettings } from './docs/storySettings';
import { colorPickerTestkitFactory } from '../../testkit/protractor';

describe('ColorPicker', () => {
  const storyUrl = createStoryUrl({
    kind: storySettings.category,
    story: storySettings.storyName,
    withExamples: false,
  });
  const eyes = eyesItInstance();

  beforeAll(async () => await browser.get(storyUrl));

  beforeEach(async () => await autoExampleDriver.remount());

  eyes.it('should render the colorpicker', () => {
    expect(true).toBeTruthy();
  });

  describe('showConverter prop', () => {
    eyes.it('should render the colorpicker with the converter', async () => {
      autoExampleDriver.setProps({ showConverter: true });
      const driver = colorPickerTestkitFactory({
        dataHook: storySettings.dataHook,
      });

      expect(await driver.hasConverter()).toBeTruthy();
    });

    eyes.it('should render the colorpicker without the converter', async () => {
      autoExampleDriver.setProps({ showConverter: false });
      const driver = colorPickerTestkitFactory({
        dataHook: storySettings.dataHook,
      });

      expect(await driver.hasConverter()).toBeFalsy();
    });

    eyes.it(
      'should render the RGB inputs when clicking on the RGB tab',
      async () => {
        const driver = colorPickerTestkitFactory({
          dataHook: storySettings.dataHook,
        });

        await driver.selectRgbTab();

        expect(await driver.hasRgbInputs()).toBeTruthy();
      },
    );

    eyes.it(
      'should render the HSB inputs when clicking on the HSB tab',
      async () => {
        const driver = colorPickerTestkitFactory({
          dataHook: storySettings.dataHook,
        });

        await driver.selectHsbTab();

        expect(await driver.hasHsbInputs()).toBeTruthy();
      },
    );
  });

  describe('showInput prop', () => {
    eyes.it('should render the colorpicker with an input', async () => {
      autoExampleDriver.setProps({ showInput: true, showConverter: false });
      const driver = colorPickerTestkitFactory({
        dataHook: storySettings.dataHook,
      });

      expect(await driver.hasHexInput()).toBeTruthy();
    });

    eyes.it('should render the colorpicker without an input', async () => {
      autoExampleDriver.setProps({ showInput: false, showConverter: false });
      const driver = colorPickerTestkitFactory({
        dataHook: storySettings.dataHook,
      });

      expect(await driver.hasHexInput()).toBeFalsy();
    });
  });
});
