import { dateInputDriverFactory as publicDriverFactory } from './DateInput.uni.driver';

export const dateInputPrivateDriverFactory = base => {
  return {
    ...publicDriverFactory(base),
    hasDateIcon: () => base.$('[data-hook="date-input-date-icon"]').exists(),
    // Add here driver methods that considered "private"
  };
};
