import React from 'react';
import color from 'color';
import { createDriverFactory } from 'wix-ui-test-utils/driver-factory';
import colorPickerDriverFactory from './ColorPicker.private.driver';

import ColorPicker from './ColorPicker';

describe('ColorPicker', () => {
  const createDriver = createDriverFactory(colorPickerDriverFactory);
  let driver;

  function createComponent(props) {
    driver = createDriver(<ColorPicker {...props} />);
  }

  it('should successfully render a component', () => {
    const onChange = jest.fn();
    const onCancel = jest.fn();
    const onConfirm = jest.fn();
    createComponent({ value: '#000000', onChange, onCancel, onConfirm });
    expect(driver.exists()).toBeTruthy();
    expect(driver.historyPanelExists()).toBeFalsy();
  });

  it('should update the color after clicking Enter', () => {
    const onChange = jest.fn();
    const onCancel = jest.fn();
    const onConfirm = jest.fn();
    const sampleColor = '#000000';
    const expectedColor = { color: [0, 0, 0], model: 'rgb', valpha: 1 };

    createComponent({
      value: '',
      onChange,
      onCancel,
      onConfirm,
    });
    driver.typeValueOnHexInput(sampleColor);
    driver.keyDownOnHexInput('Enter');

    expect(onConfirm).toHaveBeenCalledWith(expectedColor);
  });

  describe('History', () => {
    it('should show history panel with current color selected as previous', () => {
      const onChange = jest.fn();
      const onCancel = jest.fn();
      const onConfirm = jest.fn();
      const value = '#000000';
      createComponent({
        value,
        onChange,
        onCancel,
        onConfirm,
        showHistory: true,
      });
      expect(driver.historyPanelExists()).toBeTruthy();
      expect(color(driver.historyCurrentColor()).hex()).toBe(value);
      expect(color(driver.historyPreviousColor()).hex()).toBe(value);
    });

    it('should not update previous color after current color change but not confirm', () => {
      const onChange = jest.fn();
      const onCancel = jest.fn();
      const onConfirm = jest.fn();
      const value = '#00FF00';
      createComponent({
        value,
        onChange,
        onCancel,
        onConfirm,
        showHistory: true,
      });
      driver.selectBlackColor();
      expect(color(driver.historyCurrentColor()).hex()).toBe('#000000');
      expect(color(driver.historyPreviousColor()).hex()).toBe(value);
    });

    it('should set previous color to be active color', () => {
      const onChange = jest.fn();
      const onCancel = jest.fn();
      const onConfirm = jest.fn();
      const value = '#00FF00';
      createComponent({
        value,
        onChange,
        onCancel,
        onConfirm,
        showHistory: true,
      });
      driver.selectBlackColor();
      expect(color(driver.historyCurrentColor()).hex()).toBe('#000000');
      expect(color(driver.historyPreviousColor()).hex()).toBe(value);
      driver.clickOnPreviousColor();
      expect(color(driver.historyCurrentColor()).hex()).toBe(value);
    });

    it('should update previous color after confirm click', () => {
      const onChange = jest.fn();
      const onCancel = jest.fn();
      const onConfirm = jest.fn();
      const value = '#00FF00';
      createComponent({
        value,
        onChange,
        onCancel,
        onConfirm,
        showHistory: true,
      });
      driver.selectBlackColor();
      expect(color(driver.historyCurrentColor()).hex()).toBe('#000000');
      expect(color(driver.historyPreviousColor()).hex()).toBe(value);
      driver.confirm();
      expect(color(driver.historyCurrentColor()).hex()).toBe('#000000');
      expect(color(driver.historyPreviousColor()).hex()).toBe('#000000');
    });

    it('`onCancel` should be called when cancel icon is clicked', () => {
      const onChange = jest.fn();
      const onCancel = jest.fn();
      const onConfirm = jest.fn();
      const value = '#00FF00';
      createComponent({
        value,
        onChange,
        onCancel,
        onConfirm,
        showHistory: true,
      });
      driver.selectBlackColor();
      expect(color(driver.historyCurrentColor()).hex()).toBe('#000000');
      expect(color(driver.historyPreviousColor()).hex()).toBe(value);
      driver.cancel();
      expect(onChange).toHaveBeenCalledTimes(1);
    });
  });
});
