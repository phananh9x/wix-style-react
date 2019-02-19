import React from 'react';
import Search from '../../new-icons/Search';

import { componentFactory, iconDriverFactory } from './testkit/IconAffix';

describe('<Icon />', () => {
  const createDriver = props => iconDriverFactory(componentFactory(props));

  it('should create icon component and render the given icon', () => {
    const driver = createDriver({
      children: <Search data-hook="search-icon" />,
    });
    expect(driver.isEmpty()).toEqual(false);
    expect(driver.hasChild('[data-hook="search-icon"]')).toEqual(true);
  });
});
