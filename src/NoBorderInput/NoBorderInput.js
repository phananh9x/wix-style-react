import React from 'react';
import classNames from 'classnames';
import omit from 'omit';

import Input from '../Input/Input';
import inputStyles from '../Input/Input.scss';
import styles from './NoBorderInput.scss';

class NoBorderInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      focus: props.autoFocus ? true : false,
    };
  }

  render() {
    const {
      id,
      size,
      dataHook,
      title,
      disabled,
      onFocus,
      onBlur,
      status,
      statusMessage,
      className,
      value,
      withSelection,
    } = this.props;

    const rejectedProps = [
      'theme',
      'prefix',
      'className',
      'help',
      'statusMessage',
      'error',
      'errorMessage',
      'roundInput',
      'noLeftBorderRadius',
      'noRightBorderRadius',
    ];
    const wsrInputProps = omit(rejectedProps, this.props);

    const hasValue =
      (value && value.length) ||
      (this.wsrInput && this.wsrInput.input && !!this.wsrInput.input.value);
    const conditionalClasses = {
      [styles.disabled]: disabled,
      [styles.hasError]: status === Input.StatusError,
      [styles.hasFocus]: this.state.focus,
      [styles.hasValue]: hasValue,
    };
    const statusClass = status && statusMessage ? styles.errorMessage : '';
    const statusText = status && statusMessage;

    const renderStatusLine = () =>
      !disabled && (
        <div className={classNames(statusClass, styles.message)}>
          {statusText}
        </div>
      );

    return (
      <div
        className={classNames(
          conditionalClasses,
          styles.root,
          inputStyles[`size-${size}${withSelection ? '-with-selection' : ''}`],
          className,
        )}
        data-hook={dataHook}
      >
        <label className={styles.label} htmlFor={id}>
          {title}
        </label>
        <Input
          className={styles.nbinput}
          {...wsrInputProps}
          ref={wsrInput => (this.wsrInput = wsrInput)}
          onFocus={e => {
            this.setState({ focus: true });
            if (typeof onFocus === 'function') {
              onFocus(e);
            }
          }}
          onBlur={e => {
            this.setState({ focus: false });
            if (typeof onBlur === 'function') {
              onBlur(e);
            }
          }}
        />
        <div
          className={classNames(
            styles.activationIndicator,
            styles.activationIndicatorActive,
          )}
        />
        {renderStatusLine()}
      </div>
    );
  }
}

NoBorderInput.displayName = 'NoBorderInput';

NoBorderInput.defaultProps = {
  autoSelect: false,
  size: 'normal',
  statusMessage: '',
  textOverflow: 'clip',
  maxLength: 524288,
};

NoBorderInput.propTypes = {
  ...Input.propTypes,
};

export default NoBorderInput;
