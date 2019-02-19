import popoverMenuDriverFactory from '../PopoverMenu/PopoverMenu.driver';
import tooltipDriverFactory from '../Tooltip/Tooltip.driver';
import buttonDriverFactory from '../Deprecated/Button/Button.driver.js';
import { INTERNAL_DRIVER_SYMBOL } from '../../test/utils/private-drivers';

const tableActionCellDriverFactory = ({ element }) => {
  const getPrimaryActionPlaceholder = () =>
    element.querySelector('[data-hook="table-action-cell-placeholder"]');
  const getVisibleActionsWrapper = () =>
    element.querySelector('[data-hook="table-action-cell-visible-actions"]');

  const getPrimaryActionButtonDriver = () =>
    buttonDriverFactory({
      element: element.querySelector(
        '[data-hook="table-action-cell-primary-action"] button',
      ),
    });

  const getVisibleActionTooltipDriver = actionIndex =>
    tooltipDriverFactory({
      element: getVisibleActionsWrapper().querySelectorAll(
        '[data-hook="table-action-cell-visible-action-tooltip"]',
      )[actionIndex],
    });

  const getVisibleActionButtonDriver = actionIndex =>
    buttonDriverFactory({
      element: getVisibleActionsWrapper().querySelectorAll('button')[
        actionIndex
      ],
    });

  const getHiddenActionsPopoverMenuDriver = () =>
    popoverMenuDriverFactory({
      element: element.querySelector(
        '[data-hook="table-action-cell-popover-menu"]',
      ),
    })
      .init.menuItemDataHook('table-action-cell-popover-menu-item')
      .init.parentElement(element);

  return {
    /** Get the element */
    element: () => element,
    /** Whether the element exists */
    exists: () => !!element,
    /** Get the driver of the primary action <Button/> from the action column */
    getPrimaryActionButtonDriver,
    /** Click the primary action button from the action column */
    clickPrimaryActionButton: () => getPrimaryActionButtonDriver().click(),
    /** Get whether the primary action button is disabled */
    getIsPrimaryActionButtonDisabled: () =>
      getPrimaryActionButtonDriver().isButtonDisabled(),
    /** Get the number of the visible secondary actions */
    getVisibleActionsCount: () => getVisibleActionsWrapper().childElementCount,
    /** Get the number of hidden secondary actions (in the <PopoverMenu/>, requires it to be open) */
    getHiddenActionsCount: () =>
      getHiddenActionsPopoverMenuDriver().menu.itemsLength(),
    /** Get the driver of a specific visible secondary action <Tooltip/> */
    getVisibleActionTooltipDriver,
    /** Get the driver of a specific visible secondary action <Button/> */
    getVisibleActionButtonDriver,
    /** Get the driver of the hidden secondary action <PopoverMenu/> */
    getHiddenActionsPopoverMenuDriver,
    /** Click an a visible secondary action */
    clickVisibleAction: actionIndex =>
      getVisibleActionButtonDriver(actionIndex).click(),
    /** Click on the hidden secondary actions <PopoverMenu/> */
    clickPopoverMenu: () => getHiddenActionsPopoverMenuDriver().click(),
    /** Click on a hidden secondary action (requires the <PopoverMenu/> to be open) */
    clickHiddenAction: actionIndex =>
      getHiddenActionsPopoverMenuDriver().menu.clickItemAt(actionIndex),

    /* Private driver */
    [INTERNAL_DRIVER_SYMBOL]: {
      /** Whether the primary action placeholder exists */
      primaryActionPlaceholderExists: () => !!getPrimaryActionPlaceholder(),
    },
  };
};

export default tableActionCellDriverFactory;
