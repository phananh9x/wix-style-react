import React from 'react';
import { createUniDriverFactory } from 'wix-ui-test-utils/uni-driver-factory';

import ColorInput from './ColorInput';
import { colorInputPrivateDriverFactory } from './ColorInput.driver.private';
import { requestAnimationFramePolyfill } from '../../testkit/polyfills';
import { extractHex } from './hex-helpers';

describe('ColorInput', () => {
  beforeAll(() => {
    requestAnimationFramePolyfill.install();
  });

  const renderColorInput = ({
    value = '',
    onConfirm = () => {},
    ...rest
  } = {}) => <ColorInput {...rest} value={value} onConfirm={onConfirm} />;

  const createDriver = createUniDriverFactory(colorInputPrivateDriverFactory);

  describe('Input', () => {
    it('should be in controlled mode when value is passed', async () => {
      const value = 'value';
      const { inputDriver } = createDriver(renderColorInput({ value }));
      expect((await inputDriver()).getValue()).toBe('AE');
    });

    describe(`value`, () => {
      it(`should convert letters to uppercase while typed`, async () => {
        const { inputDriver } = createDriver(renderColorInput());
        (await inputDriver()).enterText('abc');
        expect((await inputDriver()).getValue()).toBe('ABC');
      });
      it(`should strip invalid characters from pasted value`, async () => {
        const { inputDriver } = createDriver(renderColorInput());
        (await inputDriver()).enterText('#$%abc');
        expect((await inputDriver()).getValue()).toBe('ABC');
      });
    });

    describe('value is confirmed on', () => {
      it(`keyboard key 'Enter'`, async () => {
        const { inputDriver } = createDriver(renderColorInput());
        (await inputDriver()).enterText('aze');
        (await inputDriver()).keyDown('Enter');
        expect((await inputDriver()).getValue()).toBe('AEAEAE');
      });

      it('click outside', async () => {
        const driver = createDriver(renderColorInput());
        (await driver.inputDriver()).click();
        (await driver.inputDriver()).enterText('aze');
        (await driver.popoverDriver()).clickOutside();
        expect((await driver.colorPickerDriver()).exists()).toBe(false);
      });
    });

    describe('value is cancelled on', () => {
      it(`keyboard key 'Escape'`, async () => {
        const value = '#123456';
        const driver = createDriver(renderColorInput({ value }));
        (await driver.inputDriver()).click();
        (await driver.inputDriver()).enterText('1234');
        expect((await driver.inputDriver()).getValue()).toBe('1234');
        (await driver.inputDriver()).keyDown('Escape');
        expect((await driver.inputDriver()).getValue()).toBe(
          value.replace('#', ''),
        );
      });
    });

    describe('confirmed values', () => {
      [
        ['', ''],
        ['1', '#111111'],
        ['12', '#121212'],
        ['123', '#112233'],
        ['1234', '#112233'],
        ['12345', '#112233'],
        ['123456', '#123456'],
        ['1234$3A74', '#12343A'],
        ['1234AB', '#1234AB'],
        ['%4EB7F', '#44EEBB'],
        ['%##7$39', '#773399'],
        ['2C45$#74', '#2C4574'],
        ['4EB7F568A7', '#4EB7F5'],
      ].map(([expectation, output]) =>
        it(`given ${expectation} should return ${output}`, async () => {
          const onConfirm = jest.fn();
          const { inputDriver } = createDriver(renderColorInput({ onConfirm }));
          (await inputDriver()).enterText(expectation);
          expect((await inputDriver()).getValue()).toBe(
            extractHex(expectation).replace('#', ''),
          );
          (await inputDriver()).keyDown('Enter');
          expect(onConfirm).toHaveBeenCalledTimes(1);
          expect(onConfirm.mock.calls[0][0]).toBe(output);
        }),
      );
    });
  });

  describe(`prefix '#'`, () => {
    it(`should be hidden by default`, async () => {
      const { inputDriver } = createDriver(renderColorInput());
      expect((await inputDriver()).hasPrefix()).toBe(false);
    });

    it(`should be visible when input is clicked`, async () => {
      const { inputDriver } = createDriver(renderColorInput());
      (await inputDriver()).click();
      expect((await inputDriver()).hasPrefix()).toBe(true);
    });

    it(`should be visible when input is focused`, async () => {
      const { inputDriver } = createDriver(renderColorInput());
      (await inputDriver()).focus();
      expect((await inputDriver()).hasPrefix()).toBe(true);
    });

    it(`should be visible when value is given but input is confirmed with Enter`, async () => {
      const { inputDriver } = createDriver(renderColorInput({ value: '#123' }));
      (await inputDriver()).click();
      (await inputDriver()).keyDown('Enter');
      expect((await inputDriver()).hasPrefix()).toBe(true);
    });

    it(`should be hidden when value is empty and input is confirmed with Enter`, async () => {
      const { inputDriver } = createDriver(renderColorInput());
      (await inputDriver()).click();
      (await inputDriver()).keyDown('Enter');
      expect((await inputDriver()).hasPrefix()).toBe(false);
    });
  });

  describe('suffix ColorViewer', () => {
    it(`should be null state when value is empty string`, async () => {
      const driver = createDriver(renderColorInput());
      expect(await driver.isViewerNull()).toBe(true);
    });

    it(`should set size as given`, async () => {
      const driver = createDriver(renderColorInput({ size: 'small' }));
      expect(await driver.getViewerSize()).toBe('small');
    });
  });

  describe('ColorPicker', () => {
    describe('should open when', () => {
      it(`input is clicked`, async () => {
        const driver = createDriver(renderColorInput());
        (await driver.inputDriver()).click();
        expect((await driver.colorPickerDriver()).exists()).toBe(true);
      });
      it(`input is focused`, async () => {
        const driver = createDriver(renderColorInput());
        (await driver.inputDriver()).focus();
        expect((await driver.colorPickerDriver()).exists()).toBe(true);
      });
      it(`colorviewer is clicked`, async () => {
        const driver = createDriver(renderColorInput());
        await driver.clickColorViewer();
        expect((await driver.colorPickerDriver()).exists()).toBe(true);
      });
    });

    describe('should close when ', () => {
      it(`input is confirmed with Enter`, async () => {
        const driver = createDriver(renderColorInput());
        (await driver.inputDriver()).click();
        (await driver.inputDriver()).keyDown('Enter');
        expect((await driver.colorPickerDriver()).exists()).toBe(false);
      });
      it(`action button - confirm is clicked`, async () => {
        const onConfirm = jest.fn();
        const driver = createDriver(renderColorInput({ onConfirm }));
        (await driver.inputDriver()).click();
        (await driver.inputDriver()).enterText('#123');
        (await driver.colorPickerDriver()).confirm();
        expect((await driver.colorPickerDriver()).exists()).toBe(false);
      });
    });

    describe('action button', () => {
      it(`'confirm' should fire confirm event for input`, async () => {
        const onConfirm = jest.fn();
        const driver = createDriver(renderColorInput({ onConfirm }));
        (await driver.inputDriver()).click();
        (await driver.inputDriver()).enterText('#123');
        (await driver.colorPickerDriver()).confirm();
        expect(onConfirm).toHaveBeenCalledTimes(1);
        expect(onConfirm.mock.calls[0][0]).toBe('#112233');
      });
      it(`'cancel' should fire cancel event for input`, async () => {
        const value = '#123456';
        const driver = createDriver(renderColorInput({ value }));
        (await driver.inputDriver()).click();
        (await driver.inputDriver()).enterText('1234');
        expect((await driver.inputDriver()).getValue()).toBe('1234');
        (await driver.colorPickerDriver()).cancel();
        expect((await driver.inputDriver()).getValue()).toBe(
          value.replace('#', ''),
        );
      });
    });
  });

  describe('props', () => {
    describe('`disabled` prop', () => {
      it('should disable input', async () => {
        const disabled = true;
        const { inputDriver } = createDriver(renderColorInput({ disabled }));
        expect((await inputDriver()).isDisabled()).toBe(true);
      });

      it('should disable hash', async () => {
        const value = '#ffffff';
        const disabled = true;
        const driver = createDriver(renderColorInput({ disabled, value }));
        expect(await driver.isHashDisabled()).toBe(true);
      });
    });

    describe(`'size' prop`, () => {
      it(`by default should be medium`, async () => {
        const { inputDriver } = createDriver(renderColorInput());
        expect((await inputDriver()).isOfSize('normal')).toBe(true);
      });
    });
    describe(`'placeholder' prop`, () => {
      const defaultPlaceholder = 'Please choose a color';

      it(`by default should be defined`, async () => {
        const { inputDriver } = createDriver(renderColorInput());
        expect((await inputDriver()).getPlaceholder()).toBe(defaultPlaceholder);
      });

      it(`should be equal to given`, async () => {
        const placeholder = 'Please choose';
        const { inputDriver } = createDriver(renderColorInput({ placeholder }));
        expect((await inputDriver()).getPlaceholder()).toBe(placeholder);
      });

      it(`should be hidden when input is clicked`, async () => {
        const { inputDriver } = createDriver(renderColorInput());
        (await inputDriver()).click();
        expect((await inputDriver()).getPlaceholder()).toBe('');
      });
    });
    describe(`'error' prop`, () => {
      it(`should be set when true`, async () => {
        const { inputDriver } = createDriver(renderColorInput({ error: true }));
        (await inputDriver()).click();
        (await inputDriver()).blur();
        expect((await inputDriver()).hasError()).toBe(true);
      });
    });

    describe('`onChange` prop', () => {
      it(`should be triggered when input value has changed`, async () => {
        const onChange = jest.fn();
        const { inputDriver } = createDriver(renderColorInput({ onChange }));
        (await inputDriver()).enterText('#123');
        expect(onChange).toHaveBeenCalledTimes(1);
        expect(onChange.mock.calls[0][0]).toBe('#123');
      });
      it(`should be triggered when one of the confirmed actions triggered`, async () => {
        const onChange = jest.fn();
        const { inputDriver } = createDriver(renderColorInput({ onChange }));
        (await inputDriver()).enterText('#123');
        (await inputDriver()).keyDown('Enter');
        expect(onChange).toHaveBeenCalledTimes(2);
        expect(onChange.mock.calls[0][0]).toBe('#123');
        expect(onChange.mock.calls[1][0]).toBe('#112233');
      });
      it(`should be triggered when one of the cancelled actions triggered`, async () => {
        const value = '#1234';
        const onChange = jest.fn();
        const { inputDriver } = createDriver(
          renderColorInput({ onChange, value }),
        );
        (await inputDriver()).enterText('#123');
        (await inputDriver()).keyDown('Escape');
        expect(onChange).toHaveBeenCalledTimes(2);
        expect(onChange.mock.calls[0][0]).toBe('#123');
        expect(onChange.mock.calls[1][0]).toBe(value);
      });
    });

    describe('`onConfirm` prop', () => {
      it(`should return confirmed value `, async () => {
        const onConfirm = jest.fn();
        const { inputDriver } = createDriver(renderColorInput({ onConfirm }));
        (await inputDriver()).enterText('#123');
        expect((await inputDriver()).getValue()).toBe('123');
        (await inputDriver()).keyDown('Enter');
        expect(onConfirm).toHaveBeenCalledTimes(1);
        expect(onConfirm.mock.calls[0][0]).toBe('#112233');
      });
    });
    describe('`onCancel` prop', () => {
      it(`should return value from props`, async () => {
        const value = '#555555';
        const onCancel = jest.fn();
        const { inputDriver } = createDriver(
          renderColorInput({ onCancel, value }),
        );
        (await inputDriver()).enterText('#123');
        expect((await inputDriver()).getValue()).toBe('123');
        (await inputDriver()).keyDown('Escape');
        expect(onCancel).toHaveBeenCalledTimes(1);
        expect(onCancel.mock.calls[0][0]).toBe(value);
      });
    });
  });
});
