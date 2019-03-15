import React from 'react';
import { createUniDriverFactory } from 'wix-ui-test-utils/uni-driver-factory';

import Tooltip from '../Tooltip';
import { tooltipPrivateDriverFactory } from './Tooltip.private.uni.driver';

describe('Tooltip', () => {
  const createDriver = createUniDriverFactory(tooltipPrivateDriverFactory);

  it('should render', async () => {
    const driver = createDriver(<Tooltip />);

    expect(await driver.exists()).toBeTruthy();
    expect(await driver.getButtonText()).toEqual('Click me!');
  });

  it('should increment', async () => {
    const driver = createDriver(<Tooltip />);

    await driver.clickButton();
    await driver.clickButton();

    expect(await driver.getCountText()).toEqual(
      'You clicked this button 2 times',
    );
  });

  it('should allow changing the button text', async () => {
    const driver = createDriver(<Tooltip buttonText="Press me" />);

    expect(await driver.getButtonText()).toEqual('Press me');
  });
});
