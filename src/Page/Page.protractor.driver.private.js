import pageDriverFactory from './Page.protractor.driver';

export const pagePrivateDriverFactory = component => {
  const verticalScrollContainer = component.$(
    '[data-hook="page-scrollable-content"]',
  );

  const scrollVertically = async offset => {
    await browser.executeScript(
      `arguments[0].scrollTop = arguments[0].scrollTop + ${offset};`,
      await verticalScrollContainer.getWebElement(),
    );
  };

  return {
    scrollVertically,
    getVeriticalScroll: async () =>
      browser.executeScript(
        `return arguments[0].scrollTop;`,
        await verticalScrollContainer.getWebElement(),
      ),

    ...pageDriverFactory(component),
  };
};
