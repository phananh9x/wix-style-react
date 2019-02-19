import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';
import ReactTestUtils from 'react-dom/test-utils';

export const getTextArea = base => base.$('.public-DraftEditor-content');

export default base => {
  return {
    ...baseUniDriverFactory(base),
    getContent: () => base.text(),
    enterText: async text => {
      const textAreaNative = await getTextArea(base).getNative();

      if (base.type === 'react') {
        ReactTestUtils.Simulate.beforeInput(textAreaNative, { data: text });
      } else if (base.type === 'protractor') {
        textAreaNative.sendKeys(text);
      }
    },
  };
};
