import React, { Component } from 'react';
import PropTypes from 'prop-types';
import reactElementToJSXString from 'react-element-to-jsx-string';
import Tooltip from 'wix-style-react/Tooltip';
import Button from 'wix-style-react/Button';
import TooltipForEyesOnly from './TooltipForEyesOnly';

export class Template extends Component {
  static propTypes = {
    padding: PropTypes.any,
    onChange: PropTypes.func.isRequired,
    popover: PropTypes.bool,
    theme: Tooltip.propTypes.theme,
    placement: Tooltip.propTypes.placement,
    tooltipContent: Tooltip.propTypes.content,
    showTrigger: Tooltip.propTypes.showTrigger,
    hideTrigger: Tooltip.propTypes.hideTrigger,
    type: PropTypes.oneOf(['tooltip', 'popover']),
    size: Tooltip.propTypes.size,
    maxWidth: Tooltip.propTypes.maxWidth,
    onShow: Tooltip.propTypes.onShow,
    onHide: Tooltip.propTypes.onHide,
    shouldUpdatePosition: Tooltip.propTypes.shouldUpdatePosition,
    showImmediately: Tooltip.propTypes.showImmediately,
    moveBy: Tooltip.propTypes.moveBy,
    showArrow: Tooltip.propTypes.showArrow,
  };

  componentDidUpdate(props) {
    props.onChange(this.getExampleCode());
  }

  componentDidMount() {
    this.props.onChange(this.getExampleCode());
  }

  getExampleCode() {
    return reactElementToJSXString(this.getComponent(), {
      showDefaultProps: false,
    });
  }

  getComponent() {
    return (
      <Tooltip
        padding={this.props.padding}
        popover={this.props.popover || this.props.type === 'popover'}
        placement={this.props.placement}
        alignment="center"
        content={this.props.tooltipContent}
        showTrigger={this.props.showTrigger}
        hideTrigger={this.props.hideTrigger}
        theme={this.props.theme}
        size={this.props.size}
        maxWidth={this.props.maxWidth}
        onShow={this.props.onShow}
        onHide={this.props.onHide}
        shouldCloseOnClickOutside
        shouldUpdatePosition={this.props.shouldUpdatePosition}
        showImmediately={this.props.showImmediately}
        moveBy={this.props.moveBy}
        showArrow={this.props.showArrow}
      >
        {this.getTooltipTarget()}
      </Tooltip>
    );
  }

  getTooltipTarget() {
    switch (this.props.type) {
      case 'tooltip':
        return <div>Hover me to see the tooltip</div>;
      case 'popover':
        return <Button type="button">Click Me</Button>;
      default:
    }
  }

  render() {
    return (
      <div>
        {this.getComponent()}
        <TooltipForEyesOnly />
      </div>
    );
  }
}

export default Template;
