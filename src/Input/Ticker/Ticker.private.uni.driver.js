import { tickerDriverFactory as publicDriverFactory } from './Ticker.uni.driver';

export const tickerPrivateDriverFactory = base => {
  return {
    ...publicDriverFactory(base),

    // Add here driver methods that considered "private"
  };
};
