import { findByHook, resolveIn, isClassExists } from '../../test/utils';
import tooltipDriverFactory from '../Deprecated/Tooltip/Tooltip.driver';

const getTextElement = element =>
  element.querySelector(`[data-hook="loader-text"]`);

const loaderDriverFactory = ({ element }) => {
  return {
    component: () => element,
    exists: () => !!element,

    /** returns the loader color ('blue' or 'white') */
    getColor: () => (isClassExists(element, 'blue') ? 'blue' : 'white'),

    /** returns the element text */
    getText: () => getTextElement(element).textContent,

    /** true if the element has text */
    hasText: () => !!getTextElement(element),

    /** true when using the large loader */
    isLarge: () => isClassExists(element, 'large'),

    /** true when using the medium loader */
    isMedium: () => isClassExists(element, 'medium'),

    /** true when using the small loader */
    isSmall: () => isClassExists(element, 'small'),

    /** true when using the tiny loader */
    isTiny: () => isClassExists(element, 'tiny'),

    /** true when loader is in loading status */
    isLoading: () => isClassExists(element, 'loading'),

    /** true when loader is in error status */
    isError: () => isClassExists(element, 'error'),

    /** true when loader is in success status */
    isSuccess: () => isClassExists(element, 'success'),

    /** trigger the tooltip and returns the value of the tooltip message (async function) */
    getStatusMessage: () => {
      const tooltipDriver = tooltipDriverFactory({
        element: findByHook(element, 'loader-tooltip'),
      });

      tooltipDriver.mouseEnter();
      return resolveIn(500).then(() => tooltipDriver.getContent());
    },
  };
};

export default loaderDriverFactory;
