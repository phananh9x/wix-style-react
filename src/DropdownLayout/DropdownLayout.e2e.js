import eyes from 'eyes.it';
import { sleep } from 'wix-ui-test-utils/react-helpers';
import { dropdownLayoutTestkitFactory } from '../../testkit/protractor';
import {
  createStoryUrl,
  scrollToElement,
  waitForVisibilityOf,
  isFocused,
} from 'wix-ui-test-utils/protractor';
import { browser, $ } from 'protractor';
import { createTestStoryUrl } from '../../test/utils/storybook-helpers';
import { storySettings, testStories } from './docs/storySettings';

async function waitForFetching() {
  await sleep(700);
}

describe('DropdownLayout', () => {
  let driver;

  const storyUrl = createStoryUrl({
    kind: '11. Pickers and Selectors',
    story: '11.1 DropdownLayout',
    withExamples: false,
  });

  beforeAll(async () => {
    browser.get(storyUrl);

    driver = dropdownLayoutTestkitFactory({
      dataHook: 'infinite-scroll-dropdownLayout',
    });
  });

  beforeEach(async () => {
    await waitForVisibilityOf(
      driver.element(),
      'Cant find infinite scroll dropdownLayout',
    );

    await waitForFetching();
    await scrollToElement(driver.element());
  });

  eyes.it('should render items properly', async () => {
    expect(await driver.getDropdownItem(0)).toEqual('options 0');
  });

  eyes.it('should add more items from server when scrolling down', async () => {
    expect(await driver.getDropdownItemsCount()).toEqual(15);

    await driver.scrollToElement(14);
    await waitForFetching();

    expect(await driver.getDropdownItemsCount()).toEqual(30);
  });

  eyes.it('should show loader', async () => {
    await driver.scrollToElement(14);

    expect(await driver.loaderExists()).toBeTruthy();
  });
});

describe('DropdownLayout - Focus behaviour', () => {
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

    driver = dropdownLayoutTestkitFactory({
      dataHook: storySettings.dataHook,
    });

    await waitForVisibilityOf(
      driver.element(),
      'Cant find dropdown-test-story',
    );
  });

  const pressTab = () =>
    browser
      .actions()
      .sendKeys(protractor.Key.TAB)
      .perform();

  async function focusOnDropdownLayout() {
    const firstElement = $(`[data-hook="input-for-initial-focus"]`);
    await pressTab();
    expect(await isFocused(firstElement)).toEqual(true);

    await pressTab();
    expect(await driver.isFocused()).toEqual(true);
  }

  it('should move out focus of dropdown only after 2 tab press when selecting an item', async () => {
    await focusOnDropdownLayout();

    await driver.hoverItemById(0);
    await pressTab();
    expect(await driver.isFocused()).toEqual(true);

    await pressTab();
    expect(await driver.isFocused()).toEqual(false);
  });

  it('should move out focus of dropdown when pressing tab without any selection', async () => {
    await focusOnDropdownLayout();

    await pressTab();
    expect(await driver.isFocused()).toEqual(false);
  });
});
