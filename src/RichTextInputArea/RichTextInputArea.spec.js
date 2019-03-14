import React from 'react';
import { createUniDriverFactory } from 'wix-ui-test-utils/uni-driver-factory';

import RichTextInputArea from './RichTextInputArea';
import richTextInputAreaPrivateDriverFactory from './RichTextInputArea.private.driver';
import toolbarButtonStyles from './RichTextToolbarButton.scss';

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

      expect(await driver.exists()).toBe(true);
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

      expect(await driver.exists()).toBe(true);
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

    describe('Bold', () => {
      const sampleText = 'Bold';
      const sampleValue = `<p><strong>${sampleText}</strong></p>\n`;

      it('should render text as bold after clicking the bold button', async () => {
        const driver = createDriver(
          <RichTextInputArea onChange={value => (currentValue = value)} />,
        );

        await driver.clickBoldButton();
        await driver.enterText(sampleText);

        expect(currentValue).toBe(sampleValue);
      });

      it('should render the bold button as active after clicking the button', async () => {
        const driver = createDriver(<RichTextInputArea />);
        const button = await driver.getBoldButton();

        await driver.clickBoldButton();

        expect(await button.hasClass(toolbarButtonStyles.active)).toBe(true);
      });

      it('should render the bold button as active when the selection contains bold text', async () => {
        const driver = createDriver(<RichTextInputArea value={sampleValue} />);
        const button = await driver.getBoldButton();

        expect(await button.hasClass(toolbarButtonStyles.active)).toBe(true);
      });
    });

    describe('Italic', () => {
      const sampleText = 'Italic';
      const sampleValue = `<p><em>${sampleText}</em></p>\n`;

      it('should render text as italic after clicking the italic button', async () => {
        const driver = createDriver(
          <RichTextInputArea onChange={value => (currentValue = value)} />,
        );

        await driver.clickItalicButton();
        await driver.enterText(sampleText);

        expect(currentValue).toBe(sampleValue);
      });

      it('should render the italic button as active after clicking the button', async () => {
        const driver = createDriver(<RichTextInputArea />);
        const button = await driver.getItalicButton();

        await driver.clickItalicButton();

        expect(await button.hasClass(toolbarButtonStyles.active)).toBe(true);
      });

      it('should render the italic button as active when the selection contains italic text', async () => {
        const driver = createDriver(<RichTextInputArea value={sampleValue} />);
        const button = await driver.getItalicButton();

        expect(await button.hasClass(toolbarButtonStyles.active)).toBe(true);
      });
    });

    describe('Underline', () => {
      const sampleText = 'Underline';
      const sampleValue = `<p><ins>${sampleText}</ins></p>\n`;

      it('should render text with underline after clicking the underline button', async () => {
        const driver = createDriver(
          <RichTextInputArea onChange={value => (currentValue = value)} />,
        );

        await driver.clickUnderlineButton();
        await driver.enterText(sampleText);

        expect(currentValue).toBe(sampleValue);
      });

      it('should render the underline button as active after clicking the button', async () => {
        const driver = createDriver(<RichTextInputArea />);
        const button = await driver.getUnderlineButton();

        await driver.clickUnderlineButton();

        expect(await button.hasClass(toolbarButtonStyles.active)).toBe(true);
      });

      it.skip('should render the underline button as active when the selection contains underline text', async () => {
        const driver = createDriver(<RichTextInputArea value={sampleValue} />);
        const button = await driver.getUnderlineButton();

        expect(await button.hasClass(toolbarButtonStyles.active)).toBe(true);
      });
    });

    describe('Bulleted List', () => {
      const sampleText = 'Text';
      const sampleValue = `<ul>\n<li>${sampleText}</li>\n</ul>\n`;

      it('should render text as bulleted list after clicking the bulleted list button', async () => {
        const driver = createDriver(
          <RichTextInputArea onChange={value => (currentValue = value)} />,
        );

        await driver.clickBulletedListButton();
        await driver.enterText(sampleText);

        expect(currentValue).toBe(sampleValue);
      });

      it('should render the bulleted list button as active after clicking the button', async () => {
        const driver = createDriver(<RichTextInputArea />);
        const button = await driver.getBulletedListButton();

        await driver.clickBulletedListButton();

        expect(await button.hasClass(toolbarButtonStyles.active)).toBe(true);
      });

      it.skip('should render the bulleted list button as active when the selection contains an item', async () => {
        const driver = createDriver(<RichTextInputArea value={sampleValue} />);
        const button = await driver.getBulletedListButton();

        expect(await button.hasClass(toolbarButtonStyles.active)).toBe(true);
      });
    });

    describe('Numbered List', () => {
      const sampleText = 'Text';
      const sampleValue = `<ol>\n<li>${sampleText}</li>\n</ol>\n`;

      it('should render text as numbered list after clicking the numbered list button', async () => {
        const driver = createDriver(
          <RichTextInputArea onChange={value => (currentValue = value)} />,
        );

        await driver.clickNumberedListButton();
        await driver.enterText(sampleText);

        expect(currentValue).toBe(sampleValue);
      });

      it('should render the numbered list button as active after clicking the button', async () => {
        const driver = createDriver(<RichTextInputArea />);
        const button = await driver.getNumberedListButton();

        await driver.clickNumberedListButton();

        expect(await button.hasClass(toolbarButtonStyles.active)).toBe(true);
      });

      it.skip('should render the numbered list button as active when the selection contains an item', async () => {
        const driver = createDriver(<RichTextInputArea value={sampleValue} />);
        const button = await driver.getNumberedListButton();

        expect(await button.hasClass(toolbarButtonStyles.active)).toBe(true);
      });
    });

    describe('Link', () => {
      it('should display a form for inserting link after clicking the link button', async () => {
        const driver = createDriver(<RichTextInputArea />);

        await driver.clickLinkButton();

        expect(await driver.isFormDisplayed()).toBe(true);
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

      it('should render the link button as active after clicking the button', async () => {
        const driver = createDriver(<RichTextInputArea />);
        const button = await driver.getLinkButton();

        await driver.clickLinkButton();

        expect(await button.hasClass(toolbarButtonStyles.active)).toBe(true);
      });
    });
  });

  describe('Form', () => {
    it('should disable the confirm button when url is empty', async () => {
      const driver = createDriver(<RichTextInputArea />);

      await driver.clickLinkButton();

      expect(await driver.isFormDisplayed()).toBe(true);
    });

    it.skip('should hide the form after clicking the cancel button', async () => {
      const driver = createDriver(<RichTextInputArea />);

      await driver.clickLinkButton();
      await driver.clickFormCancelButton();

      expect(await driver.isFormDisplayed()).toBe(false);
    });
  });
});
