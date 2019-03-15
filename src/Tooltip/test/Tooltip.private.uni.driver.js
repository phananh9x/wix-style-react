import { tooltipDriverFactory as publicDriverFactory } from '../Tooltip.uni.driver';

export const tooltipPrivateDriverFactory = base => {
  return {
    ...publicDriverFactory(base),

    // Add here driver methods that considered "private"
  };
};
