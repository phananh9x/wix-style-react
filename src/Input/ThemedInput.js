import React from 'react';
import classNames from 'classnames';
import Input from './Input';

import styles from './Input.scss';

class ThemedInput extends Input {
  render() {
    const {
      id,
      size,
      dataHook,
      title,
      theme,
      rtl,
      disabled,
      error,
      status,
      forceHover,
      forceFocus,
      roundInput,
      className,
      noLeftBorderRadius,
      noRightBorderRadius,
      value,
      withSelection,
    } = this.props;

    let hasError = status === Input.StatusError;

    // Check for deprecated fields and use them if provided
    if (error) {
      hasError = true;
    }

    const classes = {
      [styles.rtl]: !!rtl,
      [styles.disabled]: disabled,
      [styles.hasError]: hasError,
      [styles.hasHover]: forceHover,
      [styles.hasFocus]: forceFocus || this.state.focus,
      [styles.roundInput]: roundInput,
      [styles.hasValue]:
        (value && value.length) || (this.input && !!this.input.value),
      [styles.noRightBorderRadius]: noRightBorderRadius === true, // assert boolean type
      [styles.noLeftBorderRadius]: noLeftBorderRadius === true, // assert boolean type
      /* Adding [noRightBorderRadius] and [noLeftBorderRadius] as a string className, is a hack for backward compatibility with
       * a bug that existed in WSR version <= 4.1.0. This should be removed in version 5.x.x.
       */
      [noRightBorderRadius]: typeof noRightBorderRadius === 'string',
      [noLeftBorderRadius]: typeof noLeftBorderRadius === 'string',
    };

    const placeholder = this.props.placeholder;
    return (
      <div
        className={classNames(
          classes,
          styles.root,
          styles[`theme-${theme}`],
          styles[`size-${size}${withSelection ? '-with-selection' : ''}`],
          className,
        )}
        data-hook={dataHook}
      >
        {theme === 'amaterial' && (
          <label className={styles.materialTitle} htmlFor={id}>
            {title}
          </label>
        )}
        {super.render({ placeholder })}
        {theme === 'material' && (
          <div className={`${styles.bar} ${styles.barBlack}`} />
        )}
        {theme === 'amaterial' && (
          <div className={`${styles.bar} ${styles.barBlue}`} />
        )}
      </div>
    );
  }
}

ThemedInput.propTypes = {
  ...Input.propTypes,
};

export default ThemedInput;
