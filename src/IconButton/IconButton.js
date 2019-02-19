import React, { Component } from 'react';
import { ButtonNext } from 'wix-ui-core/button-next';
import cx from 'classnames';
import { iconButton } from 'wix-ui-core/themes/backoffice';
import { string, node, bool, oneOf, func } from 'prop-types';

class IconButton extends Component {
  static displayName = 'IconButton';

  static propTypes = {
    /** Classes to be applied to the root element */
    className: string,
    /** Used for passing any wix-style-react icon. For external icon make sure to follow ux sizing guidelines */
    children: node,
    /** Button skins */
    skin: oneOf(['standard', 'inverted', 'light']),
    /** Button priority */
    priority: oneOf(['primary', 'secondary']),
    /** Button size */
    size: oneOf(['small', 'medium']),
    /** Click event handler  */
    onClick: func,
    /** Applies disabled styles */
    disabled: bool,
    /** String based data hook */
    dataHook: string,
  };

  static defaultProps = {
    skin: 'standard',
    priority: 'primary',
    size: 'medium',
    disabled: false,
  };

  render() {
    const {
      skin,
      priority,
      size,
      className,
      children,
      disabled,
      dataHook,
      ...rest
    } = this.props;

    const classNames = cx(className, iconButton(skin, priority, size));

    return (
      <ButtonNext
        {...rest}
        data-hook={dataHook}
        className={classNames}
        disabled={disabled}
      >
        {React.cloneElement(children, {
          size: size === 'small' ? '18px' : '24px',
        })}
      </ButtonNext>
    );
  }
}

export default IconButton;
