import { generatedTestComponentDriverFactory as publicDriverFactory } from './GeneratedTestComponent.uni.driver';

export const generatedTestComponentPrivateDriverFactory = base => {
  return {
    ...publicDriverFactory(base),

    // Add here driver methods that considered "private"
  };
};
