import React, { Component } from 'react';
import PropTypes from 'prop-types';
import reactElementToJSXString from 'react-element-to-jsx-string';

import Range from '..';
import DatePicker from '../../DatePicker';
import Input from '../../Input';
import Label from '../../Label';

export default class Form extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    withLabel: PropTypes.bool,
    label: PropTypes.object,
    firstInput: PropTypes.object,
    lastInput: PropTypes.object,
    firstDate: PropTypes.object,
    lastDate: PropTypes.object,
    required: PropTypes.bool,
    info: PropTypes.string,
    rangeType: PropTypes.object,
    dataHook: PropTypes.string,
  };

  componentDidUpdate(props) {
    props.onChange(reactElementToJSXString(this.getComponent()));
  }

  componentDidMount() {
    this.props.onChange(reactElementToJSXString(this.getComponent()));
  }

  getComponent() {
    return (
      <Range
        dataHook={this.props.dataHook}
        required={this.props.required}
        info={this.props.info}
      >
        {this.props.withLabel ? <Label {...this.props.label} /> : null}
        {this.props.rangeType.value === 'InputRange' ? (
          <Input dataHook="first-item" id="first" {...this.props.firstInput} />
        ) : (
          <DatePicker
            dataHook="first-item"
            placeholderText="From"
            id="fromDate"
            {...this.props.firstDate}
          />
        )}
        {this.props.rangeType.value === 'InputRange' ? (
          <Input dataHook="last-item" id="last" {...this.props.lastInput} />
        ) : (
          <DatePicker
            dataHook="last-item"
            placeholderText="To"
            id="toDate"
            {...this.props.lastDate}
          />
        )}
      </Range>
    );
  }

  render() {
    return this.getComponent();
  }
}
