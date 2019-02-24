import inputDriverFactory from '../Input/Input.protractor.driver';

export const noBorderInputDriverFactory = component =>
  inputDriverFactory(component);
