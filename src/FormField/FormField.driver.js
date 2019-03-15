import tooltipDriverFactory from '../Deprecated/Tooltip/Tooltip.driver';

const formFieldDriver = ({ element }) => {
  const byHook = hook => element.querySelector(`[data-hook*="${hook}"]`);
  const charactersCounter = () => byHook('formfield-counter');

  return {
    exists: () => !!element,
    element: () => element,
    getChildren: () => byHook('formfield-children'),
    getLabel: () => byHook('formfield-label'),
    isRequired: () => !!byHook('formfield-asterisk'),
    getLengthLeft: () => {
      const counter = charactersCounter();
      return counter ? parseInt(counter.innerHTML, 10) : null;
    },
    isLengthExceeded: () => {
      const counter = charactersCounter();
      if (counter) {
        const length = parseInt(counter.innerHTML, 10);
        return length < 0;
      }
      return false;
    },
    getInfoContent: () =>
      tooltipDriverFactory({
        element: byHook('formfield-infotooltip'),
      }).hoverAndGetContent(),
  };
};

export default formFieldDriver;
