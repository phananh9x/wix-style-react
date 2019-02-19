import React from 'react';
import WixComponent from '../BaseComponents/WixComponent';
import styles from './PopoverMenu.scss';
import Tooltip from '../Tooltip';
import Button from '../Deprecated/Button';
import More from '../new-icons/More';
import PopoverMenuItem from '../PopoverMenuItem';
import classnames from 'classnames';
import { oneOf, oneOfType, bool, element, number, string, func } from 'prop-types';

class PopoverMenu extends WixComponent {
  static displayName = 'PopoverMenu';

  static propTypes = {
    /** Sets size for the popover itself */
    size: oneOf(['normal', 'large']),
    /** A direction the popover will be opened */
    placement: oneOf(['top', 'right', 'bottom', 'left']),
    /** Sets theme for the button */
    buttonTheme: oneOf([
      'icon-greybackground',
      'icon-standard',
      'icon-standardsecondary',
      'icon-white',
      'icon-whitesecondary',
    ]),
    /** Sets size for the button */
    buttonHeight: oneOf(['small', 'medium', 'large']),
    /** Sets max width for the popover  */
    maxWidth: oneOfType([string, number]),
    /**
     * In some cases when you need a popover scroll with your element, you can append the popover to the direct parent, just
     * don't forget to apply `relative`, `absolute` positioning. And be aware that some of your styles may leak into
     * popover content
     */
    appendToParent: bool,
    /** An element which will contain the popover  */
    appendTo: element,
    /** Sets a zIndex to the popover  */
    zIndex: number,
    showArrow: bool,
    onShow: func,
    onHide: func,
  };

  static defaultProps = {
    size: 'normal',
    placement: 'top',
    buttonTheme: 'icon-greybackground',
    buttonHeight: 'medium',
    maxWidth: '378px',
    appendToParent: false,
    zIndex: 0,
    showArrow: true,
  };

  _menuItems = items =>
    React.Children.map(items, (item, i) => {
      if (!item) {
        return null;
      }

      return (
        <PopoverMenuItem
          {...item.props}
          size={this.props.size}
          key={i}
          onClick={() => {
            this.tooltip.hide();
            item.props.onClick();
          }}
        />
      );
    });

  _menu = () => (
    <ul
      className={classnames(styles.menu, {
        [styles.large]: this.props.size === 'large',
        [styles.placementTop]: this.props.placement === 'top',
        [styles.placementBottom]: this.props.placement === 'bottom',
      })}
    >
      {this._menuItems(this.props.children)}
    </ul>
  );

  render() {
    const { placement, size, maxWidth, buttonHeight, buttonTheme } = this.props;

    return (
      <Tooltip
        ref={tooltip => (this.tooltip = tooltip)}
        placement={placement}
        alignment="center"
        content={this._menu()}
        showTrigger="click"
        hideTrigger="click"
        showDelay={0}
        hideDelay={0}
        theme="light"
        size={size}
        padding={0}
        maxWidth={maxWidth}
        shouldCloseOnClickOutside
        appendTo={this.props.appendTo}
        appendToParent={this.props.appendToParent}
        zIndex={this.props.zIndex}
        showArrow={this.props.showArrow}
        onShow={this.props.onShow}
        onHide={this.props.onHide}
      >
        <Button type="button" height={buttonHeight} theme={buttonTheme}>
          <More />
        </Button>
      </Tooltip>
    );
  }
}

export default PopoverMenu;
