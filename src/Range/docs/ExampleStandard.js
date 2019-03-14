import React, { Component } from 'react';
import PropTypes from 'prop-types';

import RangeExample from './RangeTemplate';
import Input from '../../Input';
import Label from '../../Label';
import ToggleSwitch from '../../ToggleSwitch';
import Dropdown from '../../Dropdown';

import styles from './ExampleStandard.scss';

class ExampleStandard extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    dataHook: PropTypes.string,
  };

  rangeTypes = [{ id: 0, value: 'InputRange' }, { id: 1, value: 'DateRange' }];

  state = {
    rangeType: this.rangeTypes[0],
    withLabel: true,
    prefixSuffixValue: '',
    prefixUnit: '',
    prefixTicker: false,
    suffixUnit: '',
    suffixTicker: false,
    label: {
      appearance: 'T1.1',
      children: 'Range Label',
    },
    firstInput: {
      disabled: false,
      placeholder: '0',
      resizable: false,
    },
    lastInput: {
      disabled: false,
      placeholder: '0',
      resizable: false,
    },
    firstDate: {
      disabled: false,
      placeholderText: 'From',
      onChange: ev => this.setComponentState('firstDate', { value: ev }),
      dateFormat: 'YYYY/MM/DD',
    },
    lastDate: {
      disabled: false,
      placeholderText: 'To.',
      onChange: ev => this.setComponentState('lastDate', { value: ev }),
      dateFormat: 'YYYY/MM/DD',
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

  toggleInputState(propertyName) {
    this.setState({
      firstInput: {
        ...this.state.firstInput,
        [propertyName]: !this.state.firstInput[propertyName],
      },
      lastInput: {
        ...this.state.firstInput,
        [propertyName]: !this.state.lastInput[propertyName],
      },
      firstDate: {
        ...this.state.firstDate,
        [propertyName]: !this.state.firstDate[propertyName],
      },
      lastDate: {
        ...this.state.lastDate,
        [propertyName]: !this.state.lastDate[propertyName],
      },
    });
  }

  render() {
    return (
      <from className={styles.form}>
        <div className={styles.input}>
          <div className={styles.option}>
            <Label>Range Type</Label>
            <div className={styles.flex}>
              <Dropdown
                selectedId={this.state.rangeType.id}
                options={this.rangeTypes}
                placeholder={'Choose range type'}
                onSelect={value => this.setState({ rangeType: value })}
              />
            </div>
          </div>
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
                size="medium"
                checked={this.state.withLabel}
                onChange={() =>
                  this.setState({ withLabel: !this.state.withLabel })
                }
              />
            </div>
          </div>
          <div className={styles.option}>
            <Label>Placeholders</Label>
            <div className={styles.flex}>
              <div className={styles['left-label']}>
                <Label>Left</Label>
              </div>
              <div>
                <Input
                  size="small"
                  value={this.state.firstInput.placeholder}
                  onChange={e => {
                    this.setComponentState('firstInput', {
                      placeholder: e.target.value,
                    });
                    this.setComponentState('firstDate', {
                      placeholderText: e.target.value,
                    });
                  }}
                />
              </div>
            </div>
          </div>
          <div className={styles.flex}>
            <div className={styles['label-margin']}>
              <Label>Right</Label>
            </div>
            <Input
              size="small"
              value={this.state.lastInput.placeholder}
              onChange={e => {
                this.setComponentState('lastInput', {
                  placeholder: e.target.value,
                });
                this.setComponentState('lastDate', {
                  placeholderText: e.target.value,
                });
              }}
            />
          </div>
          <div className={styles.flex}>
            <div className={styles['label-margin']}>
              <Label>Disabled</Label>
            </div>
            <ToggleSwitch
              size="medium"
              checked={this.state.firstInput.disabled}
              onChange={() => this.toggleInputState('disabled')}
            />
          </div>
          <div className={styles.flex}>
            <div className={styles['label-margin']}>
              <Label>Error</Label>
            </div>
            <ToggleSwitch
              size="medium"
              checked={this.state.firstInput.error}
              onChange={() => this.toggleInputState('error')}
            />
          </div>

          <div className={styles.option}>
            <div className={styles.flex}>
              <div className={styles.paddRight}>
                <Label>Required Field:</Label>
              </div>
              <ToggleSwitch
                size="medium"
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
          <RangeExample
            dataHook={this.props.dataHook}
            {...this.state}
            onChange={this.props.onChange}
          />
        </div>
      </from>
    );
  }
}

export default ExampleStandard;
