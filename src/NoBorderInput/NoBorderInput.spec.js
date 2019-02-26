import React from 'react';
import noBorderInputDriverFactory from './NoBorderInput.driver';
import { createRendererWithDriver, cleanup } from '../../test/utils/unit';
import NoBorderInput from './NoBorderInput';

const renderNoBorderInputWithProps = (props = {}) => (
  <NoBorderInput {...props} />
);

describe('NoBorderInput', () => {
  const render = createRendererWithDriver(noBorderInputDriverFactory);
  const createDriver = jsx => render(jsx).driver;

  afterEach(() => {
    cleanup();
  });

  it('should verify component exists', () => {
    const driver = createDriver(renderNoBorderInputWithProps());
    expect(driver.exists()).toBe(true);
  });

  it('should render label', () => {
    const someLabel = 'bob';
    const driver = createDriver(
      renderNoBorderInputWithProps({ label: someLabel }),
    );
    expect(driver.getLabel()).toEqual(someLabel);
  });

  it('should render the status message', () => {
    const someStatusMessage = 'george';
    const driver = createDriver(
      renderNoBorderInputWithProps({
        status: NoBorderInput.StatusError,
        statusMessage: someStatusMessage,
      }),
    );
    expect(driver.getStatusMessage()).toEqual(someStatusMessage);
  });

  it('should auto focus', () => {
    const driver = createDriver(
      renderNoBorderInputWithProps({ autoFocus: true }),
    );
    expect(driver.isFocus()).toBe(true);
  });

  it('should invoke onFocus', () => {
    const onFocus = jest.fn();
    const driver = createDriver(renderNoBorderInputWithProps({ onFocus }));

    driver.focus();

    expect(onFocus).toHaveBeenCalled();
  });

  it('should invoke onBlur', () => {
    const onBlur = jest.fn();
    const driver = createDriver(renderNoBorderInputWithProps({ onBlur }));

    driver.focus();
    driver.blur();

    expect(onBlur).toHaveBeenCalled();
  });
});
