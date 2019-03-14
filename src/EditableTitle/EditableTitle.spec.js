import React from 'react';
import { editableTitleUniDriverFactory } from './EditableTitle.uni.driver';
import { cleanup, createRendererWithUniDriver } from '../../test/utils/unit';
import EditableTitle from './EditableTitle';

const componentWithProps = (props = {}) => <EditableTitle {...props} />;

describe('EditableTitle', () => {
  afterEach(() => cleanup());

  describe('[async]', () => {
    runTests(createRendererWithUniDriver(editableTitleUniDriverFactory));
  });

  function runTests(render) {
    it('should have a title', async () => {
      const initialValue = 'Some Title';
      const { driver } = render(componentWithProps({ initialValue }));

      expect(await driver.getHeadingText()).toEqual(initialValue);
    });

    it('should have a default', async () => {
      const defaultValue = 'Some Title';
      const { driver } = render(componentWithProps({ defaultValue }));

      expect(await driver.getHeadingText()).toEqual(defaultValue);
    });

    it('should set default as initialValue when focusing', async () => {
      const defaultValue = 'Some Title';
      const { driver } = render(
        componentWithProps({ defaultValue, initialValue: '' }),
      );

      await driver.clickHeading();

      expect(await driver.getInput().getValue()).toEqual(defaultValue);
    });
  }
});
