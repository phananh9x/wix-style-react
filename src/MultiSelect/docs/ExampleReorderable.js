/* eslint-disable no-console */
import React from 'react';
import MultiSelect from 'wix-style-react/MultiSelect';

const options = [
  { id: '1', name: 'One', value: 'One' },
  { id: '2', name: 'Two', value: 'Two' },
  { id: '3', name: 'Three', value: 'Three' },
];

class ExampleReorderable extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [],
      options,
      inputValue: '',
    };

    this.handleOnSelect = this.handleOnSelect.bind(this);
    this.handleOnRemoveTag = this.handleOnRemoveTag.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  handleOnSelect(option) {
    const newTag = {
      id: option.id,
      label: <span>{option.name}</span>,
    };
    this.setState({ tags: [...this.state.tags, newTag] });
  }

  handleOnRemoveTag(tagId) {
    this.setState({
      tags: this.state.tags.filter(currTag => currTag.id !== tagId),
    });
  }

  handleOnChange(event) {
    this.setState({ inputValue: event.target.value });
  }

  render() {
    const { tags } = this.state;
    return (
      <MultiSelect
        mode="select"
        dataHook="multi-select-reorderable"
        tags={this.state.tags}
        onSelect={this.handleOnSelect}
        onRemoveTag={this.handleOnRemoveTag}
        onReorder={({ addedIndex, removedIndex }) => {
          const nextTags = tags.slice();
          nextTags.splice(addedIndex, 0, ...nextTags.splice(removedIndex, 1));
          this.setState({
            tags: nextTags,
          });
        }}
        value={this.state.inputValue}
        onChange={this.handleOnChange}
        options={options}
        upgrade
      />
    );
  }
}

export default ExampleReorderable;
