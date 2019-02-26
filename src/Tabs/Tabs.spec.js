import React from 'react';

import tabsDriverFactory from './Tabs.driver';
import Tabs from './Tabs';
import { createRendererWithDriver, cleanup } from '../../test/utils/unit';

describe('Tabs component', () => {
  const render = createRendererWithDriver(tabsDriverFactory);

  function createComponent(props) {
    return render(<Tabs {...props} />).driver;
  }

  let items;

  beforeEach(() => {
    items = [
      { id: 0, title: 'Tab 0' },
      { id: 1, title: 'Tab 1', dataHook: 'tab-data-hook' },
      { id: 2, title: 'Tab 2' },
    ];
  });

  afterEach(() => {
    cleanup();
  });

  it('should render tabs with correct titles', () => {
    const driver = createComponent({ items });
    const expected = items.map(item => item.title);

    expect(driver.getTitles()).toEqual(expected);
  });

  it('should call onClick when tab is clicked', () => {
    const onClick = jest.fn();
    const driver = createComponent({ items, onClick });

    driver.clickTabAt(1);
    expect(onClick).toHaveBeenCalledWith(items[1]);
  });

  it('should mark tab as active', () => {
    const driver = createComponent({ items, activeId: 2 });
    expect(driver.getActiveTabIndex()).toBe(2);
  });

  it('should have data-hook', () => {
    const driver = createComponent({ items, activeId: 2 });
    expect(driver.getDataHook(1)).toBe('tab-data-hook');
  });

  it('should change active tab', () => {
    const { driver, rerender } = render(<Tabs items={items} activeId={2} />);
    rerender(<Tabs items={items} activeId={1} />);
    expect(driver.getActiveTabIndex()).toBe(1);
  });

  it('should have default type when not specified', () => {
    const driver = createComponent({ items });
    expect(driver.isDefaultType()).toBeTruthy();
  });

  it('should get custom style', () => {
    const type = 'compact';
    const driver = createComponent({ items, type });
    expect(
      driver.getItemsContainerClassList().contains('compact'),
    ).toBeTruthy();
  });

  it('should set tab width, when selected type is Uniform Side', () => {
    const width = '100px';
    const driver = createComponent({ items, width, type: 'uniformSide' });
    expect(driver.getItemsWidth().size).toBe(1);
    expect(driver.getItemsWidth().has(width)).toBeTruthy();
  });

  it('should show side content if defined via props', () => {
    const sideContent = (
      <div>
        Click <a href="blah">here</a>!
      </div>
    );
    const driver = createComponent({ items, sideContent });
    expect(driver.getSideContent()).toBeTruthy();
  });

  it('does not show side content if it is not passed via props', () => {
    const driver = createComponent({ items });
    expect(driver.getSideContent()).toBeFalsy();
  });

  it('should have divider by default', () => {
    const driver = createComponent({ items });

    expect(driver.hasDivider()).toBeTruthy();
  });

  it('should not have divider if props.divider is falsy', () => {
    const driver = createComponent({ items, hasDivider: false });

    expect(driver.hasDivider()).toBeFalsy();
  });

  it('should have divider if props.divider is truthy', () => {
    const driver = createComponent({ items, hasDivider: true });

    expect(driver.hasDivider()).toBeTruthy();
  });
});
