import React, { Component } from 'react';
import PropTypes from 'prop-types';
import reactElementToJSXString from 'react-element-to-jsx-string';

import AutoCompleteComposite from '..';
import AutoComplete from '../../AutoComplete';
import Label from '../../Label';

export default class Form extends Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    withLabel: PropTypes.bool,
    label: PropTypes.object,
    autoComplete: PropTypes.object,
  };

  componentDidUpdate(props) {
    props.onChange(reactElementToJSXString(this.getComponent()));
  }

  componentDidMount() {
    this.props.onChange(reactElementToJSXString(this.getComponent()));
  }

  getComponent() {
    return (
      <AutoCompleteComposite>
        {this.props.withLabel ? (
          <Label for="firstName" {...this.props.label} />
        ) : null}
        <AutoComplete id="firstName" {...this.props.autoComplete} />
      </AutoCompleteComposite>
    );
  }

  render() {
    return this.getComponent();
  }
}
