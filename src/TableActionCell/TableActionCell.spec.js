import React from 'react';
import { createDriverFactory } from 'wix-ui-test-utils/driver-factory';
import eventually from 'wix-eventually';

import TableActionCell from './TableActionCell';
import tableActionCellDriverFactory from './TableActionCell.driver';
import { flattenInternalDriver } from '../../test/utils/private-drivers';

const primaryActionProps = (actionTrigger = () => {}, disabled = false) => ({
  primaryAction: {
    text: 'primary action',
    theme: 'whiteblue',
    onClick: actionTrigger,
    disabled,
  },
});

const secondaryActionsProps = (actionTriggers = []) => {
  const createAction = n => ({
    text: `Action ${n}`,
    icon: <span>{`Icon ${n}`}</span>, // simulate the icon as <span> elements
    onClick: actionTriggers[n] || (() => {}),
  });

  return {
    secondaryActions: Array(4)
      .fill()
      .map((val, idx) => createAction(idx)),
    numOfVisibleSecondaryActions: 2,
  };
};

describe('Table Action Cell', () => {
  const createDriver = (...args) =>
    flattenInternalDriver(
      createDriverFactory(tableActionCellDriverFactory)(...args),
    );

  it("should have a placeholder when there's only a primary action", () => {
    const driver = createDriver(<TableActionCell {...primaryActionProps()} />);
    expect(driver.primaryActionPlaceholderExists()).toBeTruthy();
  });

  it('should display the primary action button', () => {
    const onPrimaryActionTrigger = jest.fn();

    const driver = createDriver(
      <TableActionCell {...primaryActionProps(onPrimaryActionTrigger)} />,
    );

    expect(driver.getPrimaryActionButtonDriver().exists()).toBeTruthy();
    expect(
      driver.getPrimaryActionButtonDriver().getButtonTextContent(),
    ).toEqual('primary action');
  });

  it('should trigger the primary action on primary button click', () => {
    const onPrimaryActionTrigger = jest.fn();

    const driver = createDriver(
      <TableActionCell {...primaryActionProps(onPrimaryActionTrigger)} />,
    );

    driver.clickPrimaryActionButton();
    expect(onPrimaryActionTrigger).toHaveBeenCalledTimes(1);
  });

  it('should not have a primary action placeholder when there are also secondary actions', () => {
    const driver = createDriver(
      <TableActionCell
        {...primaryActionProps()}
        {...secondaryActionsProps()}
      />,
    );

    expect(driver.primaryActionPlaceholderExists()).toBeFalsy();
  });

  it('should put visible secondary actions in the cell', async () => {
    const driver = createDriver(
      <TableActionCell
        {...primaryActionProps()}
        {...secondaryActionsProps()}
      />,
    );

    expect(driver.getVisibleActionsCount()).toEqual(2);

    expect(
      driver.getVisibleActionButtonDriver(0).getButtonTextContent(),
    ).toEqual('Icon 0');
    expect(
      driver.getVisibleActionButtonDriver(1).getButtonTextContent(),
    ).toEqual('Icon 1');

    const tooltipDriver1 = driver.getVisibleActionTooltipDriver(0);
    const tooltipDriver2 = driver.getVisibleActionTooltipDriver(1);

    tooltipDriver1.mouseEnter();
    await eventually(() =>
      expect(tooltipDriver1.getContent()).toEqual('Action 0'),
    );
    tooltipDriver1.mouseLeave();

    tooltipDriver2.mouseEnter();

    await eventually(() =>
      expect(tooltipDriver2.getContent()).toEqual('Action 1'),
    );
    tooltipDriver2.mouseLeave();
  });

  it('should put hidden secondary action in a PopoverMenu', async () => {
    const driver = createDriver(
      <TableActionCell
        {...primaryActionProps()}
        {...secondaryActionsProps()}
      />,
    );

    const popoverMenuDriver = driver.getHiddenActionsPopoverMenuDriver(0);

    expect(popoverMenuDriver.exists()).toEqual(true);

    popoverMenuDriver.click();

    await eventually(() => {
      expect(popoverMenuDriver.menu.itemsLength()).toEqual(2);
      expect(popoverMenuDriver.menu.itemContentAt(0)).toEqual('Action 2');
      expect(popoverMenuDriver.menu.itemContentAt(1)).toEqual('Action 3');
    });
  });

  it('should trigger secondary action on click', async () => {
    const actionTriggers = Array(4)
      .fill()
      .map(() => jest.fn());

    const driver = createDriver(
      <TableActionCell
        {...primaryActionProps()}
        {...secondaryActionsProps(actionTriggers)}
      />,
    );

    driver.clickVisibleAction(0);
    driver.clickVisibleAction(1);

    driver.clickPopoverMenu();
    await eventually(() => driver.clickHiddenAction(0));

    driver.clickPopoverMenu();
    await eventually(() => driver.clickHiddenAction(1));

    actionTriggers.forEach(actionTrigger => {
      expect(actionTrigger).toHaveBeenCalledTimes(1);
    });
  });

  it('should render disabled hidden actions', async () => {
    const actionTrigger = jest.fn();
    const disabledAction = {
      text: `Disabled Action`,
      icon: <span>Icon</span>,
      onClick: actionTrigger,
      disabled: true,
    };
    const driver = createDriver(
      <TableActionCell
        {...primaryActionProps()}
        secondaryActions={[disabledAction]}
        numOfVisibleSecondaryActions={0}
      />,
    );

    driver.clickPopoverMenu();

    await eventually(() => driver.clickHiddenAction(0));

    expect(actionTrigger).toHaveBeenCalledTimes(0);
  });

  it('should allow to change the number of visible secondary actions', async () => {
    const driver = createDriver(
      <TableActionCell
        {...primaryActionProps()}
        {...secondaryActionsProps()}
        numOfVisibleSecondaryActions={3}
      />,
    );

    expect(driver.getVisibleActionsCount()).toEqual(3);

    driver.clickPopoverMenu();
    await eventually(() => expect(driver.getHiddenActionsCount()).toEqual(1));
  });

  it('should mark the primary action as disabled', () => {
    const driver = createDriver(
      <TableActionCell {...primaryActionProps(() => {}, true)} />,
    );

    expect(driver.getIsPrimaryActionButtonDisabled()).toBe(true);
  });
});
