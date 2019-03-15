import textDriverFactory from '../Text/Text.driver';
import tooltipDriverFactory from '../Deprecated/Tooltip/Tooltip.driver';

const addItemDriverFactory = ({ element, eventTrigger }) => {
  const byHook = hook => element.querySelector(`[data-hook*="${hook}"]`);
  const tooltipDriver = () =>
    tooltipDriverFactory({ element: byHook('additem-tooltip') });
  const textDriver = () =>
    textDriverFactory({ element: byHook('additem-text') });

  return {
    /** returns true if element in the DOM */
    exists: () => !!element,

    /** returns the driver element */
    element: () => element,

    /** returns value of action text */
    getText: () => textDriver().getText(),

    /** true if passed children in string exists */
    textExists: () => textDriver().exists(),

    /** returns driver of tooltip */
    getTooltipDriver: () => tooltipDriver(),

    /** returns value of tooltip content */
    getTooltipContent: () => tooltipDriver().hoverAndGetContent(),

    /** clicks on element */
    click: () => eventTrigger.click(element),
  };
};

export default addItemDriverFactory;
