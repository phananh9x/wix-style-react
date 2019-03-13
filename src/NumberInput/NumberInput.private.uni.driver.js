import { numberInputDriverFactory as publicDriverFactory } from './NumberInput.uni.driver';

export const numberInputPrivateDriverFactory = base => {
  return {
    ...publicDriverFactory(base),

    // Add here driver methods that considered "private"
  };
};
