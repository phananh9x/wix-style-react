import ReactTestUtils from 'react-dom/test-utils';
import eventually from 'wix-eventually';
import last from 'lodash/last';

const arrowDirectionToPlacement = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
};

const tooltipDriverFactory = ({ element }) => {
  const getContentRoot = () => {
    const contentRootHook = element.getAttribute('data-content-hook');
    if (!contentRootHook) {
      throw new Error(
        `Tooltip.driver: contentRootHook attribute must exist on the Toolrip's root element`,
      );
    }
    return document.body.querySelector(`[data-hook="${contentRootHook}"]`);
  };

  const getTooltipContent = () => getContentRoot().querySelector('.tooltip');
  const mouseEnter = () => ReactTestUtils.Simulate.mouseEnter(element);
  const mouseLeave = () => ReactTestUtils.Simulate.mouseLeave(element);
  const isShown = () => !!getContentRoot();
  const getContent = () => {
    let content = getTooltipContent();
    while (content.children.length > 0) {
      content = content.children[0];
    }
    return content.innerHTML;
  };
  const contentHasElement = selector => {
    const content = getContentRoot();
    return content && !!content.querySelector(selector);
  };

  return {
    exists: () => !!element,
    isShown,
    focus: () => ReactTestUtils.Simulate.focus(element),
    blur: () => ReactTestUtils.Simulate.blur(element),
    click: () => ReactTestUtils.Simulate.click(element),
    mouseEnter,
    mouseLeave,
    hasErrorTheme: () => contentHasElement('.error'),
    hasDarkTheme: () => contentHasElement('.dark'),
    hasLightTheme: () => contentHasElement('.light'),
    hasAnimationClass: () => contentHasElement('.fadeIn'),
    hasArrow: () => contentHasElement('[data-hook="tooltip-arrow"]'),
    getTooltipWrapper: getTooltipContent,
    getChildren: () => element.innerHTML,
    getPlacement: () => {
      const content = getContentRoot();
      const arrowDirection = last(
        content.querySelectorAll('[data-hook="tooltip-arrow"]'),
      ).className.split(' ')[2];
      return arrowDirectionToPlacement[arrowDirection];
    },
    getContent,
    hoverAndGetContent: ({ timeout = 1000, interval = 50 } = {}) => {
      mouseEnter();
      return eventually(
        () => {
          if (!isShown()) {
            throw new Error('Tooltip not visible');
          }
          const content = getContent();
          mouseLeave();
          return content;
        },
        {
          timeout,
          interval,
        },
      );
    },
    getMaxWidth: () => {
      const content = getTooltipContent();
      const values = content.style._values;
      return values['max-width'];
    },
    getMinWidth: () => {
      const content = getTooltipContent();
      const values = content.style._values;
      return values['min-width'];
    },
    getAlignment: () => {
      const content = getTooltipContent();
      const values = content.style._values;
      return values['text-align'];
    },
    getPadding: () => {
      const content = getTooltipContent();
      const values = content.style._values;
      return values.padding;
    },
  };
};

export default assertExistsWrapper(
  tooltipDriverFactory,
  `The Tooltip testkit could not be initialized, please make sure that a dataHook is directly applied to the Tooltip component and passed to the tooltipTestkitFactory.`,
);

function assertExistsWrapper(driver, msg) {
  return (...args) =>
    /* eslint-disable no-restricted-globals */
    new Proxy(driver(...args), {
      /* eslint-enable no-restricted-globals */
      get: (_driver, prop) => {
        if (_driver.exists && prop !== 'exists') {
          if (!_driver.exists()) {
            throw new Error(msg);
          }
        }
        return _driver[prop];
      },
    });
}
