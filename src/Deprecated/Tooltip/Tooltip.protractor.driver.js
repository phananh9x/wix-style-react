const tooltipDriverFactory = component => ({
  clickButton: () => component.click(),
  getTooltipContentElement: datahook =>
    component.$(`[data-hook="${datahook}"]`),
  getTooltipTextContent: datahook =>
    component.$(`[data-hook="${datahook}"]`).getText(),
  element: () => component,
});

export default tooltipDriverFactory;
