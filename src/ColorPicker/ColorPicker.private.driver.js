import ReactTestUtils from 'react-dom/test-utils';

import { colorPickerDriverFactory as publicDriver } from './ColorPicker.driver';

export default ({ element }) => {
  const hexInput =
    element &&
    element.querySelector('[data-hook="color-picker-hex-input"] input');

  return {
    ...publicDriver({ element }),
    selectBlackColor: () => {
      // as with jsdom size of pallette 0 px, then click to 1,1 will make color black
      ReactTestUtils.Simulate.mouseDown(
        element.querySelector('[data-hook="color-picker-hsb"]'),
        {
          clientX: 1,
          clientY: 1,
        },
      );
    },
    typeValueOnHexInput: value =>
      ReactTestUtils.Simulate.change(hexInput, { target: { value } }),
    keyDownOnHexInput: key =>
      ReactTestUtils.Simulate.keyDown(hexInput, { key }),
  };
};
