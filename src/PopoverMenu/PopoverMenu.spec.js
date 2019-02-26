import React from 'react';
import waitForCond from 'wait-for-cond';

import popoverMenuDriverFactory from './PopoverMenu.driver';
import PopoverMenu from './PopoverMenu';
import PopoverMenuItem from '../PopoverMenuItem/PopoverMenuItem';
import { createDriverFactory } from 'wix-ui-test-utils/driver-factory';

const waitFor = fn => waitForCond.assert(fn, 5000);

afterEach(() => {
  // under the hood PopoverMenu uses Tooltip component, which renders straight into document.body
  // thus need to keep it maintained
  document.body.innerHTML = '';
});

const menuItemDataHook = 'myItemDataHook';

describe('PopoverMenu', () => {
  const createDriver = createDriverFactory(popoverMenuDriverFactory);

  it('should render trigger button', () => {
    const driver = createDriver(<PopoverMenu />);

    expect(driver.exists()).toBe(true);
  });

  it('should render popover menu on trigger button click', async () => {
    const menuItem1Text = 'Menu Item';
    const menuItem1Listener = jest.fn();

    const driver = createDriver(
      <PopoverMenu>
        <PopoverMenuItem
          dataHook={menuItemDataHook}
          text={menuItem1Text}
          onClick={menuItem1Listener}
        />
        <PopoverMenuItem dataHook={menuItemDataHook} text="Menu Item #2" />
      </PopoverMenu>,
    ).init.menuItemDataHook(menuItemDataHook);

    driver.click();

    await waitFor(() => {
      expect(driver.menu.isShown()).toBe(true);
    });

    expect(driver.menu.itemsLength()).toBe(2);
    expect(driver.menu.itemContentAt(0)).toBe(menuItem1Text);

    driver.menu.clickItemAt(0);
    expect(menuItem1Listener).toBeCalled();

    await waitFor(() => {
      expect(driver.menu.isShown()).toBe(false);
    });
  });

  it('should not render non-existing items', async () => {
    const driver = createDriver(
      <PopoverMenu>
        <PopoverMenuItem dataHook={menuItemDataHook} text="Menu Item #1" />
        {false && (
          <PopoverMenuItem dataHook={menuItemDataHook} text="Menu Item #2" />
        )}
      </PopoverMenu>,
    ).init.menuItemDataHook(menuItemDataHook);

    driver.click();

    await waitFor(() => {
      expect(driver.menu.isShown()).toBe(true);
    });

    expect(driver.menu.itemsLength()).toBe(1);
  });

  it('should render item disabled', async () => {
    const menuItem1Listener = jest.fn();
    const driver = createDriver(
      <PopoverMenu>
        <PopoverMenuItem
          dataHook={menuItemDataHook}
          onClick={menuItem1Listener}
          disabled
        />
      </PopoverMenu>,
    ).init.menuItemDataHook(menuItemDataHook);

    driver.click();

    await waitFor(() => {
      expect(driver.menu.isShown()).toBe(true);
    });

    driver.menu.clickItemAt(0);
    expect(menuItem1Listener).not.toBeCalled();
  });

  it('should not render arrow when prop showArrow=false', async () => {
    const driver = createDriver(
      <PopoverMenu showArrow={false}>
        <PopoverMenuItem dataHook={menuItemDataHook} />
      </PopoverMenu>,
    ).init.menuItemDataHook(menuItemDataHook);
    driver.click();

    await waitFor(() => {
      expect(driver.menu.isShown()).toBe(true);
    });

    expect(driver.menu.hasArrow()).toBeFalsy();
  });

  it('should invoke onShow property when menu is shows ', async () => {
    const onShow = jest.fn();
    const driver = createDriver(
      <PopoverMenu onShow={onShow}>
        <PopoverMenuItem dataHook={menuItemDataHook} />
      </PopoverMenu>,
    ).init.menuItemDataHook(menuItemDataHook);
    driver.click();

    await waitFor(() => {
      expect(driver.menu.isShown()).toBe(true);
      expect(onShow).toHaveBeenCalled();
    });
  });

  it('should invoke onHide property when menu is hides ', async () => {
    const onHide = jest.fn();
    const driver = createDriver(
      <PopoverMenu onHide={onHide}>
        <PopoverMenuItem dataHook={menuItemDataHook} />
      </PopoverMenu>,
    ).init.menuItemDataHook(menuItemDataHook);
    driver.click();

    await waitFor(() => {
      expect(driver.menu.isShown()).toBe(true);
    });

    driver.click();
    await waitFor(() => {
      expect(driver.menu.isShown()).toBe(false);
      expect(onHide).toHaveBeenCalled();
    });
  });

  it('should not invoke onHide and onShow properties when menu is hides ', async () => {
    const onHide = jest.fn();
    const onShow = jest.fn();

    const driver = createDriver(
      <PopoverMenu>
        <PopoverMenuItem dataHook={menuItemDataHook} />
      </PopoverMenu>,
    ).init.menuItemDataHook(menuItemDataHook);
    driver.click();

    await waitFor(() => {
      expect(driver.menu.isShown()).toBe(true);
      expect(onShow).not.toHaveBeenCalled();
    });

    driver.click();
    await waitFor(() => {
      expect(driver.menu.isShown()).toBe(false);
      expect(onHide).not.toHaveBeenCalled();
    });
  });
});
