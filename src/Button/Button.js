import React, { Component } from 'react';
import { ButtonNext } from 'wix-ui-core/button-next';
import cx from 'classnames';
import { button } from 'wix-ui-core/themes/backoffice';
import { string, node, oneOf, element, bool, func } from 'prop-types';

class Button extends Component {
  static displayName = 'Button';

  static propTypes = {
    /** render as some other component or DOM tag */
    as: node,
    /** Additional classes */
    className: string,
    /** Skins of Button content */
    skin: oneOf([
      'standard',
      'inverted',
      'destructive',
      'premium',
      'dark',
      'light',
      'transparent',
      'premium-light',
    ]),
    /** Underline of Button content */
    priority: oneOf(['primary', 'secondary']),
    /** Size of Button content */
    size: oneOf(['tiny', 'small', 'medium', 'large']),
    /** Click event handler  */
    onClick: func,
    /** Sets button width to 100% */
    fullWidth: bool,
    /** Element based icon (svg, image etc.) */
    suffixIcon: element,
    /** Element based icon (svg, image etc.) */
    prefixIcon: element,
    /** Applies disabled styles */
    disabled: bool,
    /** String based node */
    children: node,
    /** String based data hook */
    dataHook: string,
  };

  static defaultProps = {
    skin: 'standard',
    priority: 'primary',
    size: 'medium',
  };

  render() {
    const {
      skin,
      priority,
      size,
      fullWidth,
      children,
      className,
      dataHook,
      ...rest
    } = this.props;

    const fluid = fullWidth ? 'fullWidth' : '';
    const classNames = cx(className, button(fluid, skin, priority, size));

    return (
      <ButtonNext {...rest} data-hook={dataHook} className={classNames}>
        {children}
      </ButtonNext>
    );
  }
}

export default Button;
