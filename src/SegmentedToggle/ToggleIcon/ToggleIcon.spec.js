import React from 'react';
import { createUniDriverFactory } from 'wix-ui-test-utils/uni-driver-factory';

import ToggleIcon from './ToggleIcon';
import { toggleIconPrivateDriverFactory } from './ToggleIcon.private.driver';
import LockLocked from '../../new-icons/LockLocked';

describe('ToggleIcon', () => {
  const createDriver = createUniDriverFactory(toggleIconPrivateDriverFactory);

  it('should render', async () => {
    const driver = createDriver(<ToggleIcon />);
    expect(await driver.exists()).toBeTruthy();
  });

  it('should be controlled', async () => {
    const driver = createDriver(<ToggleIcon />);
    expect(await driver.isSelected()).toBe(false);
    await driver.click();
    expect(await driver.isSelected()).toBe(false);
  });

  describe(`'children' prop`, () => {
    it('should render node', async () => {
      const dataHook = 'icon';
      const icon = (
        <div data-hook={dataHook}>
          <LockLocked />
        </div>
      );
      const driver = createDriver(<ToggleIcon children={icon} />);
      expect(await driver.childExists(`[data-hook="${dataHook}"`)).toBe(true);
    });
  });

  describe(`'onClick' prop`, () => {
    it(`should return when clicked`, async () => {
      const onClick = jest.fn();
      const driver = createDriver(<ToggleIcon onClick={onClick} />);
      await driver.click();
      expect(onClick).toHaveBeenCalled();
    });
  });

  describe(`'disabled' prop`, () => {
    it(`should disable onClick event`, async () => {
      const onClick = jest.fn();
      const driver = createDriver(<ToggleIcon disabled onClick={onClick} />);
      await driver.click();
      expect(onClick).toHaveBeenCalledTimes(0);
    });
  });

  describe(`'selected' prop`, () => {
    it(`should set selection styles`, async () => {
      const driver = createDriver(<ToggleIcon selected />);
      expect(await driver.isSelected()).toBe(true);
    });
  });
});
