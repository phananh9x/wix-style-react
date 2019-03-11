import { protractorUniTestkitFactoryCreator } from 'wix-ui-test-utils/protractor';
import { eyesItInstance } from '../../test/utils/eyes-it';
import { buttonTestkitFactory } from '../../testkit/protractor';
import { storySettings } from './docs/storySettings';
import { createTestStoryUrl } from '../../test/utils/storybook-helpers';
import { modalPrivateDriverFactory } from './Modal.private.uni.driver';

const eyes = eyesItInstance();
const { category, storyName } = storySettings;

describe('Modal', () => {
  const modalTestkitFactory = protractorUniTestkitFactoryCreator(
    modalPrivateDriverFactory,
  );

  const testStoryUrl = testName =>
    createTestStoryUrl({ category, storyName, testName });
  const createDriver = async (dataHook = storySettings.dataHook) => {
    const driver = modalTestkitFactory({ dataHook });
    await browser.wait(driver.exists(), 5000, 'Cannot find <Modal/>');
    return driver;
  };

  const DATA_HOOKS = {
    scrollHereDiv: 'scroll-here-div',
    openModalButton: 'open-modal-button',
  };

  eyes.it('should render', async () => {
    await createDriver();
  });

  describe('test stories', () => {
    beforeAll(async () => {
      await browser.get(testStoryUrl('1. Prevent modal background scroll'));
    });

    eyes.it('should add overflow to body once Modal is open', async () => {
      const buttonDriver = buttonTestkitFactory({
        dataHook: DATA_HOOKS.openModalButton,
      });
      await browser.wait(buttonDriver.exists(), 5000, 'Cannot find <Button/>');

      await buttonDriver.click();

      const body = element(by.css('body'));
      const bodyOverflow = await body.getCssValue('overflow');

      expect(bodyOverflow).toBe('hidden');
    });
  });
});
