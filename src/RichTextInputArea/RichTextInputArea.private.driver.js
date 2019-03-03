import publicDriverFactory, { getTextArea } from './RichTextInputArea.driver';

import richTextToolbarPrivateDriverFactory from './RichTextToolbar.private.driver';

export default base => {
  return {
    ...publicDriverFactory(base),
    ...richTextToolbarPrivateDriverFactory(
      base.$('[data-hook=richtextarea-toolbar]'),
    ),
    hoverTextArea: async () => await getTextArea(base).hover(),
    clickTextArea: async () => await getTextArea(base).click(),
  };
};
