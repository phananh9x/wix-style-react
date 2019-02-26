import { testkitFactoryCreator } from 'wix-ui-test-utils/vanilla';
import buttonLayoutDriverFactory from '../Deprecated/ButtonLayout/ButtonLayout.driver';
import { dataHooks } from './Tag.helpers';
import textDriverFactory from '../Text/Text.driver';
import tagDriverFactory from './Tag.driver';
import { isClassExists } from '../../test/utils';

const buttonLayoutTestkitFactory = testkitFactoryCreator(
  buttonLayoutDriverFactory,
);
const textTestkitFactory = testkitFactoryCreator(textDriverFactory);

const getRemoveButtonLayoutDriver = element => {
  return buttonLayoutTestkitFactory({
    wrapper: element,
    dataHook: dataHooks.removeButton,
  });
};

const getTextDriver = element => {
  return textTestkitFactory({
    wrapper: element,
    dataHook: dataHooks.text,
  });
};

const tagPrivateDriverFactory = ({ element }) => {
  const isCloseButtonLarge = () =>
    getRemoveButtonLayoutDriver(element).doesComponentHasClass('heightlarge');

  return {
    ...tagDriverFactory({ element }),
    isCloseButtonSmall: () => !isCloseButtonLarge(),
    isCloseButtonLarge,
    getTextSize: () => getTextDriver(element).getSize(),
    getTextWeight: () => getTextDriver(element).getWeight(),
    isClickable: () => isClassExists(element, 'clickable'),
  };
};

export default tagPrivateDriverFactory;
