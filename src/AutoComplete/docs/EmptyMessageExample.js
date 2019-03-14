/* eslint-disable */

class ControlledAutoComplete extends React.Component {
  constructor(props) {
    super(props);
    this.options = [
      { id: 0, value: 'First option' },
      { id: 1, value: 'Second option' },
      { id: 2, value: 'Third option' },
      { id: 3, value: 'Fifth option' },
      { id: 4, value: 'Fourth option' },
    ];
    
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
        options={this.options}
        value={this.state.value}
        onChange={this.onChange}
        onSelect={this.onSelect}
        predicate={option => option.value.toLowerCase().indexOf(this.state.value.toLowerCase()) !== -1}
        emptyStateMessage={`Couldn't find: ${this.state.value}`}
      />
    );
  }
}
