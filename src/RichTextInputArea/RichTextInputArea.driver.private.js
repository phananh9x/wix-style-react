import publicDriverFactory, { getTextArea } from './RichTextInputArea.driver';

export default base => {
  return {
    ...publicDriverFactory(base),
    hoverTextArea: async () => await getTextArea(base).hover(),
    clickTextArea: async () => await getTextArea(base).click(),
  };
};
