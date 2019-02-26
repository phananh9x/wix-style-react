import { calendarPanelFooterDriverFactory as publicDriverFactory } from './CalendarPanelFooter.driver';

export const calendarPanelFooterPrivateDriverFactory = base => {
  return {
    ...publicDriverFactory(base),

    // Add here driver methods that considered "private"
  };
};
