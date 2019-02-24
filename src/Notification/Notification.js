import React, { Children } from 'react';
import PropTypes from 'prop-types';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import classNames from 'classnames';

import WixComponent from '../BaseComponents/WixComponent';
import * as Composite from '../Composite';
import CloseButton from '../CloseButton';
import TextLabel from './TextLabel';
import ActionButton from './ActionButton';
import css from './Notification.scss';

export const LOCAL_NOTIFICATION = 'local';
export const GLOBAL_NOTIFICATION = 'global';
export const STICKY_NOTIFICATION = 'sticky';
export const DEFAULT_AUTO_HIDE_TIMEOUT = 6000;
export const DEFAULT_TIMEOUT = DEFAULT_AUTO_HIDE_TIMEOUT;

export const notificationTypeToPosition = {
  [LOCAL_NOTIFICATION]: 'absolute',
  [GLOBAL_NOTIFICATION]: 'relative',
  [STICKY_NOTIFICATION]: 'fixed',
};

const animationsTimeouts = {
  enter: 500,
  exit: 350,
};

function FirstChild(props) {
  const childrenArray = Children.toArray(props.children);
  return childrenArray[0] || null;
}

function mapChildren(children) {
  const childrenArray = Children.toArray(children);

  if (childrenArray.length === 3) {
    return {
      label: childrenArray[0],
      ctaButton: childrenArray[1],
      closeButton: React.cloneElement(childrenArray[2], { size: 'small' }),
    };
  } else {
    return {
      label: childrenArray[0],
      closeButton: React.cloneElement(childrenArray[1], { size: 'small' }),
    };
  }
}

class Notification extends WixComponent {
  static displayName = 'Notification';

  closeTimeout;

  constructor(props) {
    super(props);
    this.state = {
      hideByCloseClick: false,
      hideByTimer: false,
    };

    this.startCloseTimer(props);
  }

  startCloseTimer({ autoHideTimeout }) {
    if (autoHideTimeout) {
      this.closeTimeout = setTimeout(
        () => this.hideNotificationOnTimeout(),
        autoHideTimeout || DEFAULT_AUTO_HIDE_TIMEOUT,
      );
    }
  }

  clearCloseTimeout() {
    if (this.closeTimeout) {
      clearTimeout(this.closeTimeout);
      this.closeTimeout = null;
    }
  }

  hideNotificationOnCloseClick = () => {
    this.setState({ hideByCloseClick: true });

    setTimeout(
      () => this.props.onClose && this.props.onClose('hide-by-close-click'),
      animationsTimeouts.exit + 100,
    );
  };

  hideNotificationOnTimeout = () => {
    this.setState({ hideByTimer: true });

    setTimeout(
      () => this.props.onClose && this.props.onClose('hide-by-timer'),
      animationsTimeouts.exit + 100,
    );
  };

  bypassCloseFlags() {
    this.setState({
      hideByCloseClick: false,
      hideByTimer: false,
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.show) {
      this.bypassCloseFlags();
      this.clearCloseTimeout();
      this.startCloseTimer(nextProps);
    }
  }

  componentWillUnmount() {
    this.clearCloseTimeout();
  }

  shouldShowNotification() {
    return (
      this.props.show && !this.state.hideByCloseClick && !this.state.hideByTimer
    );
  }

  renderNotification() {
    const { zIndex, children, type, theme } = this.props;
    const childrenComponents = mapChildren(children);

    return (
      <CSSTransition
        classNames={{
          enter: css.notificationAnimationEnter,
          enterActive: css.notificationAnimationEnterActive,
          exit: css.notificationAnimationExit,
          exitActive: css.notificationAnimationExitActive,
        }}
        timeout={animationsTimeouts}
      >
        <div
          data-hook="notification-wrapper"
          style={{ zIndex }}
          className={classNames(
            css.notification,
            css[`${theme}Theme`],
            css[`${notificationTypeToPosition[type]}Position`],
          )}
          role="alert"
          aria-labelledby="notification-label"
          aria-live="polite"
        >
          <div
            id="notification-label"
            className={css.label}
            children={childrenComponents.label}
          />

          {childrenComponents.ctaButton && (
            <div
              className={css.button}
              children={childrenComponents.ctaButton}
            />
          )}

          <div
            data-hook="notification-close-button"
            className={css.closeButton}
            onClick={this.hideNotificationOnCloseClick}
            children={childrenComponents.closeButton}
          />
        </div>
      </CSSTransition>
    );
  }

  render() {
    return (
      <div className={css.root}>
        <TransitionGroup component={FirstChild}>
          {this.shouldShowNotification() ? this.renderNotification() : null}
        </TransitionGroup>
      </div>
    );
  }
}

const Close = props => <CloseButton skin="lightFilled" {...props} />;
Close.displayName = 'Notification.CloseButton';

Notification.propTypes = {
  show: PropTypes.bool,
  theme: PropTypes.oneOf([
    'standard',
    'error',
    'success',
    'warning',
    'premium',
  ]),
  type: PropTypes.oneOf([
    GLOBAL_NOTIFICATION,
    LOCAL_NOTIFICATION,
    STICKY_NOTIFICATION,
  ]),
  /** When provided, then the Notification will be hidden after the specified timeout. */
  autoHideTimeout: PropTypes.number,
  zIndex: PropTypes.number,
  onClose: PropTypes.func,
  children: Composite.children(
    Composite.once(TextLabel),
    Composite.optional(ActionButton),
    Composite.optional(Close),
  ),
};

Notification.defaultProps = {
  theme: 'standard',
  type: GLOBAL_NOTIFICATION,
  onClose: null,
};

Notification.CloseButton = Close;
Notification.TextLabel = TextLabel;
Notification.ActionButton = ActionButton;

export default Notification;
