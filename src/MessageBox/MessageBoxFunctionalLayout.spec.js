import React from 'react';
import MessageBoxFunctionalLayout from './MessageBoxFunctionalLayout';
import MessageBoxFunctionalLayoutFactory from './MessageBoxFunctionalLayout.driver';
import { createDriverFactory } from 'wix-ui-test-utils/driver-factory';
import sinon from 'sinon';
import {
  isTestkitExists,
  isEnzymeTestkitExists,
} from '../../test/utils/testkit-sanity';
import { messageBoxFunctionalLayoutTestkitFactory } from '../../testkit';
import { messageBoxFunctionalLayoutTestkitFactory as enzymeMessageBoxTestkitFactory } from '../../testkit/enzyme';
import { mount } from 'enzyme';
import ChevronDown from 'wix-style-react/new-icons/ChevronDown';

describe('MessageBox', () => {
  const createDriver = createDriverFactory(MessageBoxFunctionalLayoutFactory);
  describe('action buttons', () => {
    it('should display the confirmation text on top the confirmation button', () => {
      const props = {
        confirmText: 'confirmText',
      };
      const driver = createDriver(<MessageBoxFunctionalLayout {...props} />);
      expect(driver.getConfirmationButtonText()).toBe(props.confirmText);
    });

    it('should display the prefix icon on top the confirmation button', () => {
      const props = {
        confirmText: 'confirmText',
        confirmPrefixIcon: <ChevronDown />,
      };
      const driver = createDriver(<MessageBoxFunctionalLayout {...props} />);
      expect(driver.getConfirmationButtonText()).toBe(props.confirmText);
      expect(driver.isConfirmationButtonPrefixIconExists()).toBeTruthy();
    });

    it('should display the suffix icon on top the confirmation button', () => {
      const props = {
        confirmText: 'confirmText',
        confirmSuffixIcon: <ChevronDown />,
      };
      const driver = createDriver(<MessageBoxFunctionalLayout {...props} />);
      expect(driver.getConfirmationButtonText()).toBe(props.confirmText);
      expect(driver.isConfirmationButtonSuffixIconExists()).toBeTruthy();
    });

    it('should display the cancellation text on top the cancellation button', () => {
      const props = {
        cancelText: 'cancelText',
      };
      const driver = createDriver(<MessageBoxFunctionalLayout {...props} />);
      expect(driver.getCancellationButtonText()).toBe(props.cancelText);
    });

    it('should display the prefix icon on top the cancellation button', () => {
      const props = {
        cancelText: 'cancelText',
        cancelPrefixIcon: <ChevronDown />,
      };
      const driver = createDriver(<MessageBoxFunctionalLayout {...props} />);
      expect(driver.getCancellationButtonText()).toBe(props.cancelText);
      expect(driver.isCancellationButtonPrefixIconExists()).toBeTruthy();
    });

    it('should display the suffix icon on top the cancellation button', () => {
      const props = {
        cancelText: 'cancelText',
        cancelSuffixIcon: <ChevronDown />,
      };
      const driver = createDriver(<MessageBoxFunctionalLayout {...props} />);
      expect(driver.getCancellationButtonText()).toBe(props.cancelText);
      expect(driver.isCancellationButtonSuffixIconExists()).toBeTruthy();
    });

    it('should disable cancel button if disabled', () => {
      const props = {
        cancelText: 'cancelText',
        disableCancel: true,
      };
      const driver = createDriver(<MessageBoxFunctionalLayout {...props} />);
      expect(driver.isCancelEnable()).toBeFalsy();
    });

    it('should disable confirmation button if disabled', () => {
      const props = {
        confirmText: 'ok',
        disableConfirmation: true,
      };
      const driver = createDriver(<MessageBoxFunctionalLayout {...props} />);
      expect(driver.isConfirmationEnable()).toBeFalsy();
    });

    it('should not display the cancellation button if cancellationText is empty', () => {
      const props = {};
      const driver = createDriver(<MessageBoxFunctionalLayout {...props} />);
      expect(driver.getCancellationButton()).toBeNull();
    });

    it(`should trigger the 'onOk' action upon clicking the confirmation button`, () => {
      const props = {
        onOk: sinon.spy(),
        confirmText: 'confirm',
      };
      const driver = createDriver(<MessageBoxFunctionalLayout {...props} />);
      driver.clickOnConfirmationButton();
      expect(props.onOk.calledOnce).toBeTruthy();
    });

    it(`should trigger the 'onCancel' action upon clicking the cancellation button`, () => {
      const props = {
        cancelText: 'cancelText',
        onCancel: sinon.spy(),
      };
      const driver = createDriver(<MessageBoxFunctionalLayout {...props} />);
      driver.clickOnCancellationButton();
      expect(props.onCancel.calledOnce).toBeTruthy();
    });

    it('should render side actions', () => {
      const dataHook = 'side-actions';
      const props = {
        sideActions: <div data-hook={dataHook} />,
      };

      const driver = createDriver(<MessageBoxFunctionalLayout {...props} />);

      expect(
        driver.getChildBySelector(`[data-hook="${dataHook}"]`),
      ).not.toBeNull();
    });
  });

  describe('closeButton attribute', () => {
    it('should appear by default', () => {
      const props = {
        onCancel: sinon.spy(),
      };
      const driver = createDriver(<MessageBoxFunctionalLayout {...props} />);
      expect(driver.getHeaderCloseButton()).toBeTruthy();
    });

    it('should not appear', () => {
      const props = {
        onCancel: sinon.spy(),
        closeButton: false,
      };
      const driver = createDriver(<MessageBoxFunctionalLayout {...props} />);
      expect(driver.getHeaderCloseButton()).toBeFalsy();
    });

    it(`should trigger the 'onCancel' action upon clicking the header close button`, () => {
      const props = {
        onCancel: sinon.spy(),
      };
      const driver = createDriver(<MessageBoxFunctionalLayout {...props} />);
      driver.clickOnHeaderCloseButton();
      expect(props.onCancel.calledOnce).toBeTruthy();
    });

    it(`should trigger the 'onClose' action upon clicking the close button if 'onClose' prop exists`, () => {
      const onCancelFunction = sinon.spy();
      const onCloseFunction = sinon.spy();

      const props = {
        onCancel: onCancelFunction,
        onClose: onCloseFunction,
      };

      const driver = createDriver(<MessageBoxFunctionalLayout {...props} />);
      driver.clickOnHeaderCloseButton();
      expect(props.onCancel.calledOnce).toBeFalsy();
      expect(props.onClose.calledOnce).toBeTruthy();
    });
  });

  describe('theme attribute', () => {
    it('should set the theme by default to "blue"', () => {
      const props = {};
      const driver = createDriver(<MessageBoxFunctionalLayout {...props} />);
      expect(driver.isThemeExist('blue')).toBeTruthy();
    });

    it('should allowing setting the theme', () => {
      const props = {
        theme: 'green',
      };
      const driver = createDriver(<MessageBoxFunctionalLayout {...props} />);
      expect(driver.isThemeExist('green')).toBeTruthy();
      expect(driver.isThemeExist('blue')).toBeFalsy();
    });
  });

  describe('footer children', () => {
    it(`should render the passed footer content`, () => {
      const props = {
        footerBottomChildren: <div data-hook="inner-div" />,
      };
      const driver = createDriver(<MessageBoxFunctionalLayout {...props} />);
      expect(
        driver.getChildBySelector('[data-hook="inner-div"]'),
      ).not.toBeNull();
      expect(
        driver.getChildBySelector(
          '[data-hook="footer-layout-bottom-children"]',
        ),
      ).not.toBeNull();
    });

    it(`should not render footer's wrapper div when footer content isn't passed`, () => {
      const props = {};
      const driver = createDriver(<MessageBoxFunctionalLayout {...props} />);
      expect(
        driver.getChildBySelector(
          '[data-hook="footer-layout-bottom-children"]',
        ),
      ).toBeNull();
    });
  });

  describe('general', () => {
    it(`should hide the footer`, () => {
      const props = {
        hideFooter: true,
      };
      const driver = createDriver(<MessageBoxFunctionalLayout {...props} />);
      expect(driver.getFooter()).toBeNull();
    });

    it(`should show footer by default`, () => {
      const props = {};
      const driver = createDriver(<MessageBoxFunctionalLayout {...props} />);
      expect(driver.getFooter()).not.toBeNull();
    });

    it(`should render title`, () => {
      const props = {
        title: 'title',
      };
      const driver = createDriver(<MessageBoxFunctionalLayout {...props} />);
      expect(driver.getTitle()).toBe(props.title);
    });

    it(`should render the passed children in the markup`, () => {
      const props = {};
      const driver = createDriver(
        <MessageBoxFunctionalLayout {...props}>
          <div data-hook="inner-div" />
        </MessageBoxFunctionalLayout>,
      );
      expect(
        driver.getChildBySelector('[data-hook="inner-div"]'),
      ).not.toBeNull();
    });

    it('should render with zero padding when explicitly asked for', () => {
      const normalRendering = {};
      const zeroPaddingRendering = { noBodyPadding: true };
      const regularDriver = createDriver(
        <MessageBoxFunctionalLayout {...normalRendering}>
          <div>Content</div>
        </MessageBoxFunctionalLayout>,
      );
      expect(regularDriver.toHaveBodyPadding()).toBeTruthy();

      const zeroPaddingDriver = createDriver(
        <MessageBoxFunctionalLayout {...zeroPaddingRendering}>
          <div>Content</div>
        </MessageBoxFunctionalLayout>,
      );
      expect(zeroPaddingDriver.toHaveBodyPadding()).toBeFalsy();
    });

    it('should render the passed image', () => {
      const props = {
        image: <div data-hook="inner-div" />,
      };
      const driver = createDriver(<MessageBoxFunctionalLayout {...props} />);
      expect(
        driver.getChildBySelector('[data-hook="inner-div"]'),
      ).not.toBeNull();
    });
  });

  describe('testkit', () => {
    it('should exist', () => {
      expect(
        isTestkitExists(
          <MessageBoxFunctionalLayout />,
          messageBoxFunctionalLayoutTestkitFactory,
        ),
      ).toBe(true);
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      expect(
        isEnzymeTestkitExists(
          <MessageBoxFunctionalLayout />,
          enzymeMessageBoxTestkitFactory,
          mount,
        ),
      ).toBe(true);
    });
  });
});
