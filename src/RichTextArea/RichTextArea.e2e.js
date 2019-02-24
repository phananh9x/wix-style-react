import eyes from 'eyes.it';
import { richTextAreaTestkitFactory } from '../../testkit/protractor';
import { waitForVisibilityOf } from 'wix-ui-test-utils/protractor';
import { createTestStoryUrl } from '../../test/utils/storybook-helpers';
import {
  storySettings,
  testStories,
} from '../../stories/RichTextArea/storySettings';
import { BUTTON_TYPES } from './RichTextArea.protractor.driver';
import { flattenInternalDriver } from '../../test/utils/private-drivers';

const EDITOR_TAB_ORDINAL = 7;

describe('RichTextArea', () => {
  const richTextAreaTestkit = richTextAreaTestkitFactory({
    dataHook: storySettings.dataHook,
  });

  const pressTab = times =>
    browser
      .actions()
      .sendKeys(
        Array(times)
          .fill()
          .map(() => protractor.Key.TAB),
      )
      .perform();
  const focusEditor = () => pressTab(EDITOR_TAB_ORDINAL);

  const navigateToTestUrl = async testName => {
    const testStoryUrl = createTestStoryUrl({
      category: storySettings.indexCategory,
      storyName: storySettings.storyName,
      dataHook: storySettings.dataHook,
      testName,
    });
    await browser.get(testStoryUrl);
  };

  // TODO: We can change this to beforeAll (to make the test go faster),
  // after we have a way to reset the focus before Each test.
  beforeEach(async () => {
    await navigateToTestUrl(testStories.basic);
  });

  beforeEach(async () => {
    await waitForVisibilityOf(richTextAreaTestkit.element());
  });

  eyes.it('should render default props', async () => {
    expect(richTextAreaTestkit.isEditorFocused()).toBe(
      false,
      'isEditorFocused',
    );
    // TODO: replace with forEachAsync
    for (let index = 0; index < BUTTON_TYPES.length; index++) {
      expect(richTextAreaTestkit.isButtonFocused(index)).toBe(
        false,
        'isButtonFocused',
      );
    }
  });

  describe('Focus', () => {
    eyes.it('should show focus styles for editor', async () => {
      expect(await richTextAreaTestkit.isEditorFocused()).toBe(false);
      await focusEditor();
      expect(await richTextAreaTestkit.isEditorFocused()).toBe(true);
    });

    eyes.it('should show focus styles when navigated by keyboard', async () => {
      // TODO: replace with forEachAsync
      for (let index = 0; index < BUTTON_TYPES.length; index++) {
        const type = BUTTON_TYPES[index];
        const buttonDriver = flattenInternalDriver(
          richTextAreaTestkit.getToolbarButtonDriver(index),
        );
        expect(await buttonDriver.isFocused()).toBe(
          false,
          `${type} - before - focused`,
        );
        expect(await buttonDriver.hasFocusState()).toBe(
          false,
          `${type} - before - hasFocusState`,
        );
        expect(await buttonDriver.hasFocusVisibleState()).toBe(
          false,
          `${type} - before - hasFocusVisibleState`,
        );
        await pressTab(1);
        expect(await buttonDriver.isFocused()).toBe(
          true,
          `${type} - after - focused`,
        );
        expect(await buttonDriver.hasFocusState()).toBe(
          true,
          `${type} - after - hasFocusState`,
        );
        expect(await buttonDriver.hasFocusVisibleState()).toBe(
          true,
          `${type} - after - hasFocusVisibleState`,
        );
        await eyes.checkWindow(`${type} button with focus-visible`);
      }
    });

    it('should NOT show focus styles when clicking buttons by mouse', async () => {
      // TODO: replace with forEachAsync
      for (let index = 0; index < BUTTON_TYPES.length; index++) {
        const type = BUTTON_TYPES[index];
        const buttonDriver = flattenInternalDriver(
          richTextAreaTestkit.getToolbarButtonDriver(index),
        );
        expect(await buttonDriver.isFocused()).toBe(
          false,
          `${type} - before - focused`,
        );
        expect(await buttonDriver.hasFocusState()).toBe(
          false,
          `${type} - before - hasFocusState`,
        );
        expect(await buttonDriver.hasFocusVisibleState()).toBe(
          false,
          `${type} - before - hasFocusVisibleState`,
        );
        await buttonDriver.clickRoot();
        // These buttons shold not be focusable by mouse, since we want the focus to stay in the editor.
        expect(await buttonDriver.isFocused()).toBe(
          false,
          `${type} - after - focused`,
        );
        expect(await buttonDriver.hasFocusState()).toBe(
          false,
          `${type} - after - hasFocusState`,
        );
        expect(await buttonDriver.hasFocusVisibleState()).toBe(
          false,
          `${type} - after - hasFocusVisibleState`,
        );
      }
    });
  });

  describe('Link', () => {
    it('should insert link to empty RTE', async () => {
      await focusEditor();
      await richTextAreaTestkit.clickButtonByType('link');
      await richTextAreaTestkit.isLinkDialogVisible();
      await richTextAreaTestkit.enterLinkUrl('http://www.wix.com');
      await richTextAreaTestkit.enterLinkText('WixSite');
      await richTextAreaTestkit.insertLink();
      expect(await richTextAreaTestkit.getText()).toBe('WixSite');
      expect(
        await richTextAreaTestkit.isLinkAdded('http://www.wix.com'),
      ).toBeTruthy();
    });

    it('should insert link after the word in RTE', async () => {
      await focusEditor();
      await richTextAreaTestkit.enterText('sometext ');
      await richTextAreaTestkit.clickButtonByType('link');
      await richTextAreaTestkit.isLinkDialogVisible();
      await richTextAreaTestkit.enterLinkUrl('http://www.wix.com');
      await richTextAreaTestkit.enterLinkText('WixSite');
      await richTextAreaTestkit.insertLink();
      expect(await richTextAreaTestkit.getText()).toBe('sometext WixSite');
      expect(
        await richTextAreaTestkit.isLinkAdded('http://www.wix.com'),
      ).toBeTruthy();
    });

    it('should create a link from selected text', async () => {
      await focusEditor();
      await richTextAreaTestkit.enterText('sometext and wix');
      await richTextAreaTestkit.selectLastWord();
      await richTextAreaTestkit.clickButtonByType('link');
      await richTextAreaTestkit.isLinkDialogVisible({ withText: false });
      await richTextAreaTestkit.enterLinkUrl('http://www.wix.com');
      await richTextAreaTestkit.insertLink();
      expect(await richTextAreaTestkit.getText()).toBe('sometext and wix');
      expect(
        await richTextAreaTestkit.isLinkAdded('http://www.wix.com'),
      ).toBeTruthy();
    });

    it('should insert link and it should become absolute if absoluteLinks props true', async () => {
      await navigateToTestUrl(testStories.absoluteLinks);
      await focusEditor();
      await richTextAreaTestkit.clickButtonByType('link');
      await richTextAreaTestkit.isLinkDialogVisible();
      await richTextAreaTestkit.enterLinkUrl('www.wix.com');
      await richTextAreaTestkit.enterLinkText('WixSite');
      await richTextAreaTestkit.insertLink();
      expect(await richTextAreaTestkit.getText()).toBe('WixSite');
      expect(
        await richTextAreaTestkit.isLinkAdded('//www.wix.com'),
      ).toBeTruthy();
    });

    it('should insert link and it should not become absolute when absoluteLinks is false (by default)', async () => {
      await focusEditor();
      await richTextAreaTestkit.clickButtonByType('link');
      await richTextAreaTestkit.isLinkDialogVisible();
      await richTextAreaTestkit.enterLinkUrl('www.wix.com');
      await richTextAreaTestkit.enterLinkText('WixSite');
      await richTextAreaTestkit.insertLink();
      expect(await richTextAreaTestkit.getText()).toBe('WixSite');
      expect(
        await richTextAreaTestkit.isLinkAdded('//www.wix.com'),
      ).toBeFalsy();
      expect(await richTextAreaTestkit.isLinkAdded('www.wix.com')).toBeTruthy();
    });
  });

  describe('Focus+Error', () => {
    beforeEach(async () => {
      await navigateToTestUrl(testStories.error);
    });

    eyes.it('should show focus styles for editor', async () => {
      expect(await richTextAreaTestkit.isEditorFocused()).toBe(false);
      await focusEditor();
      expect(await richTextAreaTestkit.isEditorFocused()).toBe(true);
    });

    eyes.it('should show focus styles for each button', async () => {
      // TODO: replace with forEachAsync
      for (let index = 0; index < BUTTON_TYPES.length; index++) {
        const type = BUTTON_TYPES[index];
        expect(await richTextAreaTestkit.isButtonFocused(index)).toBe(false);
        await pressTab(1);
        expect(await richTextAreaTestkit.isButtonFocused(index)).toBe(true);
        await eyes.checkWindow(`Button ${type}`);
      }
    });
  });
});
