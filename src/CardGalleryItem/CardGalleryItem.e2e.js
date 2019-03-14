import { eyesItInstance } from '../../test/utils/eyes-it';
import {
  waitForVisibilityOf,
  scrollToElement,
} from 'wix-ui-test-utils/protractor';
import { createStoryUrl } from '../../test/utils/storybook-helpers';

import { cardGalleryItemTestkitFactory } from '../../testkit/protractor';
import { storySettings } from './docs/storySettings';

const { kind, storyName } = storySettings;
const autoExampleUrl = createStoryUrl({
  kind,
  story: storyName,
  withExamples: false,
});

describe('CardGalleryItem', () => {
  const eyes = eyesItInstance();
  let driver;

  const createDriver = async (dataHook = storySettings.dataHook) => {
    driver = cardGalleryItemTestkitFactory({ dataHook });

    await waitForVisibilityOf(
      await driver.element(),
      'Cannot find CardGalleryItem',
    );
    await scrollToElement(await driver.element());

    return driver;
  };

  beforeEach(async () => {
    await browser.get(autoExampleUrl);
    await createDriver();
  });

  eyes.it('should be rendered correctly', async () => {
    expect(await driver.getTitle()).toBe('Card Title');
    expect(await driver.getSubtitle()).toBe('Card subtitle');
    expect(await driver.getBackgroundImageUrl()).toBe(
      'https://static.wixstatic.com/media/89ea07a19c3d415e99a8a8a3c0ab1de8.jpg/v1/fill/w_343,h_343,al_c,q_80,usm_0.66_1.00_0.01/89ea07a19c3d415e99a8a8a3c0ab1de8.jpg',
    );
  });

  describe('on hover', () => {
    beforeEach(async () => {
      browser
        .actions()
        .mouseMove(await driver.element())
        .perform();
    });

    eyes.it('should be rendered correctly', async () => {
      expect(await driver.getPrimaryActionLabel()).toBe('Button');
      expect(await driver.getSecondaryActionLabel()).toBe('Text Link');
    });
  });
});
