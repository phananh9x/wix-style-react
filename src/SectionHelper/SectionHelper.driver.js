import { testkitFactoryCreator } from 'wix-ui-test-utils/vanilla';
import buttonDriverFactory from '../Deprecated/Button/Button.driver';

import styles from './styles.scss';

const buttonTestkitFactory = testkitFactoryCreator(buttonDriverFactory);

const sectionHelperDriverFactory = ({ element }) => {
  const classExists = className => element.classList.contains(className);
  const actionButtonDriver = () =>
    buttonTestkitFactory({
      wrapper: element,
      dataHook: 'sectionhelper-action-btn',
    });

  const closeButtonDriver = () =>
    buttonTestkitFactory({
      wrapper: element,
      dataHook: 'sectionhelper-close-btn',
    });

  return {
    exists: () => !!element,
    titleText: () =>
      element.querySelector('[data-hook="sectionhelper-title"]').textContent,
    actionText: () => actionButtonDriver().getButtonTextContent(),
    clickAction: () => actionButtonDriver().click(),
    clickClose: () => closeButtonDriver().click(),
    isCloseButtonDisplayed: () => closeButtonDriver().exists(),
    textContent: () => element.textContent,
    isWarning: () => classExists(styles.warning),
    isStandard: () => classExists(styles.standard),
    isDanger: () => classExists(styles.danger),
    isExperimentalDark: () => classExists(styles.experimentalDark),
    isSuccess: () => classExists(styles.success),
    isPremium: () => classExists(styles.premium),
    isPreview: () => classExists(styles.preview),
  };
};

export default sectionHelperDriverFactory;
