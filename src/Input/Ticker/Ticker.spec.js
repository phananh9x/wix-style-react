import { componentFactory, tickerDriverFactory } from './testkit/Ticker';
import { spy } from 'sinon';

describe('<Ticker/>', () => {
  const createDriver = (props, context) =>
    tickerDriverFactory(componentFactory(props, context));

  it('should create a ticker', () => {
    const driver = createDriver({});
    expect(driver.exists()).toEqual(true);
  });

  it('should allow handling up action', () => {
    const onUp = spy();
    const driver = createDriver({ onUp });
    driver.clickUp();
    expect(onUp.calledOnce).toEqual(true);
  });

  it('should allow handling down action', () => {
    const onDown = spy();
    const driver = createDriver({ onDown });
    driver.clickDown();
    expect(onDown.calledOnce).toEqual(true);
  });

  it('should allow disabling up action', () => {
    const onUp = spy();
    const driver = createDriver({ onUp, upDisabled: true });

    expect(driver.isUpDisabled()).toEqual(true);

    driver.clickUp();
    expect(onUp.calledOnce).toEqual(false);
  });

  it('should allow disabling down action', () => {
    const onDown = spy();
    const driver = createDriver({ onDown, downDisabled: true });

    expect(driver.isDownDisabled()).toEqual(true);

    driver.clickUp();
    expect(onDown.calledOnce).toEqual(false);
  });

  it('should be disabled in case input is disabled', () => {
    const onDown = spy();
    const onUp = spy();
    const driver = createDriver({ onDown, onUp }, { disabled: true });
    expect(driver.isDownDisabled()).toEqual(true);
    expect(driver.isUpDisabled()).toEqual(true);
    driver.clickUp();
    driver.clickDown();
    expect(onUp.calledOnce).toEqual(false);
    expect(onDown.calledOnce).toEqual(false);
  });
});
