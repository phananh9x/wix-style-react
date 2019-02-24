import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';

// TODO: remove when implementation with UniDriver becomes possible
import { Simulate } from 'react-dom/test-utils';

export const dropdownLayoutDriverFactory = base => {
  const byDataHook = dataHook => base.$(`[data-hook="${dataHook}"]`);

  const getOptions = () => byDataHook('dropdown-layout-options').$$('div');
  const getOptionAt = index => getOptions().get(index);

  return {
    ...baseUniDriverFactory(base),

    optionsLength: () => getOptions().count(),

    isOptionHovered: async index => {
      const option = await getOptionAt(index);
      return await option.hasClass('hovered');
    },

    isOptionSelected: async index => {
      const option = await getOptionAt(index);
      return await option.hasClass('selected');
    },

    clickAtOption: async index => {
      if (base.type === 'react') {
        const option = await getOptionAt(index).getNative(); // eslint-disable-line no-restricted-properties
        Simulate.mouseDown(option);
      }
    },
  };
};
