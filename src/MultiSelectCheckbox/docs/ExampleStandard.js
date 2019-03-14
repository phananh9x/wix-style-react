import React from 'react';
import MultiSelectCheckbox from 'wix-style-react/MultiSelectCheckbox';
import styles from './ExampleStandard.scss';
import Facebook from 'wix-style-react/new-icons/Facebook';

export const options = [
  { value: 'Alabama', id: 'Alabama' },
  { value: 'Alaska', id: 'Alaska' },
  {
    value: (
      <div>
        <Facebook />
        Arizona
      </div>
    ),
    id: 'Arizona',
    label: 'Arizona Label',
  },
  { value: 'Arkansas', id: 'Arkansas' },
  { value: 'California', id: 'California' },
  { value: 'California2', id: 'California2', disabled: true },
  { value: 'California3', id: 'California3' },
  { value: 'California4', id: 'California4' },
  { value: 'California5', id: 'California5' },
  { value: 'California6', id: 'California6' },
  { value: 'California7', id: 'California7' },
  { value: 'Two words', id: 'Two words' },
];

export const valueParser = option =>
  option.label ? option.label : option.value;

class ExampleStandard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedOptions: ['Alabama', 'California'],
      options,
    };
  }

  handleOnSelect = selectedOption => {
    this.setState({
      selectedOptions: [...this.state.selectedOptions, selectedOption],
    });
  };

  handleOnDeselect = selectedOption => {
    this.setState({
      selectedOptions: this.state.selectedOptions.filter(
        val => val !== selectedOption,
      ),
    });
  };

  render() {
    return (
      <div className={styles.main}>
        <MultiSelectCheckbox
          options={this.state.options}
          selectedOptions={this.state.selectedOptions}
          onSelect={this.handleOnSelect}
          onDeselect={this.handleOnDeselect}
          valueParser={valueParser}
        />
      </div>
    );
  }
}

export default ExampleStandard;
