import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './IconAffix.scss';
import InputConsumer from '../InputConsumer';

const IconAffix = ({ children, dataHook }) => (
  <InputConsumer consumerCompName={IconAffix.displayName}>
    {({ size, inSuffix, onInputClicked, disabled }) => {
      const className = classNames(styles.icon, {
        [styles.inSuffix]: inSuffix,
        [styles.disabled]: disabled,
      });
      return (
        <div
          onClick={!disabled && onInputClicked}
          className={className}
          data-hook={dataHook}
        >
          {React.cloneElement(children, {
            size: size === 'small' ? '18px' : '24px',
          })}
        </div>
      );
    }}
  </InputConsumer>
);

IconAffix.displayName = 'Input.IconAffix';
IconAffix.propTypes = {
  children: PropTypes.element.isRequired,
};

export default IconAffix;
