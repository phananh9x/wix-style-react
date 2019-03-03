import { baseUniDriverFactory } from 'wix-ui-test-utils/base-driver';
import {
  colorPickerTestkitFactory,
  popoverTestkitFactory,
} from '../../testkit';
import inputDriverFactory from '../Input/Input.driver';

export const colorInputDriverFactory = base => {
  const colorViewerHook = '[data-hook="colorinput-viewer"]';
  const inputTestkit = element =>
    inputDriverFactory({
      element,
    });

  const colorPickerTestkit = element =>
    colorPickerTestkitFactory({
      wrapper: element,
      dataHook: 'colorinput-colorpicker',
    });

  const popoverTestkit = element =>
    popoverTestkitFactory({
      wrapper: element,
      dataHook: 'colorinput-popover',
    });

  return {
    ...baseUniDriverFactory(base),
    /** Returns Input's component teskit methods */
    inputDriver: async () => inputTestkit(await base.getNative()),
    /** Returns ColorPicker's component testkit methods */
    colorPickerDriver: async () => colorPickerTestkit(await base.getNative()),
    /** Returns Popovers's component testkit methods */
    popoverDriver: async () => popoverTestkit(await base.getNative()),
    /** Clicks on color viewer box */
    clickColorViewer: async () => base.$(colorViewerHook).click(),
  };
};
