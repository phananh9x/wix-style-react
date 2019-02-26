import React from 'react';
import { createUniDriverFactory } from 'wix-ui-test-utils/uni-driver-factory';

import ToggleButton from './ToggleButton';
import { toggleButtonPrivateDriverFactory } from './ToggleButton.private.driver';

describe('ToggleButton', () => {
  const createDriver = createUniDriverFactory(toggleButtonPrivateDriverFactory);

  it('should render', async () => {
    const driver = createDriver(<ToggleButton />);
    expect(await driver.exists()).toBeTruthy();
  });

  it('should be controlled', async () => {
    const driver = createDriver(<ToggleButton />);
    expect(await driver.isSelected()).toBe(false);
    await driver.click();
    expect(await driver.isSelected()).toBe(false);
  });

  describe(`'children' prop`, () => {
    it('should render string', async () => {
      const text = 'Short option';
      const driver = createDriver(<ToggleButton children={text} />);
      expect(await driver.getToggleText()).toBe(text);
    });

    it('should render node', async () => {
      const node = <div data-hook="node">Short option</div>;
      const driver = createDriver(<ToggleButton children={node} />);
      expect(await driver.childExists('[data-hook="node"]')).toBe(true);
    });
  });

  describe(`'prefixIcon' prop`, () => {
    const prefix = <div data-hook="prefix">prefix</div>;
    it(`'should render 'prefix' when given`, async () => {
      const driver = createDriver(<ToggleButton prefixIcon={prefix} />);
      expect(await driver.prefixExists()).toBe(true);
    });
  });

  describe(`'onClick' prop`, () => {
    it(`should return when clicked`, async () => {
      const onClick = jest.fn();
      const driver = createDriver(<ToggleButton onClick={onClick} />);
      await driver.click();
      expect(onClick).toHaveBeenCalled();
    });
  });

  describe(`'disabled' prop`, () => {
    it(`should disable onClick event`, async () => {
      const onClick = jest.fn();
      const driver = createDriver(<ToggleButton disabled onClick={onClick} />);
      await driver.click();
      expect(onClick).toHaveBeenCalledTimes(0);
    });
  });

  describe(`'selected' prop`, () => {
    it(`should set selection styles`, async () => {
      const driver = createDriver(<ToggleButton selected />);
      expect(await driver.isSelected()).toBe(true);
    });
  });
});
