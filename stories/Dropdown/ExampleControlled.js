/* eslint-disable no-console */
import React from 'react';
import Dropdown from 'wix-style-react/Dropdown';

const style = {
  display: 'inline-block',
  padding: '0 5px 0',
  width: '200px',
  lineHeight: '22px',
  marginBottom: '160px',
};

const options = [
  { id: 1, value: 'Option 1' },
  { id: 2, value: 'Option 2' },
  { id: 3, value: 'Option 3' },
  { id: 4, value: 'Option 4', disabled: true },
  { id: 5, value: 'Option 5' },
];

class ControlledDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.onSelect = this.onSelect.bind(this);
    this.state = {
      selectedId: 1,
    };
  }

  onSelect(option) {
    if (confirm(`Confirm selection of ${option.value}`)) {
      this.setState({ selectedId: option.id });
    }
  }

  render() {
    return (
      <Dropdown
        dataHook="story-dropdown-controlled"
        options={options}
        onSelect={this.onSelect}
        placeholder={'Choose an option'}
        selectedId={this.state.selectedId}
      />
    );
  }
}

export default () => (
  <div style={style}>
    <ControlledDropdown />
  </div>
);
