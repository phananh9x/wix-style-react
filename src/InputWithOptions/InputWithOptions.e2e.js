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

  it('should move out focus of input if nothing is pressed / selected', async () => {
    const firstElement = $(`[data-hook="input-for-focus-1"]`);
    const thirdElement = $(`[data-hook="input-for-focus-2"]`);

    pressTab();
    expect(await isFocused(firstElement)).toEqual(true);

    pressTab();
    expect(await isFocused(firstElement)).toEqual(false);
    expect(await isFocused(thirdElement)).toEqual(false);

    pressTab();
    expect(await isFocused(thirdElement)).toEqual(true);
  });

  it('should move out focus of input when have manual text option', async () => {
    const firstElement = $(`[data-hook="input-for-focus-1"]`);
    const thirdElement = $(`[data-hook="input-for-focus-2"]`);

    pressTab();
    expect(await isFocused(firstElement)).toEqual(true);

    pressTab();
    expect(await isFocused(firstElement)).toEqual(false);
    expect(await driver.isFocused()).toEqual(true);

    await driver.enterText('some option');
    pressTab();
    expect(await driver.isFocused()).toEqual(false);
    expect(await isFocused(thirdElement)).toEqual(true);
  });
});
