import React, { Component } from 'react';
import Tooltip from '../..';
import Button from '../../../Button';

import { SHORT_CONTENT, LONG_CONTENT } from '../content';

export default class TooltipForEyesOnly extends Component {
  static displayName = 'TooltipForEyesOnly';

  static propTypes = {};

  static defaultProps = {};

  constructor() {
    super();
    this.state = {
      content: SHORT_CONTENT,
      style: {},
      popover: false,
    };
  }

  render() {
    const { style, content } = this.state;
    const isE2e = global.self === global.top;

    return isE2e ? (
      <div data-hook="tooltip-e2e-wrapper">
        <Tooltip
          active
          shouldUpdatePosition
          showImmediately
          popover={this.state.popover}
          showTrigger={'custom'}
          hideTrigger={'custom'}
          appendToParent
          content={<div data-hook="tooltip-e2e-tooltip">{content}</div>}
        >
          <div style={style} data-hook="tooltip-anchor">
            My Father is a Tooltip
          </div>
        </Tooltip>
        <Button
          as="div"
          dataHook="long-text-button"
          onClick={() => this._onClick()}
        >
          Change State
        </Button>
        <Button
          as="div"
          dataHook="popover-button"
          onClick={() => this.togglePopover()}
        >
          Toggle popover
        </Button>
      </div>
    ) : null;
  }

  togglePopover() {
    this.setState({ popover: !this.state.popover });
  }

  _onClick() {
    this.setState({
      style: { position: 'relative', left: '20px' },
      content: LONG_CONTENT,
    });
  }
}
