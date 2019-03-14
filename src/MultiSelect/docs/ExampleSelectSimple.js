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

class CountrySelection extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      tags: [],
      options,
    };

    this.handleOnSelect = this.handleOnSelect.bind(this);
    this.handleOnRemoveTag = this.handleOnRemoveTag.bind(this);
  }

  createTag({ countryName, countryCode }) {
    return {
      id: countryCode, // When tag ids correspond to option ids, then MultiSelect will show only unselected options.
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
    this.setState({
      tags: this.state.tags.filter(currTag => currTag.id !== tagId),
    });
  }

  render() {
    return (
      <MultiSelect
        mode="select"
        tags={this.state.tags}
        onSelect={this.handleOnSelect}
        onRemoveTag={this.handleOnRemoveTag}
        options={this.state.options}
        upgrade
      />
    );
  }
}

export default CountrySelection;
