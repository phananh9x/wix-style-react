import inputDriverFactory from '../Input/Input.puppeteer.driver';

export const noBorderInputDriverFactory = (component, page) =>
  inputDriverFactory(component, page);
