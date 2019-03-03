import React from 'react';
import { createUniDriverFactory } from 'wix-ui-test-utils/uni-driver-factory';

import {%ComponentName%} from './{%ComponentName%}';
import { {%componentName%}PrivateDriverFactory } from './{%ComponentName%}.private.uni.driver';

describe('{%ComponentName%}', () => {
  const createDriver = createUniDriverFactory({%componentName%}PrivateDriverFactory);

  it('should render', async () => {
    const driver = createDriver(<{%ComponentName%} />);

    expect(await driver.exists()).toBeTruthy();
    expect(await driver.getButtonText()).toEqual('Click me!');
  });

  it('should increment', async () => {
    const driver = createDriver(<{%ComponentName%} />);

    await driver.clickButton();
    await driver.clickButton();

    expect(await driver.getCountText()).toEqual(
      'You clicked this button 2 times',
    );
  });

  it('should allow changing the button text', async () => {
    const driver = createDriver(<{%ComponentName%} buttonText="Press me" />);

    expect(await driver.getButtonText()).toEqual('Press me');
  });
});

