import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './RichTextToolbarButton.scss';
import Tooltip from '../Tooltip';

const RichTextToolbarButton = ({
  dataHook,
  onClick,
  tooltipText,
  isActive,
  children,
}) => (
  <Tooltip content={tooltipText} theme="dark" appendToParent>
    <button
      data-hook={dataHook}
      className={classNames(styles.button, isActive ? styles.active : '')}
      onClick={onClick}
    >
      {children}
    </button>
  </Tooltip>
);

export default RichTextToolbarButton;
