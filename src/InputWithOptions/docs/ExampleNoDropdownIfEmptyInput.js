import React from 'react';
import InputWithOptions from 'wix-style-react/InputWithOptions';

const style = {
  display: 'inline-block',
  padding: '0 5px 0',
  width: '200px',
  lineHeight: '22px',
};

const options = [
  { id: '0', value: 'First option' },
  { id: '1', value: 'Second option' },
  { id: '2', value: 'Third option', disabled: true },
  { id: '3', value: 'Fourth option' },
  { id: '4', value: 'Fifth option' },
  {
    id: '5',
    value:
      'Very long option text jldlkasj ldk jsalkdjsal kdjaklsjdlkasj dklasj',
  },
];

class NoDropdownIfEmptyInput extends React.Component {
  state = {
    value: '',
  };

  render() {
    return (
      <InputWithOptions
        showOptionsIfEmptyInput={false}
        options={options}
        value={this.state.value}
        onChange={e => this.setState({ value: e.target.value })}
      />
    );
  }
}

export default () => (
  <div style={style}>
    <NoDropdownIfEmptyInput />
  </div>
);
