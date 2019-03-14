import React, { Component } from 'react';

import FormField from 'wix-style-react/FormField';
import Checkbox from 'wix-style-react/Checkbox';

export default class Form extends Component {
  state = {
    value: false,
  };

  render() {
    return (
      <div>
        <FormField
          dataHook="storybook-checkbox-formfield"
          id="formfieldCheckboxId"
          infoContent="I help you to fill info"
          label="Checkbox"
          labelPlacement="right"
          stretchContent={false}
          required
        >
          <Checkbox
            id="formfieldCheckboxId"
            checked={this.state.value}
            onChange={e => this.setState({ value: e.target.checked })}
          />
        </FormField>
      </div>
    );
  }
}
