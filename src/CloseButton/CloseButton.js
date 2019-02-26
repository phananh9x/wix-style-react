import React, { Component } from 'react';
import { ButtonNext } from 'wix-ui-core/button-next';
import cx from 'classnames';

import { string, oneOf, bool, func, node } from 'prop-types';
import Close from '../new-icons/system/Close';
import CloseLarge from '../new-icons/system/CloseLarge';

import { closeButton } from 'wix-ui-core/themes/backoffice';

class CloseButton extends Component {
  static displayName = 'CloseButton';

  static propTypes = {
    /** additional css classes */
    className: string,
    /** Used for passing any wix-style-react icon. For external icon make sure to follow ux sizing guidelines */
    children: node,
    /** skins of closebutton */
    skin: oneOf(['standard', 'standardFilled', 'light', 'lightFilled', 'dark']),
    /** size of closebutton */
    size: oneOf(['small', 'medium']),
    /** Click event handler  */
    onClick: func,
    /** applies disabled styles */
    disabled: bool,
    /** string based data hook for testing */
    dataHook: string,
  };

  static defaultProps = {
    skin: 'standard',
    size: 'small',
    disabled: false,
  };

  render() {
    const { skin, size, className, dataHook, children, ...rest } = this.props;

    const classNames = cx(className, closeButton(skin, size));
    const CloseIcon = <Close data-hook="close" />;
    const CloseLargeIcon = <CloseLarge data-hook="close-large" />;

    return (
      <ButtonNext {...rest} data-hook={dataHook} className={classNames}>
        {children
          ? React.cloneElement(children, { size: '18px' })
          : size === 'small' // fallback to Close icon if children not provided (current behavior)
          ? CloseIcon
          : CloseLargeIcon}
      </ButtonNext>
    );
  }
}

export default CloseButton;
