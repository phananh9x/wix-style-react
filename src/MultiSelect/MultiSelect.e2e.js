import autoExampleDriver from 'wix-storybook-utils/AutoExampleDriver';
import { eyesItInstance } from '../../test/utils/eyes-it';
import { multiSelectTestkitFactory } from '../../testkit/protractor';
import { $, browser } from 'protractor';
import {
  waitForVisibilityOf,
  mouseEnter,
  isFocused,
} from 'wix-ui-test-utils/protractor';
import {
  createStoryUrl,
  createTestStoryUrl,
} from '../../test/utils/storybook-helpers';
import eyes from 'eyes.it';
import { storySettings } from './docs/storySettings';

describe('MultiSelect', () => {
  // TODO: divided tests to 2 parts - need to migrate Part A to use stroybook tests sections
  describe('Part A', () => {
    describe('AutoExample', () => {
      const eyes = eyesItInstance({});

      const driver = multiSelectTestkitFactory({
        dataHook: storySettings.dataHook,
      });

      const getUrl = ({ rtl }) =>
        createStoryUrl({
          kind: storySettings.category,
          story: storySettings.storyName,
          withExamples: false,
          rtl,
        });

      function runDirectionRelatedTests() {
        eyes.it('should show 2 tags', async () => {
          await driver.click();
          await driver.selectItemById('AL');

          await driver.click();
          await driver.selectItemById('AZ');
        });
      }

      afterEach(() => {
        return autoExampleDriver.remount();
      });

      describe('LTR', () => {
        beforeAll(async () => {
          await browser.get(getUrl({ rtl: false }));
          const element = driver.element();
          await waitForVisibilityOf(element, 'Cannot find <MultiSelect/>');
        });

        runDirectionRelatedTests();

        eyes.it(
          'should show focus style + hover (focused by keyboard)',
          async () => {
            const element = driver.element();
            driver.click();
            await eyes.checkWindow('focused by keyboard (not hovered)');
            await mouseEnter(element);
          },
        );

        eyes.it('should show hover style with tag', async () => {
          const element = driver.element();
          await mouseEnter(element);
          await eyes.checkWindow('hover only');
          await driver.addTag();
          await mouseEnter(element);
        });
      });

      describe('RTL', () => {
        beforeAll(async () => {
          await browser.get(getUrl({ rtl: true }));
          const element = driver.element();
          await waitForVisibilityOf(element, 'Cannot find <MultiSelect/>');
        });

        runDirectionRelatedTests();
      });
    });

    describe('Test Page', () => {
      const eyes = eyesItInstance();

      eyes.it('should break to new line when needed', async () => {
        const url = createTestStoryUrl({
          category: storySettings.category,
          storyName: storySettings.storyName,
          testName: '1. With maxNumRows',
        });
        await browser.get(url);
        const driver = multiSelectTestkitFactory({
          dataHook: 'multi-select-limited',
        });
        await waitForVisibilityOf(
          driver.element(),
          'Cannot find <MultiSelect/>',
        );
        const height = await driver.getHeight();

        const ELEMENT_HEIGHT_MULTILINE = 70;
        expect(height).toBe(ELEMENT_HEIGHT_MULTILINE);
      });

      eyes.it('should show hover style (when Reorderable)', async () => {
        const url = createTestStoryUrl({
          category: storySettings.category,
          storyName: storySettings.storyName,
          testName: '2. Reorderable',
        });
        await browser.get(url);
        const driver = multiSelectTestkitFactory({
          dataHook: 'multi-select-reorderable',
        });
        const element = driver.element();
        await waitForVisibilityOf(element, 'Cannot find <MultiSelect/>');
        await mouseEnter(element);
        await eyes.checkWindow('hover only (not tag)');
        await driver.addTag();
        await mouseEnter(element);
      });
    });
  });

  describe('Part B', () => {
    let driver;

    const storyUrl = createTestStoryUrl({
      category: '3. Inputs',
      storyName: '3.8 Tags',
      testName: '3. E2E',
    });

    beforeEach(async () => {
      browser.get(storyUrl);

      driver = multiSelectTestkitFactory({
        dataHook: 'multi-select-only',
      });

      await waitForVisibilityOf(
        driver.element(),
        'Cant find multi-select-only',
      );
    });

    const pressTab = () =>
      browser
        .actions()
        .sendKeys(protractor.Key.TAB)
        .perform();

    eyes.it('should move out focus of dropdown only after 2 tab press when selecting an item', async () => {
      const firstElement = $(`[data-hook="input-for-focus-1"]`);
      pressTab();
      expect(await isFocused(firstElement)).toEqual(true);

      pressTab();
      expect(await driver.isFocused()).toEqual(true);

      await driver.click();
      await driver.hoverItemById('AL');
      await browser.sleep(2000);
      pressTab();
      expect(await driver.isFocused()).toEqual(true);

      pressTab();
      expect(await driver.isFocused()).toEqual(false);
    });

    eyes.it('should move out focus of dropdown when pressing tab without any selection', async () => {
      const firstElement = $(`[data-hook="input-for-focus-1"]`);
      pressTab();
      expect(await isFocused(firstElement)).toEqual(true);

      pressTab();
      expect(await driver.isFocused()).toEqual(true);

      pressTab();
      expect(await driver.isFocused()).toEqual(false);
    });
  });
});
