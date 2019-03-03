import ReactTestUtils from 'react-dom/test-utils';
import styles from './MessageBoxFunctionalLayout.scss';

const messageBoxFunctionalLayoutDriverFactory = ({ element }) => {
  const confirmationButton = () =>
    element.querySelector('[data-hook="confirmation-button"]');
  const cancellationButton = () =>
    element.querySelector('[data-hook="cancellation-button"]');
  const headerCloseButton = () =>
    element.querySelector('[data-hook="header-close-button"]');
  const body = () => element.querySelector('[data-hook="message-box-body"]');

  return {
    exists: () => !!element,
    getConfirmationButtonText: () => confirmationButton().textContent,
    isConfirmationButtonPrefixIconExists: () =>
      confirmationButton().innerHTML.indexOf('prefix') !== -1,
    isConfirmationButtonSuffixIconExists: () =>
      confirmationButton().innerHTML.indexOf('suffix') !== -1,
    clickOnConfirmationButton: () =>
      ReactTestUtils.Simulate.click(confirmationButton()),
    getConfirmationButton: confirmationButton,
    getCancellationButton: cancellationButton,
    getHeaderCloseButton: headerCloseButton,
    getCancellationButtonText: () => cancellationButton().textContent,
    isCancellationButtonPrefixIconExists: () =>
      cancellationButton().innerHTML.indexOf('prefix') !== -1,
    isCancellationButtonSuffixIconExists: () =>
      cancellationButton().innerHTML.indexOf('suffix') !== -1,
    clickOnCancellationButton: () =>
      ReactTestUtils.Simulate.click(cancellationButton()),
    clickOnHeaderCloseButton: () =>
      ReactTestUtils.Simulate.click(headerCloseButton()),
    isThemeExist: theme => !!element.querySelector(`.${theme}`),
    getFooter: () => element.querySelector('[data-hook="message-box-footer"]'),
    getTitle: () =>
      element.querySelector('[data-hook="header-layout-title"]').textContent,
    getChildBySelector: selector => element.querySelector(selector),
    isCancelEnable: () =>
      cancellationButton().className.indexOf('disabled') === -1,
    isConfirmationEnable: () =>
      confirmationButton().className.indexOf('disabled') === -1,
    toHaveBodyPadding: () => !body().classList.contains(`${styles.noPadding}`),
  };
};

export default messageBoxFunctionalLayoutDriverFactory;
