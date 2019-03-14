/* eslint-disable no-console */
import React from 'react';
import MultiSelect from 'wix-style-react/MultiSelect';

const countries = [
  { name: 'Alabama', code: 'AL' },
  { name: 'Alaska', code: 'AK' },
  { name: 'Arizona', code: 'AZ' },
  { name: 'Arkansas', code: 'AR' },
  { name: 'California', code: 'CA' },
  { name: 'North Carolina', code: 'NC' },
  { name: 'Colorado', code: 'CO' },
  { name: 'Connecticut', code: 'CT' },
  { name: 'Delaware', code: 'DL' },
  { name: 'Florida', code: 'FL' },
  { name: 'Georgia', code: 'GA' },
  { name: 'Hawaii', code: 'HI' },
  { name: 'Idaho', code: 'IL' },
  { name: 'Illinois', code: 'IN' },
  { name: 'Indiana', code: 'IA' },
];

const options = countries.map(country => ({
  ...country,
  value: country.name, // This can be any ReactNode
  id: country.code,
}));

class CountryInput extends React.Component {
  constructor(props) {
    super(props);

    this.nextTagId = 0;
    this.state = {
      tags: [],
      inputValue: '',
    };

    this.handleOnSelect = this.handleOnSelect.bind(this);
    this.handleOnManuallyInput = this.handleOnManuallyInput.bind(this);
    this.handleOnRemoveTag = this.handleOnRemoveTag.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
    this.predicate = this.predicate.bind(this);
  }

  createTag({ countryName, countryCode }) {
    return {
      id: countryCode || String(this.nextTagId++), // When tag ids correspond to option ids, then MultiSelect will show only unselected options.
      label: `${countryName} (${countryCode || '?'})`,
    };
  }

  handleOnSelect(option) {
    console.log('onSelect(option): option=', option);
    const newTag = this.createTag({
      countryName: option.name,
      countryCode: option.code,
    });

    this.setState({ tags: [...this.state.tags, newTag] });
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
    const tags = values.map(value =>
      this.createTag({
        countryName: value,
      }),
    );
    this.setState({ tags: [...this.state.tags, ...tags] });
  }

  predicate(option) {
    return `${option.name} + ${option.emial}`
      .toLowerCase()
      .includes(this.state.inputValue.toLowerCase());
  }

  render() {
    return (
      <MultiSelect
        dataHook="multi-select-tag-input-selection"
        value={this.state.inputValue}
        onChange={this.handleOnChange}
        options={options}
        tags={this.state.tags}
        onManuallyInput={this.handleOnManuallyInput}
        onSelect={this.handleOnSelect}
        onRemoveTag={this.handleOnRemoveTag}
        predicate={this.predicate}
        upgrade
      />
    );
  }
}

export default CountryInput;
