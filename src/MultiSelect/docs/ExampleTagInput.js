/* eslint-disable no-console */
import React from 'react';
import MultiSelect from 'wix-style-react/MultiSelect';

class ExampleTagInput extends React.Component {
  constructor(props) {
    super(props);

    this.nextId = 0;
    this.state = {
      tags: [],
      inputValue: '',
    };

    this.handleOnManuallyInput = this.handleOnManuallyInput.bind(this);
    this.handleOnRemoveTag = this.handleOnRemoveTag.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnRemoveTag(tagId) {
    console.log(`onRemoveTag(tagId): tagId=${tagId})`);
    this.setState({
      tags: this.state.tags.filter(currTag => currTag.id !== tagId),
    });
  }

  handleOnChange(event) {
    console.log(`onChange('${event.target.value}')`);
    this.setState({ inputValue: event.target.value });
  }

  handleOnManuallyInput(values) {
    console.log(`onManuallyInput(values): values=${values}`);
    const tags = values.map(value => {
      const tag = { id: String(this.nextId++), label: value };
      return tag;
    });
    this.setState({ tags: [...this.state.tags, ...tags] });
  }

  render() {
    return (
      <MultiSelect
        dataHook="multi-select-tags-input"
        value={this.state.inputValue}
        onChange={this.handleOnChange}
        tags={this.state.tags}
        onManuallyInput={this.handleOnManuallyInput}
        onRemoveTag={this.handleOnRemoveTag}
        upgrade
      />
    );
  }
}

export default ExampleTagInput;
