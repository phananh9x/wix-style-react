import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';
import { testkit as inputTestkit } from '../Input/Input.uni.driver';
import { tickerDriverFactory } from '../Input/Ticker/Ticker.uni.driver';

export const numberInputDriverFactory = base => {
  const getInputDriver = () => inputTestkit(base);
  const getTickerDriver = () =>
    tickerDriverFactory(base.$('[data-hook="number-input-ticker"]'));
  return {
    ...baseUniDriverFactory(base),
    ...getInputDriver(),
    /** Click on ticker up */
    clickOnIncrement: () => getTickerDriver().clickUp(),
    /** Click on ticker down */
    clickOnDecrement: () => getTickerDriver().clickDown(),
  };
};
