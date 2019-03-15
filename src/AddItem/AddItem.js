import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import { withFocusable, focusableStates } from '../common/Focusable';
import AddItemLarge from 'wix-ui-icons-common/system/AddItemLarge';
import AddItemMedium from 'wix-ui-icons-common/system/AddItemMedium';
import AddItemSmall from 'wix-ui-icons-common/system/AddItemSmall';
import Add from '../new-icons/Add';
import ActionText from './components/ActionText';
import Tooltip from '../Deprecated/Tooltip';
import AddMedia from 'wix-ui-icons-common/system/AddMedia';

import styles from './AddItem.scss';

const ICONS = {
  large: <AddItemLarge data-hook="additem-icon" />,
  medium: <AddItemMedium data-hook="additem-icon" />,
  small: <AddItemSmall data-hook="additem-icon" />,
  tiny: (
    <Add
      data-hook="additem-icon"
      width="26"
      height="26"
      style={{ flexShrink: 0 }}
    />
  ),
  custom: <AddMedia data-hook="additem-icon" width="31" height="31" />,
};

const DEFAULT_TOOLTIP_PROPS = {
  showDelay: 0,
  hideDelay: 0,
  theme: 'dark',
  align: 'center',
  placement: 'top',
};

class AddItem extends Component {
  static displayName = 'AddItem';
  static propTypes = {
    /** Any component or string */
    children: PropTypes.node,

    /** Apply disabled styles */
    disabled: PropTypes.bool,

    /** The theme of component */
    theme: PropTypes.oneOf(['dashes', 'plain', 'filled', 'image']),

    /** Switching content alignment  */
    alignItems: PropTypes.oneOf(['center', 'right', 'left']),

    /** Size to control icon and spacing  */
    size: PropTypes.oneOf(['large', 'medium', 'small', 'tiny']),

    /** Click event handler  */
    onClick: PropTypes.func,

    /** used for testing */
    dataHook: PropTypes.string,

    /** Tooltip props, leave undefined for no tooltip */
    tooltipProps: PropTypes.shape(Tooltip.propTypes),

    /** Content of the tooltip, leave undefined for no tooltip */
    tooltipContent: PropTypes.string,

    /** Focusable proptype */
    focusableOnFocus: PropTypes.func,

    /** Focusable proptype */
    focusableOnBlur: PropTypes.func,
  };

  static defaultProps = {
    theme: 'dashes',
    size: 'tiny',
    alignItems: 'center',
  };

  renderIcon = () => {
    const { size, theme } = this.props;
    const image = theme === 'image';
    return ICONS[image ? 'custom' : size];
  };

  renderText = () => {
    const { children, disabled, theme, size } = this.props;
    if (!children || theme === 'image') {
      return null;
    }
    return typeof children === 'string' ? (
      <ActionText disabled={disabled} size={size}>
        {children}
      </ActionText>
    ) : (
      children
    );
  };

  renderContent = () => {
    const { tooltipContent, theme, alignItems, size, disabled } = this.props;
    const box = classnames(styles.box, styles[alignItems], {
      [styles.row]: size === 'tiny',
      [styles[theme]]: theme === 'image',
    });
    const container = (
      <div className={box}>
        {this.renderIcon()}
        {this.renderText()}
      </div>
    );
    const tooltipProps = {
      ...DEFAULT_TOOLTIP_PROPS,
      content: tooltipContent,
      ...this.props.tooltipProps,
    };

    return tooltipProps.content && !disabled ? (
      <Tooltip dataHook="additem-tooltip" {...tooltipProps}>
        {container}
      </Tooltip>
    ) : (
      container
    );
  };

  render() {
    const {
      dataHook,
      onClick,
      disabled,
      theme,
      focusableOnFocus,
      focusableOnBlur,
    } = this.props;
    const disable = disabled && theme !== 'image';
    const image = theme === 'image';
    const root = classnames(styles.root, {
      [styles[theme]]: !image,
      [styles.wrapped]: image,
      [styles.disabled]: disable,
    });
    return (
      <div
        className={root}
        data-hook={dataHook}
        onClick={disabled ? null : onClick}
        onFocus={focusableOnFocus}
        onBlur={focusableOnBlur}
        {...focusableStates(this.props)}
        tabIndex={disabled ? null : 0}
      >
        {this.renderContent()}
      </div>
    );
  }
}
export default withFocusable(AddItem);
