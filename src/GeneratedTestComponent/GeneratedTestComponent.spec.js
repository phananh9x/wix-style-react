import React from 'react';
import { createUniDriverFactory } from 'wix-ui-test-utils/uni-driver-factory';

import GeneratedTestComponent from './GeneratedTestComponent';
import { generatedTestComponentPrivateDriverFactory } from './GeneratedTestComponent.driver.private';

describe('GeneratedTestComponent', () => {
  const createDriver = createUniDriverFactory(
    generatedTestComponentPrivateDriverFactory,
  );

  it('should render', async () => {
    const driver = createDriver(<GeneratedTestComponent />);

    expect(await driver.exists()).toBeTruthy();
    expect(await driver.getButtonText()).toEqual('Click me!');
  });

  it('should increment', async () => {
    const driver = createDriver(<GeneratedTestComponent />);

    await driver.clickButton();
    await driver.clickButton();

    expect(await driver.getCountText()).toEqual(
      'You clicked this button 2 times',
    );
  });

  it('should allow changing the button text', async () => {
    const driver = createDriver(
      <GeneratedTestComponent buttonText="Press me" />,
    );

    expect(await driver.getButtonText()).toEqual('Press me');
  });
});
