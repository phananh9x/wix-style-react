import React from 'react';
import checkboxDriverFactory from './Checkbox.driver';
import { createDriverFactory } from 'wix-ui-test-utils/driver-factory';
import Checkbox from './Checkbox';

const cachedConsoleWarn = global.console.warn;

describe('Checkbox', () => {
  const createDriver = createDriverFactory(checkboxDriverFactory);

  it('should be unchecked and not disabled by default', () => {
    const driver = createDriver(<Checkbox />);
    expect(driver.isChecked()).toBeFalsy();
    expect(driver.isDisabled()).toBeFalsy();
  });

  it('should be checked', () => {
    const driver = createDriver(<Checkbox checked />);
    expect(driver.isChecked()).toBeTruthy();
  });

  it('should be disabled', () => {
    const driver = createDriver(<Checkbox disabled />);
    expect(driver.isDisabled()).toBeTruthy();
  });

  it('should have an error state', () => {
    const driver = createDriver(<Checkbox hasError />);
    expect(driver.hasError()).toBeTruthy();
  });

  it('should call onChange when clicking the Checkbox', () => {
    const onChange = jest.fn();

    const driver = createDriver(<Checkbox onChange={onChange} />);

    driver.click();

    expect(onChange).toBeCalledWith(
      expect.objectContaining({ target: { checked: true } }),
    );
  });

  it('should not call onChange when clicking disabled Checkbox', () => {
    const onChange = jest.fn();

    const driver = createDriver(<Checkbox onChange={onChange} disabled />);

    driver.click();
    expect(onChange).not.toBeCalled();
  });

  it('should not run in indeterminate mode when not specified', () => {
    const driver = createDriver(<Checkbox />);

    expect(driver.isIndeterminate()).toBeFalsy();
  });

  it('should run in indeterminate mode when specified', () => {
    const driver = createDriver(<Checkbox indeterminate />);

    expect(driver.isIndeterminate()).toBeTruthy();
  });

  it('should show error message when in error state with message', async () => {
    const errorMessage = 'Error message';
    const driver = createDriver(
      <Checkbox hasError errorMessage={errorMessage} />,
    );
    expect(await driver.getErrorMessage()).toEqual(errorMessage);
  });

  it('should not show error message when disabled', async () => {
    const errorMessage = 'Error message';
    const driver = createDriver(
      <Checkbox hasError errorMessage={errorMessage} disabled />,
    );
    expect(driver.getErrorMessage()).rejects.toThrow(Error);
  });

  it('should not show error message when no error message stated', async () => {
    const driver = createDriver(<Checkbox hasError />);
    expect(driver.getErrorMessage()).rejects.toThrow(Error);
  });

  it('should not show error message when not in error state', async () => {
    const errorMessage = 'Error message';
    const driver = createDriver(<Checkbox errorMessage={errorMessage} />);
    expect(driver.getErrorMessage()).rejects.toThrow(Error);
  });

  it('should not warn with deprecation warning, if no size', () => {
    global.console.warn = jest.fn();
    createDriver(<Checkbox />);
    expect(global.console.warn).not.toBeCalled();
    global.console.warn = cachedConsoleWarn;
  });
});
