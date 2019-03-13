import React from 'react';
import { createUniDriverFactory } from 'wix-ui-test-utils/uni-driver-factory';
import { tickerPrivateDriverFactory } from './Ticker.private.uni.driver';
import Ticker from './Ticker';
import Input from '../Input';

describe('<Ticker/>', () => {
  const createDriver = createUniDriverFactory(tickerPrivateDriverFactory);
  const getInputWithTicker = (ticker, props = {}) => {
    return <Input suffix={ticker} {...props} />;
  };
  it('should create a ticker', async () => {
    const driver = createDriver(getInputWithTicker(<Ticker />));
    expect(await driver.exists()).toEqual(true);
  });

  it('should allow handling up action', async () => {
    const onUp = jest.fn();
    const driver = createDriver(getInputWithTicker(<Ticker onUp={onUp} />));
    await driver.clickUp();
    expect(onUp).toHaveBeenCalled();
  });

  it('should allow handling down action', async () => {
    const onDown = jest.fn();
    const driver = createDriver(getInputWithTicker(<Ticker onDown={onDown} />));
    await driver.clickDown();
    expect(onDown).toHaveBeenCalled();
  });

  it('should allow disabling up action', async () => {
    const onUp = jest.fn();
    const driver = createDriver(
      getInputWithTicker(<Ticker onUp={onUp} upDisabled />),
    );
    expect(await driver.isUpDisabled()).toEqual(true);
    await driver.clickUp();
    expect(onUp).not.toHaveBeenCalled();
  });

  it('should allow disabling down action', async () => {
    const onDown = jest.fn();
    const driver = createDriver(
      getInputWithTicker(<Ticker onDown={onDown} downDisabled />),
    );
    expect(await driver.isDownDisabled()).toEqual(true);
    await driver.clickUp();
    expect(onDown).not.toHaveBeenCalled();
  });

  it('should be disabled in case input is disabled', async () => {
    const onDown = jest.fn();
    const onUp = jest.fn();
    const driver = createDriver(
      getInputWithTicker(<Input.Ticker onDown={onDown} onUp={onUp} />, {
        disabled: true,
      }),
    );
    expect(await driver.isDownDisabled()).toEqual(true);
    expect(await driver.isUpDisabled()).toEqual(true);
    driver.clickUp();
    driver.clickDown();
    expect(onUp).not.toHaveBeenCalled();
    expect(onDown).not.toHaveBeenCalled();
  });
});
