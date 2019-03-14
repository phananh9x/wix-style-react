import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';

import styles from './Ticker.scss';

export const tickerDriverFactory = base => {
  return {
    ...baseUniDriverFactory(base),
    clickUp: () => base.$(`.${styles.up}`).click(),
    clickDown: () => base.$(`.${styles.down}`).click(),
    isUpDisabled: () => base.$(`.${styles.up}`).hasClass(styles.disabled),
    isDownDisabled: () => base.$(`.${styles.down}`).hasClass(styles.disabled),
  };
};
