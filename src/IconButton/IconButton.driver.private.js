import { iconButtonDriverFactory as publicDriverFactory } from './IconButton.driver';

export const iconButtonPrivateDriverFactory = base => {
  return {
    ...publicDriverFactory(base),
    getIconSize: async () =>
      await base.$('[data-hook="iconbutton-icon"]').attr('height'),
  };
};
