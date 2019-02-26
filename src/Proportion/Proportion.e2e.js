import {
  createStoryUrl,
  waitForVisibilityOf,
  protractorUniTestkitFactoryCreator,
} from 'wix-ui-test-utils/protractor';
import autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';
import { eyesItInstance } from '../../test/utils/eyes-it';
import { proportionPrivateDriverFactory } from './Proportion.private.driver';
import { storySettings } from '../../stories/Proportion/storySettings';
import { PREDEFINED_RATIOS } from './ratios';

const eyes = eyesItInstance({ enableSnapshotAtBrowserGet: false });

describe('Proportion', () => {
  const storyUrl = createStoryUrl({
    kind: storySettings.category,
    story: storySettings.storyName,
  });

  const createDriver = async (dataHook = storySettings.dataHook) => {
    const driver = protractorUniTestkitFactoryCreator(
      proportionPrivateDriverFactory,
    )({ dataHook });

    await waitForVisibilityOf(
      await driver.element(),
      `Cannot find <Proportion/> component with dataHook of ${dataHook}`,
    );

    return driver;
  };

  beforeEach(async () => {
    await autoExampleDriver.reset();
  });

  beforeAll(async () => {
    await browser.get(storyUrl);
  });

  describe('predefined ratios', () => {
    for (const predefinedRatio in PREDEFINED_RATIOS) {
      if (PREDEFINED_RATIOS.hasOwnProperty(predefinedRatio)) {
        eyes.it(
          `should maintain proportion with predefined ${predefinedRatio}`,
          async () => {
            const expectedRatio = PREDEFINED_RATIOS[predefinedRatio];
            await autoExampleDriver.setProps({ aspectRatio: expectedRatio });

            const driver = await createDriver();
            const aspectRatioResult = await driver.getAspectRatio();

            expect(aspectRatioResult.toFixed(2)).toBe(expectedRatio.toFixed(2));
          },
        );
      }
    }
  });

  describe('custom ratio', () => {
    eyes.it('should maintain proportion with custom ratio', async () => {
      const expectedRatio = 9.5 / 3;
      await autoExampleDriver.setProps({ aspectRatio: expectedRatio });

      const driver = await createDriver();
      const aspectRatioResult = await driver.getAspectRatio();

      expect(aspectRatioResult.toFixed(2)).toBe(expectedRatio.toFixed(2));
    });
  });
});
