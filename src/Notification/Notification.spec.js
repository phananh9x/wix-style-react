import React from 'react';
import { mount } from 'enzyme';
import { isTestkitExists } from '../../test/utils/testkit-sanity';
import notificationDriverFactory from './Notification.driver';
import { notificationTestkitFactory } from '../../testkit';
import {
  notificationTestkitFactory as enzymeNotificationTestkitFactory,
  buttonTestkitFactory as enzymeButtonTestkitFactory,
} from '../../testkit/enzyme';
import { createRendererWithDriver, cleanup } from '../../test/utils/unit';

import Notification from './Notification';
import Button from '../Button';
import TextButton from '../TextButton';

const renderNotificationWithProps = (props = {}) => (
  <Notification {...props}>
    <Notification.TextLabel>label</Notification.TextLabel>
    <Notification.CloseButton />
  </Notification>
);

describe('Notification', () => {
  const render = createRendererWithDriver(notificationDriverFactory);
  const createDriver = jsx => render(jsx).driver;

  afterEach(() => {
    cleanup();
  });

  describe('Visibility', () => {
    it('should verify component exists', () => {
      const driver = createDriver(renderNotificationWithProps());
      expect(driver.exists()).toBeTruthy();
    });

    it('should be visible', () => {
      const driver = createDriver(renderNotificationWithProps({ show: true }));
      expect(driver.visible()).toBeTruthy();
    });

    it('should not be visible', () => {
      const driver = createDriver(renderNotificationWithProps({ show: false }));
      expect(driver.visible()).toBeFalsy();
    });
  });

  describe('Themes', () => {
    it('should support default theme', () => {
      const driver = createDriver(renderNotificationWithProps({ show: true }));
      expect(driver.isStandardNotification()).toBeTruthy();
      expect(driver.hasTheme('standard')).toBeTruthy();
    });

    it('should support standard theme', () => {
      const driver = createDriver(
        renderNotificationWithProps({ show: true, theme: 'standard' }),
      );
      expect(driver.isStandardNotification()).toBeTruthy();
    });

    it('should support error theme', () => {
      const driver = createDriver(
        renderNotificationWithProps({ show: true, theme: 'error' }),
      );
      expect(driver.isErrorNotification()).toBeTruthy();
    });

    it('should support success theme', () => {
      const driver = createDriver(
        renderNotificationWithProps({ show: true, theme: 'success' }),
      );
      expect(driver.isSuccessNotification()).toBeTruthy();
    });

    it('should support warning theme', () => {
      const driver = createDriver(
        renderNotificationWithProps({ show: true, theme: 'warning' }),
      );
      expect(driver.isWarningNotification()).toBeTruthy();
    });

    it('should support premium theme', () => {
      const driver = createDriver(
        renderNotificationWithProps({ show: true, theme: 'premium' }),
      );
      expect(driver.isPremiumNotification()).toBeTruthy();
    });
  });

  describe('Content', () => {
    describe('Label', () => {
      it('should show have a text to show', () => {
        const labelText = 'Label Text';
        const driver = createDriver(
          <Notification show>
            <Notification.TextLabel>{labelText}</Notification.TextLabel>
            <Notification.CloseButton />
          </Notification>,
        );
        expect(driver.getLabelText()).toEqual(labelText);
      });
    });

    describe('Action Button', () => {
      it('should have an action button', () => {
        const actionButtonText = 'Action Button Text';
        const driver = createDriver(
          <Notification show>
            <Notification.TextLabel>label</Notification.TextLabel>
            <Notification.ActionButton>
              {actionButtonText}
            </Notification.ActionButton>
            <Notification.CloseButton />
          </Notification>,
        );
        expect(driver.getActionButtonText()).toEqual(actionButtonText);
      });

      it('should not have an action button', () => {
        const driver = createDriver(
          renderNotificationWithProps({ show: true }),
        );
        expect(driver.hasActionButton()).toBeFalsy();
      });

      it('should call the supplied onClick handler when clicked', () => {
        const onClickMock = jest.fn();

        const driver = createDriver(
          <Notification show>
            <Notification.TextLabel>label</Notification.TextLabel>
            <Notification.ActionButton onClick={onClickMock}>
              action
            </Notification.ActionButton>
            <Notification.CloseButton />
          </Notification>,
        );

        driver.clickOnActionButton();

        expect(onClickMock).toBeCalled();
      });
    });

    describe('Close Button', () => {
      it('should have a close button (with action button)', () => {
        const driver = createDriver(
          renderNotificationWithProps({ show: true }),
        );
        expect(driver.hasCloseButton()).toBeTruthy();
      });

      it('should have a close button (without action button)', () => {
        const driver = createDriver(
          renderNotificationWithProps({ show: true }),
        );
        expect(driver.hasActionButton()).toBeFalsy();
        expect(driver.hasCloseButton()).toBeTruthy();
      });
    });
  });

  describe('Type', () => {
    it('should set default type to global and position relative', () => {
      const driver = createDriver(renderNotificationWithProps({ show: true }));
      expect(driver.isRelativelyPositioned()).toBeTruthy();
    });

    it('should set the type to global and position relative', () => {
      const driver = createDriver(
        renderNotificationWithProps({ show: true, type: 'global' }),
      );
      expect(driver.isRelativelyPositioned()).toBeTruthy();
    });

    it('should set the type to local and position absolute', () => {
      const driver = createDriver(
        renderNotificationWithProps({ show: true, type: 'local' }),
      );
      expect(driver.isAbsolutePositioned()).toBeTruthy();
    });

    it('should set the type to sticky and position fixed', () => {
      const driver = createDriver(
        renderNotificationWithProps({ show: true, type: 'sticky' }),
      );
      expect(driver.isFixedPositioned()).toBeTruthy();
    });
  });

  describe(`Closing`, () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    describe('Closing when clicking on close button', () => {
      it('should close the notification', () => {
        const { driver } = render(renderNotificationWithProps({ show: true }));
        driver.clickOnCloseButton();
        jest.runAllTimers(); // for animations
        expect(driver.visible()).toBeFalsy();
      });

      it('should allow reopening the notification after closed by close button', () => {
        const { driver, rerender } = render(
          renderNotificationWithProps({ show: true }),
        );
        driver.clickOnCloseButton();
        jest.runAllTimers(); // for animations
        expect(driver.visible()).toBeFalsy();
        rerender(renderNotificationWithProps({ show: true }));
        expect(driver.visible()).toBeTruthy();
      });
    });

    describe(`AutoHide`, () => {
      const someTimeout = 132;
      const renderNewNotification = props =>
        renderNotificationWithProps({ ...props });

      it(`should keep notification shown regardless of any timers`, () => {
        const driver = createDriver(renderNewNotification({ show: true }));
        jest.runAllTimers();

        expect(driver.visible()).toBeTruthy();
        expect(setTimeout).not.toBeCalled();
      });

      it('should auto-hide after a given timeout', () => {
        const driver = createDriver(
          renderNewNotification({
            show: true,
            autoHideTimeout: someTimeout,
          }),
        );

        expect(driver.visible()).toBeTruthy();
        jest.runAllTimers();
        expect(driver.visible()).toBeFalsy();
      });

      it('should be able to show notification again after timeout', () => {
        const { driver, rerender } = render(
          renderNewNotification({
            show: true,
            autoHideTimeout: someTimeout,
          }),
        );

        jest.runAllTimers();
        expect(driver.visible()).toBeFalsy();
        jest.clearAllTimers();

        rerender(
          renderNewNotification({
            show: true,
            autoHideTimeout: someTimeout,
          }),
        );
        expect(driver.visible()).toBeTruthy();
      });

      it('should auto-hide after starting from a closed status', () => {
        const { driver, rerender } = render(
          renderNewNotification({
            show: false,
            autoHideTimeout: someTimeout,
          }),
        );

        jest.runAllTimers();
        expect(driver.visible()).toBeFalsy();
        rerender(
          renderNewNotification({
            show: true,
            autoHideTimeout: someTimeout,
          }),
        );
        expect(driver.visible()).toBeTruthy();
        jest.runAllTimers();
        expect(driver.visible()).toBeFalsy();
      });
    });

    afterEach(() => {
      jest.clearAllTimers();
    });
  });

  describe('Style', () => {
    it('should accept a z-index', () => {
      const zIndex = 999;
      const driver = createDriver(
        renderNotificationWithProps({ show: true, zIndex }),
      );
      expect(driver.getZIndex()).toEqual(zIndex);
    });
  });

  describe('testkit', () => {
    it('should exist', () => {
      const component = renderNotificationWithProps({ show: true });
      expect(
        isTestkitExists(component, notificationTestkitFactory),
      ).toBeTruthy();
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', async () => {
      const component = mount(<ControlledNotification />);

      const enzymeNotificationTestkit = enzymeNotificationTestkitFactory({
        wrapper: component,
        dataHook: 'notification_dh',
      });
      const enzymeButtonTestkit = enzymeButtonTestkitFactory({
        wrapper: component,
        dataHook: 'button_dh',
      });

      expect(enzymeNotificationTestkit.visible()).toBeFalsy();
      expect(enzymeButtonTestkit.exists()).toBeTruthy();

      await enzymeButtonTestkit.click();

      expect(enzymeNotificationTestkit.visible()).toBeTruthy();
    });
  });

  describe('Notification.ActionButton', () => {
    it('should display a Button when passing by default', () => {
      const component = mount(
        <Notification.ActionButton>Action Button</Notification.ActionButton>,
      );

      expect(component.find('Button')).toHaveLength(1);
    });

    it('should display a Button when explicitly required', () => {
      const component = mount(
        <Notification.ActionButton type="button">
          Action Button
        </Notification.ActionButton>,
      );

      expect(component.find('Button')).toHaveLength(1);
    });

    it('should display a TextButton explicitly required', () => {
      const component = mount(
        <Notification.ActionButton type="textLink" link="some link">
          Action Button
        </Notification.ActionButton>,
      );

      expect(component.find(TextButton)).toHaveLength(1);
    });
  });
});

class ControlledNotification extends React.Component {
  constructor(props) {
    super(props);

    this.state = { showNotification: false };
  }

  render() {
    return (
      <div>
        <Button
          dataHook="button_dh"
          onClick={() =>
            this.setState({ showNotification: !this.state.showNotification })
          }
        >
          button
        </Button>
        <Notification
          dataHook="notification_dh"
          show={this.state.showNotification}
        >
          <Notification.TextLabel>label</Notification.TextLabel>
          <Notification.CloseButton />
        </Notification>
      </div>
    );
  }
}
