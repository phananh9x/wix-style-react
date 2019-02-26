import { proportionDriverFactory as publicDriverFactory } from './Proportion.driver';

export const proportionPrivateDriverFactory = base => {
  return {
    ...publicDriverFactory(base),

    // Add here driver methods that considered "private"
    /** Get the component's aspect ratio */
    getAspectRatio: async () => {
      const width = await base.attr('offsetWidth');
      const height = await base.attr('offsetHeight');
      return width / height;
    },
  };
};
