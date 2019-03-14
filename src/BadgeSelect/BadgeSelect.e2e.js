import { eyesItInstance } from '../../test/utils/eyes-it';
import autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';
import {
  createStoryUrl,
  waitForVisibilityOf,
  scrollToElement,
} from 'wix-ui-test-utils/protractor';

import { badgeSelectTestkitFactory } from '../../testkit/protractor';
import { storySettings } from './docs/storySettings';

describe('BadgeSelect', () => {
  const eyes = eyesItInstance();

  const storyUrl = createStoryUrl({
    kind: storySettings.kind,
    story: storySettings.storyName,
    withExamples: false,
  });

  const createDriverFactory = async (dataHook = storySettings.dataHook) => {
    const driver = badgeSelectTestkitFactory({ dataHook });

    await waitForVisibilityOf(
      driver.element(),
      'Cannot find BadgeSelect component',
    );
    await scrollToElement(driver.element());
    return driver;
  };

  describe('styles rendering', () => {
    beforeAll(async () => {
      await browser.get(storyUrl);
    });

    beforeEach(async () => {
      await autoExampleDriver.reset();
    });

    eyes.it('should render', async () => {
      await createDriverFactory();
    });

    eyes.it(`should render with the 'outline' type`, async () => {
      await autoExampleDriver.setProps({ type: 'outline' });
      await createDriverFactory();
    });

    eyes.it(`should render with the 'transparent' type`, async () => {
      await autoExampleDriver.setProps({ type: 'transparent' });
      await createDriverFactory();
    });
  });

  describe('dropdown layout', () => {
    beforeEach(async () => {
      await browser.get(storyUrl);
    });

    eyes.it('should open the dropdown on click', async () => {
      const driver = await createDriverFactory();
      await driver.clickBadge();
    });
  });

  describe('word wrapping', () => {
    beforeEach(async () => {
      await browser.get(storyUrl);
    });

    eyes.it('should not wrap between whitespaces', async () => {
      const driver = await createDriverFactory();
      await autoExampleDriver.setProps({
        options: ['general', 'standard', 'danger'].map((skin, id) => ({
          id: id.toString(),
          skin,
          text: `${skin} ${skin}`,
        })),
      });
      await driver.clickBadge();
    });
  });
});
