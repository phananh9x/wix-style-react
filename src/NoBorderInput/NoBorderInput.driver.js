import inputDriverFactory from '../Input/Input.driver';

const noBorderInputDriverFactory = ({ element, wrapper }) => {
  const inputDriver = inputDriverFactory({
    element,
    wrapper,
  });

  return {
    ...inputDriver,
  };
};

export default noBorderInputDriverFactory;
