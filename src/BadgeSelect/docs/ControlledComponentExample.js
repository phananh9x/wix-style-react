import React from 'react';
import BadgeSelect from 'wix-style-react/BadgeSelect';

const options = [
  {
    id: '0',
    skin: 'success',
    text: 'success',
  },
  {
    id: '1',
    skin: 'danger',
    text: 'danger',
  },
];

export default class ControlledComponent extends React.Component {
  state = {
    selectedId: 0,
  };

  handleSelect = selectedOption => {
    if (confirm('are you sure you want to pick this option?')) {
      this.setState({ selectedId: selectedOption.id });
    }
  };

  render() {
    return (
      <BadgeSelect
        selectedId={this.state.selectedId}
        onSelect={this.handleSelect}
        options={options}
      />
    );
  }
}
