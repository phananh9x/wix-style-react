import genericModalLayoutDriverFactory from './GenericModalLayout.driver';

export default ({ element }) => {
  return {
    ...genericModalLayoutDriverFactory({ element }),

    getHeaderTextContent: () =>
      element.querySelector('[data-hook="generic-modal-layout-header"]')
        .textContent,

    getContentTextContent: () =>
      element.querySelector('[data-hook="generic-modal-layout-content"]')
        .textContent,

    getFooterTextContent: () =>
      element.querySelector('[data-hook="generic-modal-layout-footer"]')
        .textContent,
  };
};
