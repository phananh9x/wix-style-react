import React from 'react';
import FilePicker from './FilePicker';
import filePickerDriverFactory from './FilePicker.driver';
import { createDriverFactory } from 'wix-ui-test-utils/driver-factory';
import { filePickerTestkitFactory } from '../../testkit';
import { filePickerTestkitFactory as enzymeFilePickerTestkitFactory } from '../../testkit/enzyme';
import {
  isTestkitExists,
  isEnzymeTestkitExists,
} from '../../test/utils/testkit-sanity';
import { mount } from 'enzyme';

describe('FilePicker', () => {
  const createDriver = createDriverFactory(filePickerDriverFactory);

  describe('error property', () => {
    it('should not have error by defaullt', () => {
      const driver = createDriver(<FilePicker />);
      expect(driver.hasError()).toEqual(false);
    });

    it('should have error', () => {
      const driver = createDriver(<FilePicker error errorMessage="error!!!" />);
      expect(driver.hasError()).toEqual(true);
      expect(driver.errorMessage()).toEqual('error!!!');
    });
  });

  describe('name property', () => {
    it('should not have name property by defaullt', () => {
      const driver = createDriver(<FilePicker />);
      expect(driver.getName()).toEqual('');
    });

    it('should have name', () => {
      const driver = createDriver(<FilePicker name="filePickerName" />);
      expect(driver.getName()).toEqual('filePickerName');
    });
  });

  describe('testkit', () => {
    it('should exist', () => {
      expect(isTestkitExists(<FilePicker />, filePickerTestkitFactory)).toBe(
        true,
      );
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      expect(
        isEnzymeTestkitExists(
          <FilePicker />,
          enzymeFilePickerTestkitFactory,
          mount,
        ),
      ).toBe(true);
    });
  });
});
