const tooltipDriverFactory = async (component, page) => {
  return {
    element: () => component,
    getTooltipTextContent: async (delay = 200) => {
      await new Promise(resolve => {
        setTimeout(resolve, delay);
      });
      const content = await page.$('[data-hook="tooltip-content"]');
      return page.evaluate(_content => _content.innerText, content);
    },
  };
};

export default tooltipDriverFactory;
