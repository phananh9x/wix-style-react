/* eslint-disable no-console */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Template from './Template';
import RadioGroup from '../../../RadioGroup';
import ToggleSwitch from '../../../ToggleSwitch';
import Label from '../../../Label';
import Input from '../../../Input';

import styles from './Example.scss';

class ExampleTooltip extends Component {
  state = {
    type: 'default',
    text: 'Tooltip appears on hover',
    size: 'normal',
    maxWidth: '',
    popover: false,
    onShow: () => console.log('onShow triggered'),
    onHide: () => console.log('onHide triggered'),
    onShowText: 'onShow triggered',
    onHideText: 'onHide triggered',
    moveBy: { x: 0, y: 0 },
    shouldUpdatePosition: false,
    showImmediately: false,
    showArrow: true,
  };

  render() {
    return (
      <form className={styles.form}>
        <div className={styles.input}>
          <div className={styles.option}>
            <Label>Size</Label>
            <div className={styles.flex}>
              <RadioGroup
                display="horizontal"
                value={this.state.size}
                onChange={size => this.setState({ size })}
              >
                <RadioGroup.Radio value="normal">Default</RadioGroup.Radio>
                <RadioGroup.Radio value="large">
                  Bigger info tooltip
                </RadioGroup.Radio>
              </RadioGroup>
            </div>
          </div>

          <div className={styles.option}>
            <Label>Theme</Label>
            <div className={styles.flex}>
              <RadioGroup
                display="horizontal"
                value={this.state.type}
                onChange={type => this.setState({ type })}
              >
                <RadioGroup.Radio value="default">Dark</RadioGroup.Radio>
                <RadioGroup.Radio value="white">White</RadioGroup.Radio>
              </RadioGroup>
            </div>
          </div>

          <div className={styles.option}>
            <Label>Text</Label>
            <div className={styles.flex}>
              <Input
                size="small"
                value={this.state.text}
                onChange={e => this.setState({ text: e.target.value })}
              />
            </div>
          </div>

          <div className={styles.option}>
            <Label>onShow print to console</Label>
            <div className={styles.flex}>
              <Input
                size="small"
                value={this.state.onShowText}
                onChange={e => this.setState({ onShowText: e.target.value })}
              />
            </div>
          </div>

          <div className={styles.option}>
            <Label>onHide print to console</Label>
            <div className={styles.flex}>
              <Input
                size="small"
                value={this.state.onHideText}
                onChange={e => this.setState({ onHideText: e.target.value })}
              />
            </div>
          </div>

          <div className={styles.option}>
            <Label>Max Width</Label>
            <div className={styles.flex}>
              <Input
                size="small"
                value={this.state.maxWidth}
                onChange={e => this.setState({ maxWidth: e.target.value })}
              />
            </div>
          </div>

          <div className={styles.option}>
            <Label>Should Update Position</Label>
            <div className={styles.flex}>
              <ToggleSwitch
                checked={this.state.shouldUpdatePosition}
                onChange={() =>
                  this.setState({
                    shouldUpdatePosition: !this.state.shouldUpdatePosition,
                  })
                }
              />
            </div>
          </div>

          <div className={styles.option}>
            <Label>Show Tooltip Immediately</Label>
            <div className={styles.flex}>
              <ToggleSwitch
                checked={this.state.showImmediately}
                onChange={() =>
                  this.setState({
                    showImmediately: !this.state.showImmediately,
                  })
                }
              />
            </div>
          </div>

          <div className={styles.option}>
            <Label>Show Arrow</Label>
            <div className={styles.flex}>
              <ToggleSwitch
                checked={this.state.showArrow}
                onChange={() =>
                  this.setState({ showArrow: !this.state.showArrow })
                }
              />
            </div>
          </div>

          <div className={styles.option}>
            <Label>popover</Label>
            <div className={styles.flex}>
              <ToggleSwitch
                checked={this.state.popover}
                onChange={() => this.setState({ popover: !this.state.popover })}
              />
            </div>
          </div>

          <div className={styles.option}>
            <Label>Move By</Label>
            <div className={styles.flex}>
              <Label>
                x
                <Input
                  size="small"
                  value={this.state.moveBy.x}
                  type="number"
                  onChange={e =>
                    this.setState({
                      moveBy: {
                        ...this.state.moveBy,
                        x: Number(e.target.value),
                      },
                    })
                  }
                />
              </Label>
              <Label>
                y
                <Input
                  size="small"
                  value={this.state.moveBy.y}
                  type="number"
                  onChange={e =>
                    this.setState({
                      moveBy: {
                        ...this.state.moveBy,
                        y: Number(e.target.value),
                      },
                    })
                  }
                />
              </Label>
            </div>
          </div>
        </div>

        <div
          className={
            styles[
              this.state.theme === 'whiteblue' ? 'output-lightblue' : 'output'
            ]
          }
        >
          <div
            className={`${styles[this.state.theme]} ${styles.exampleWrapper}`}
          >
            <Template
              theme={this.state.type === 'default' ? 'dark' : 'light'}
              tooltipContent={this.state.text}
              type="tooltip"
              onChange={this.props.onChange}
              size={this.state.size}
              popover={this.state.popover}
              maxWidth={this.state.maxWidth}
              onShow={() => console.log(this.state.onShowText)}
              onHide={() => console.log(this.state.onHideText)}
              shouldUpdatePosition={this.state.shouldUpdatePosition}
              showImmediately={this.state.showImmediately}
              moveBy={this.state.moveBy}
              showArrow={this.state.showArrow}
            />
          </div>
        </div>
      </form>
    );
  }
}

export default ExampleTooltip;

ExampleTooltip.propTypes = {
  onChange: PropTypes.func.isRequired,
};
