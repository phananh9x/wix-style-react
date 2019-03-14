import React from 'react';
import Slider from './Slider';
import { createDriverFactory } from 'wix-ui-test-utils/driver-factory';
import sliderDriverFactory from './Slider.driver';

describe('Slider', () => {
  const createDriver = createDriverFactory(sliderDriverFactory);

  it('should render slider', () => {
    const onChange = jest.fn(value => this.setState({ value }));
    const props = { value: [3], min: 1, max: 10, onChange };

    const driver = createDriver(<Slider {...props} />);

    expect(driver.numOfSliderDots()).toBe(10);
    expect(driver.numOfSliderHandles()).toBe(1);
    expect(driver.isDotSelected(3)).toBe(true);
  });

  it('should render slider with multi-range', () => {
    const onChange = jest.fn(value => this.setState({ value }));
    const props = { value: [3, 5, 7], min: 1, max: 10, onChange };

    const driver = createDriver(<Slider {...props} />);

    expect(driver.numOfSliderDots()).toBe(10);
    expect(driver.numOfSliderHandles()).toBe(3);

    props.value.forEach(selectedValue => {
      expect(driver.isDotSelected(selectedValue)).toBe(true);
    });
  });

  it('should show correct value on hover', () => {
    const onChange = jest.fn(value => this.setState({ value }));
    const props = { value: [3, 5, 7], min: 1, max: 10, onChange };

    const driver = createDriver(<Slider {...props} />);

    driver.hoverHandle({ handleIndex: 0 });

    expect(driver.getToolTipValue()).toBe(`${props.value[0]}`);

    driver.unHoverHandle({ handleIndex: 0 });
    driver.hoverHandle({ handleIndex: 1 });

    expect(driver.getToolTipValue()).toBe(`${props.value[1]}`);
  });

  it('should not display tooltip if `displayTooltip` is set to false', () => {
    const onChange = jest.fn(value => this.setState({ value }));
    const props = { value: [4], displayTooltip: false, onChange };

    const driver = createDriver(<Slider {...props} />);

    driver.hoverHandle({ handleIndex: 0 });

    expect(driver.getToolTipValue()).toBeFalsy();

    driver.unHoverHandle({ handleIndex: 0 });
  });

  describe(`Range mode`, () => {
    it('should be enabled when array is given to value prop', () => {
      const onChange = jest.fn();
      const props = { value: [2, 4, 6], displayTooltip: false, onChange };
      const driver = createDriver(<Slider {...props} />);
      expect(driver.numOfSliderHandles()).toBe(3);
    });
  });

  describe(`Slide mode`, () => {
    it('should be enabled when number is given to value prop', () => {
      const onChange = jest.fn();
      const props = { value: 2, displayTooltip: false, onChange };
      const driver = createDriver(<Slider {...props} />);
      expect(driver.numOfSliderHandles()).toBe(1);
    });
    it('should be enabled when array with 1 item given to value', () => {
      const onChange = jest.fn();
      const props = { value: [2], displayTooltip: false, onChange };
      const driver = createDriver(<Slider {...props} />);
      expect(driver.numOfSliderHandles()).toBe(1);
    });
  });
});
