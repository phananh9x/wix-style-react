import React from 'react';
import { node, bool, string } from 'prop-types';
import { withFocusable } from 'wix-ui-core/dist/src/hocs/Focusable/FocusableHOC';

import styles from './ToggleButton.st.css';

import Text from '../../Text';

const addPrefix = icon =>
  icon &&
  React.cloneElement(icon, {
    width: '24',
    height: '24',
    className: styles.prefix,
  });

const ToggleButton = ({
  children,
  prefixIcon,
  selected,
  dataHook,
  focusableOnFocus,
  focusableOnBlur,
  disabled,
  ...rest
}) => (
  <button
    {...rest}
    {...styles('root', { selected }, rest)}
    data-hook={dataHook}
    disabled={disabled}
    onFocus={focusableOnFocus}
    onBlur={focusableOnBlur}
  >
    {addPrefix(prefixIcon)}
    <Text
      ellipsis
      size="medium"
      weight="normal"
      skin={disabled ? 'disabled' : 'standard'}
    >
      {children}
    </Text>
  </button>
);

ToggleButton.propTypes = {
  children: node,
  prefixIcon: node,
  value: string,
  selected: bool,
  disabled: bool,
};

ToggleButton.displayName = 'SegmentedToggle.Button';

export default withFocusable(ToggleButton);
