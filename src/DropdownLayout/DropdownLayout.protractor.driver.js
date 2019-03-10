import { isFocused } from 'wix-ui-test-utils/protractor';

const driverFactory = component => {
  const getDropdown = () =>
    component.$(`[data-hook="dropdown-layout-options"]`);
  const getLoader = () => component.$('[data-hook="dropdownLayout-loader"]');
  const getDropdownItemElement = index =>
    component.$$(`[data-hook*="dropdown-item"]`).get(index);
  const scrollIntoView = el => {
    return browser.executeScript(element => {
      element.scrollIntoView();
    }, el.getWebElement());
  };

  return {
    isFocused: () => isFocused(component),
    getDropdown,
    getDropdownItemElement,
    element: () => component,
    scrollToElement: el => scrollIntoView(getDropdownItemElement(el)),
    getDropdownItem: index => getDropdownItemElement(index).getText(),
    loaderExists: () => getLoader(),
    getDropdownItemsCount: () =>
      component
        .$$(`[data-hook*="dropdown-item"]`)
        .getText()
        .count(),
    selectItemById: itemId =>
      component.$(`[data-hook^="dropdown-item-${itemId}"]`).click(),
    hoverItemById: itemId => {
      const item = component.$(`[data-hook^="dropdown-item-${itemId}"]`);
      return browser.actions().mouseMove(item).perform();
    },
  };
};

export default driverFactory;
