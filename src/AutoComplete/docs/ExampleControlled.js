import React from 'react';
import AutoComplete from 'wix-style-react/AutoComplete';

const style = {
  display: 'inline-block',
  padding: '0 5px 0',
  width: '200px',
  lineHeight: '22px',
};

const options = [
  { id: 0, value: 'First option' },
  { id: 1, value: 'Second option' },
  { id: 2, value: 'Third option' },
  { id: 3, value: 'Fifth option' },
  { id: 4, value: 'Fourth option' },
];

class ControlledAutoComplete extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };
    this.onSelect = this.onSelect.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onSelect(option) {
    this.setState({ value: option.value });
  }

  onChange(event) {
    this.setState({ value: event.target.value });
  }

  render() {
    return (
      <AutoComplete
        dataHook="story-autocomplete"
        options={options}
        value={this.state.value}
        onChange={this.onChange}
        onSelect={this.onSelect}
        placeholder={'Start typing'}
        predicate={option =>
          option.value.toLowerCase().indexOf(this.state.value.toLowerCase()) !==
          -1
        }
      />
    );
  }
}

export default () => (
  <div style={style}>
    <ControlledAutoComplete />
  </div>
);
