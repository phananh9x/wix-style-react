import React from 'react';
import { createUniDriverFactory } from 'wix-ui-test-utils/uni-driver-factory';

import RichTextInputArea from './RichTextInputArea';
import richTextInputAreaPrivateDriverFactory from './RichTextInputArea.private.driver';

describe('RichTextInputArea', () => {
  const createDriver = createUniDriverFactory(
    richTextInputAreaPrivateDriverFactory,
  );

  // Keeps the parsed HTML value on prop change
  let currentValue;

  describe('Editor', () => {
    it('should render the text when `value` prop is plain text', async () => {
      const text = 'Some text';
      const driver = createDriver(<RichTextInputArea value={text} />);

      expect(await driver.exists()).toBeTruthy();
      expect(await driver.getContent()).toBe(text);
    });

    it('should render the text when `value` prop contains HTML elements', async () => {
      const texts = ['Some', 'text'];
      const expectedText = texts.join(' ');
      const driver = createDriver(
        <RichTextInputArea
          value={`<p>${texts[0]} <strong>${texts[1]}</strong></p>`}
        />,
      );

      expect(await driver.exists()).toBeTruthy();
      expect(await driver.getContent()).toBe(expectedText);
    });

    it('should invoke `onChange` with parsed HTML value after typing text', async () => {
      const callback = jest.fn();
      const text = 'Some text';
      const expectedHtmlValue = `<p>${text}</p>\n`;
      const driver = createDriver(<RichTextInputArea onChange={callback} />);

      await driver.enterText(text);

      expect(callback).toHaveBeenCalledWith(expectedHtmlValue);
    });
  });

  describe('Toolbar', () => {
    it('should render all supported buttons', async () => {
      const buttons = [
        'bold',
        'italic',
        'underline',
        'link',
        'unordered-list-item',
        'ordered-list-item',
      ];
      const driver = createDriver(<RichTextInputArea />);

      expect(await driver.getButtonTypes()).toEqual(buttons);
    });

    it('should render text as bold after clicking the bold button', async () => {
      const driver = createDriver(
        <RichTextInputArea onChange={value => (currentValue = value)} />,
      );
      const typedText = 'Bold';
      const expectedText = `<p><strong>${typedText}</strong></p>\n`;

      await driver.clickBoldButton();
      await driver.enterText(typedText);

      expect(currentValue).toBe(expectedText);
    });

    it('should render text as italic after clicking the italic button', async () => {
      const driver = createDriver(
        <RichTextInputArea onChange={value => (currentValue = value)} />,
      );
      const typedText = 'Italic';
      const expectedText = `<p><em>${typedText}</em></p>\n`;

      await driver.clickItalicButton();
      await driver.enterText(typedText);

      expect(currentValue).toBe(expectedText);
    });

    it('should render text with underline after clicking the underline button', async () => {
      const driver = createDriver(
        <RichTextInputArea onChange={value => (currentValue = value)} />,
      );
      const typedText = 'Underline';
      const expectedText = `<p><ins>${typedText}</ins></p>\n`;

      await driver.clickUnderlineButton();
      await driver.enterText(typedText);

      expect(currentValue).toBe(expectedText);
    });

    it('should render text as bulleted list after clicking the bulleted list button', async () => {
      const driver = createDriver(
        <RichTextInputArea onChange={value => (currentValue = value)} />,
      );
      const typedText = 'Text';
      const expectedText = `<ul>\n<li>${typedText}</li>\n</ul>\n`;

      await driver.clickUnorderedListButton();
      await driver.enterText(typedText);

      expect(currentValue).toBe(expectedText);
    });

    it('should render text as numbered list after clicking the numbered list button', async () => {
      const driver = createDriver(
        <RichTextInputArea onChange={value => (currentValue = value)} />,
      );
      const typedText = 'Text';
      const expectedText = `<ol>\n<li>${typedText}</li>\n</ol>\n`;

      await driver.clickOrderedListButton();
      await driver.enterText(typedText);

      expect(currentValue).toBe(expectedText);
    });

    it.skip('should render text as link after inserting required data', async () => {
      const driver = createDriver(
        <RichTextInputArea onChange={value => (currentValue = value)} />,
      );
      const typedText = 'Link';
      const typedUrl = 'http://wix.com';
      const expectedText = `<p><a href=${typedUrl}>${typedText}</a></p>`;

      await driver.clickLinkButton();
      await driver.insertLink(typedText, typedUrl);

      expect(currentValue).toBe(expectedText);
    });
  });
});
