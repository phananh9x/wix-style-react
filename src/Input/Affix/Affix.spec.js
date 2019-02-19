import React from 'react';

import { componentFactory, customDriverFactory } from './testkit/Affix';

describe('<Custom />', () => {
  const createDriver = props => customDriverFactory(componentFactory(props));

  it('should create custom component and render the given children', () => {
    const driver = createDriver({ children: <div className="smth" /> });
    expect(driver.isEmpty()).toEqual(false);
    expect(driver.hasChild('.smth')).toEqual(true);
  });

  it('should create custom component and render the given value', () => {
    const value = '@';
    const driver = createDriver({ value });
    expect(driver.getValue()).toEqual(value);
  });
});
