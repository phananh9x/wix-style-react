import React, { Component } from 'react';
import DropdownLayout from 'wix-style-react/DropdownLayout';

const options = [
  { id: 1, value: 'Option 1' },
  { id: 2, value: 'Option 2' },
  { id: 3, value: 'Option 3' },
  { id: 4, value: 'Option 4' },
];

const containerStyles = {
  width: 300,
  display: 'inline-block',
  lineHeight: '22px',
  margin: 10,
  border: '1px solid rgba(0, 0, 0, 0.6)',
  borderRadius: 6,
  overflow: 'auto',
  boxShadow: '0 0 6px rgba(0, 0, 0, 0.6)',
  padding: '6px 0',
};

class ControlledExample extends Component {
  render() {
    return (
      <div style={containerStyles}>
        <DropdownLayout visible options={options} inContainer selectedId={2} />
      </div>
    );
  }
}

export default () => <ControlledExample />;
