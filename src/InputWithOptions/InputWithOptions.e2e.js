import { inputWithOptionsTestkitFactory } from '../../testkit/protractor';
import { $, browser } from 'protractor';
import { isFocused, waitForVisibilityOf } from 'wix-ui-test-utils/protractor';
import { createTestStoryUrl } from '../../test/utils/storybook-helpers';
import { storySettings, testStories } from './docs/storySettings';

describe('InputWithOptions', () => {
  let driver;

  const navigateToTestUrl = async testName => {
    const testStoryUrl = createTestStoryUrl({
      category: storySettings.indexCategory,
      storyName: storySettings.storyName,
      dataHook: storySettings.dataHook,
      testName,
    });
    await browser.get(testStoryUrl);
  };

  beforeEach(async () => {
    await navigateToTestUrl(testStories.tabsSwitches);

    driver = inputWithOptionsTestkitFactory({
      dataHook: storySettings.dataHook,
    });

    await waitForVisibilityOf(
      driver.element(),
      `Cant find ${storySettings.dataHook}`,
    );
  });

  const pressTab = () =>
    browser
      .actions()
      .sendKeys(protractor.Key.TAB)
      .perform();

  async function focusOnInputWithOptions() {
    const firstElement = $(`[data-hook="input-for-focus-1"]`);

    await pressTab();
    expect(await isFocused(firstElement)).toEqual(true);

    await pressTab();
    expect(await driver.isFocused()).toEqual(true);
  }

  it('should move out focus of input if nothing is pressed / selected', async () => {
    await focusOnInputWithOptions();

    await pressTab();
    expect(await driver.isFocused()).toEqual(false);
  });

  it('should move out focus of input when have manual text option', async () => {
    await focusOnInputWithOptions();

    await driver.enterText('some option');
    await pressTab();
    expect(await driver.isFocused()).toEqual(false);
  });
});
