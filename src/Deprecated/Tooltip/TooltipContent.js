import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './TooltipContent.scss';

class TooltipContent extends Component {
  static propTypes = {
    dataHook: PropTypes.string,
    /** className for tooltip content  */
    contentClassName: PropTypes.string,

    /** alignment of the tooltip's text  */
    textAlign: PropTypes.string,

    /** The tooltip max width  */
    maxWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /** The tooltip min width  */
    minWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * Tooltip content to be rendered
     */
    children: PropTypes.node.isRequired,

    /**
     * Specifies tooltip theme
     */
    theme: PropTypes.oneOf(['light', 'dark', 'error']),

    /**
     * Specifies on which side the arrow should be shown
     */
    arrowPlacement: PropTypes.oneOf(['top', 'right', 'bottom', 'left']),

    /**
     * Custom CSS style object (used to allow setting arrow position)
     */
    arrowStyle: PropTypes.object,

    /**
     * Custom CSS style object (used to allow setting the position)
     */
    style: PropTypes.object,

    /**
     * Custom padding (not part of style since it is to the internal component)
     */
    padding: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

    /**
     * Callback triggered when mouse enters the component
     * Used for showing tooltip when mouse leaves the target element, but hovers the tooltip itself
     */
    onMouseEnter: PropTypes.func,

    /**
     * Callback triggered when mouse leaves the component
     * Used for showing tooltip when mouse leaves the target element, but hovers the tooltip itself
     */
    onMouseLeave: PropTypes.func,

    /**
     * Specifies if tooltip content should use bouncing animation.
     */
    bounce: PropTypes.bool,
    size: PropTypes.oneOf(['normal', 'large']),

    /**
     * Specifies the font color of the content of the tooltip
     */
    color: PropTypes.string,
    lineHeight: PropTypes.string,

    /** Show Tooltip Immediately - with no delay and no animation */
    showImmediately: PropTypes.bool,

    /** Show an arrow shape */
    showArrow: PropTypes.bool,
  };

  static defaultProps = {
    theme: 'light',
    arrowPlacement: 'bottom',
    maxWidth: '204px',
    size: 'normal',
    textAlign: 'center',
    showArrow: true,
  };

  render() {
    const {
      children,
      contentClassName,
      theme,
      arrowPlacement,
      arrowStyle,
      style,
      onMouseEnter,
      onMouseLeave,
      bounce,
      size,
      textAlign,
      maxWidth,
      minWidth,
      padding,
      color,
      lineHeight,
      showImmediately,
      showArrow,
      dataHook,
    } = this.props;

    return (
      <div
        className={styles.root}
        style={style}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        data-hook={dataHook}
      >
        <div className={classnames({ [styles.fadeIn]: !showImmediately })}>
          <div
            className={classnames({
              [styles[`bounce-${arrowPlacement}`]]: bounce,
            })}
          >
            <div
              ref={ref => (this.tooltip = ref)}
              className={classnames(
                styles.tooltip,
                styles[theme],
                styles[size],
                contentClassName,
              )}
              style={{
                maxWidth,
                minWidth,
                textAlign,
                padding,
                lineHeight,
                color,
              }}
            >
              <div data-hook="tooltip-content">{children}</div>
            </div>
            {showArrow && (
              <div
                data-hook="tooltip-arrow"
                className={classnames(
                  styles.arrow,
                  styles[theme],
                  styles[arrowPlacement],
                )}
                style={arrowStyle}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default TooltipContent;
