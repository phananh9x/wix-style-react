import publicDriverFactory from './RichTextToolbar';

export default base => {
  const getButtons = () => base.$$(`[data-hook*="richtextarea-button"]`);
  const getButtonByType = type =>
    base.$(`[data-hook*="richtextarea-button-${type}"]`);

  return {
    ...publicDriverFactory(base),
    getButtonTypes: () =>
      getButtons().map(async button =>
        (await button.attr('data-hook')).replace(/^richtextarea-button-/, ''),
      ),
    getBoldButton: () => getButtonByType('bold'),
    getItalicButton: () => getButtonByType('italic'),
    getUnderlineButton: () => getButtonByType('underline'),
    getBulletedListButton: () => getButtonByType('unordered-list-item'),
    getNumberedListButton: () => getButtonByType('ordered-list-item'),
    getLinkButton: () => getButtonByType('link'),
    isFormConfirmButtonDisabled: async () =>
      (await base.$('[data-hook=richtextarea-form-confirm-button]').getNative())
        .attributes.disabled,
    isFormDisplayed: () =>
      base.$('[data-hook=richtextarea-form]').isDisplayed(),
    clickBoldButton: () => getButtonByType('bold').click(),
    clickItalicButton: () => getButtonByType('italic').click(),
    clickUnderlineButton: () => getButtonByType('underline').click(),
    clickBulletedListButton: () =>
      getButtonByType('unordered-list-item').click(),
    clickNumberedListButton: () => getButtonByType('ordered-list-item').click(),
    clickLinkButton: () => getButtonByType('link').click(),
    clickFormCancelButton: () =>
      base.$('[data-hook="richtextarea-form-cancel-button"]').click(),
    insertLink: async (text, url) => {
      const textInput = base.$('[data-hook="rich-text-area-link-text"]');
      const urlInput = base.$('[data-hook="rich-text-area-link-url"]');
      const submitButton = base.$('[data-hook="rich-text-area-submit-button"]');

      await textInput.enterValue(text);
      await urlInput.enterValue(url);
      await submitButton.click();
    },
  };
};
