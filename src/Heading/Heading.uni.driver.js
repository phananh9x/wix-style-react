import {
  baseUniDriverFactory,
  StylableUnidriverUtil,
  ReactBase,
} from '../../test/utils/unidriver';

import style from './Heading.st.css';

export const headingUniDriverFactory = base => {
  const stylableUnidriverUtil = new StylableUnidriverUtil(style);
  const reactBase = ReactBase(base);

  return {
    ...baseUniDriverFactory(base),
    /**
     * Get text content
     * @ReactDOMOnly
     * @returns {string} innerHTML
     * */
    getText: () => reactBase.innerHtml(),
    /**
     * Get appearance
     * @ReactDOMOnly
     * @returns {'H1' | 'H2' | 'H3' | 'H4' | 'H5' | 'H6' }
     * */
    getAppearance: () =>
      stylableUnidriverUtil.getStyleState(base, 'appearance'),
    /**
     * Is light
     * @returns { boolean }
     */
    isLight: () => stylableUnidriverUtil.hasStyleState(base, 'light'),
  };
};
