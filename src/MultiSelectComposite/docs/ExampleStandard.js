import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MultiSelectCompositeExample from './MultiSelectCompositeTemplate';
import Input from '../../Input';
import Label from '../../Label';
import ToggleSwitch from '../../ToggleSwitch';

import styles from './ExampleStandard.scss';

class ExampleStandard extends Component {
  static propTypes = {
    onChange: PropTypes.func,
  };

  state = {
    withLabel: true,
    label: {
      appearance: 'T1.1',
      children: 'First name',
    },
    required: false,
    info: '',
  };

  setComponentState(componentName, obj) {
    this.setState(prevState => {
      prevState[componentName] = { ...this.state[componentName], ...obj };
      Object.keys(prevState[componentName]).forEach(
        k => !prevState[componentName][k] && delete prevState[componentName][k],
      );
      return prevState;
    });
  }

  render() {
    return (
      <form className={styles.form}>
        <div className={styles.input}>
          <div className={styles.option}>
            <Label>Show label</Label>
            <div className={styles.flex}>
              <Input
                size="small"
                value={this.state.label.children}
                onChange={e =>
                  this.setComponentState('label', { children: e.target.value })
                }
              />
              &nbsp;
              <ToggleSwitch
                size="small"
                checked={this.state.withLabel}
                onChange={() =>
                  this.setState({ withLabel: !this.state.withLabel })
                }
              />
            </div>
          </div>
          <div className={styles.option}>
            <div className={styles.flex}>
              <div className={styles.paddRight}>
                <Label>Required Field: </Label>
              </div>
              <ToggleSwitch
                size="small"
                checked={this.state.required}
                onChange={() =>
                  this.setState({ required: !this.state.required })
                }
              />
            </div>
          </div>

          <div className={styles.option}>
            <Label>Info Tooltip</Label>
            <div className={styles.flex}>
              <Input
                size="small"
                value={this.state.info}
                onChange={e => this.setState({ info: e.target.value })}
              />
            </div>
          </div>
        </div>
        <div className={styles.output}>
          <MultiSelectCompositeExample
            {...this.state}
            onChange={this.props.onChange}
          />
        </div>
      </form>
    );
  }
}

export default ExampleStandard;
