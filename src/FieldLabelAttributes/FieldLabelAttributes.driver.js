import tooltipDriverFactory from '../Deprecated/Tooltip/Tooltip.driver';

const fieldLabelAttributesDriverFactory = ({ element }) => {
  return {
    exists: () => !!element,
    getTooltipTestKit: () =>
      tooltipDriverFactory({
        element: element.querySelector('[data-hook="info"]'),
      }),
    hasRequired: () =>
      !!element.querySelectorAll('[data-hook="required"]').length,
    hasInfo: () => !!element.querySelectorAll('[data-hook="info"]').length,
  };
};

export default fieldLabelAttributesDriverFactory;
