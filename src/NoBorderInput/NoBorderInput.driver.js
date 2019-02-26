import inputDriverFactory from '../Input/Input.driver';

const noBorderInputDriverFactory = ({ element, wrapper }) => {
  const inputDriver = inputDriverFactory({
    element,
    wrapper,
  });

  return {
    getLabel: () =>
      element && element.querySelector(`[data-hook="label"]`).textContent,
    getStatusMessage: () =>
      element &&
      element.querySelector(`[data-hook="status-message"]`).textContent,
    ...inputDriver,
  };
};

export default noBorderInputDriverFactory;
