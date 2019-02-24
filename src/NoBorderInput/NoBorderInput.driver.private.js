import {noBorderInputDriverFactory as publicDriverFactory } from './NoBorderInput.driver';

export const noBorderInputPrivateDriverFactory = base => {
  return {
    ...publicDriverFactory(base),

    // Add here driver methods that considered "private"
  };
};
