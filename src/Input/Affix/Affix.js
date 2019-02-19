import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Affix.scss';
import InputConsumer from '../InputConsumer';

const Affix = ({ children, value }) => (
  <InputConsumer consumerCompName={Affix.displayName}>
    {({ size, inSuffix, inPrefix, onInputClicked }) => {
      const className = classNames(styles.custom, {
        [styles.inSuffix]: inSuffix,
        [styles.inPrefix]: inPrefix,
        [styles.small]: size === 'small',
      });
      return (
        <div
          onClick={onInputClicked}
          className={className}
          data-hook="custom-affix"
        >
          {value || children}
        </div>
      );
    }}
  </InputConsumer>
);

Affix.displayName = 'Input.Affix';
Affix.propTypes = {
  children: PropTypes.node,
  value: PropTypes.string,
};
export default Affix;
