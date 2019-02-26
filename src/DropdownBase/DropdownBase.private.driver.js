import { dropdownBaseDriverFactory as publicDriverFactory } from './DropdownBase.driver';
import { dropdownLayoutDriverFactory } from '../DropdownLayout/DropdownLayout.uni.driver';

// TODO: remove when implementation with UniDriver becomes possible
import { Simulate } from 'react-dom/test-utils';

export const dropdownBasePrivateDriverFactory = base => {
  const byDataHook = dataHook => base.$(`[data-hook="${dataHook}"]`);

  const getTargetElement = () => byDataHook('popover-element');
  const getContentElement = () => byDataHook('popover-content');

  const createDropdownLayoutDriver = () => dropdownLayoutDriverFactory(base);

  return {
    ...publicDriverFactory(base),

    /** Returns the native target element */
    getTargetElement: () => getTargetElement().getNative(),

    /** Returns the native DropdownLayout element */
    getDropdownElement: () => getContentElement().getNative(),

    /** Return `true` if the option is hovered by the mouse */
    isOptionHovered: async index =>
      createDropdownLayoutDriver().isOptionHovered(index),

    /** Return `true` if the option is selected */
    isOptionSelected: async index =>
      createDropdownLayoutDriver().isOptionSelected(index),

    /** Trigger a keyDown event on the target element */
    keyDown: async key => {
      if (base.type === 'react') {
        Simulate.keyDown(await getTargetElement().getNative(), { key });
      }
    },

    /** Perform a mouseEnter on the target element */
    mouseEnterTarget: async () => {
      if (base.type === 'react') {
        Simulate.mouseEnter(
          (await getTargetElement().getNative()).childNodes[0],
        );
      }
    },

    /** Perform a mouseEnter on the target element */
    mouseLeaveTarget: async () => {
      if (base.type === 'react') {
        Simulate.mouseLeave(
          (await getTargetElement().getNative()).childNodes[0],
        );
      }
    },
  };
};
