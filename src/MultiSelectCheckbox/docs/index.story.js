import React from 'react';
import CodeExample from 'wix-storybook-utils/CodeExample';

import ExampleStandard from './ExampleStandard';
import ExampleStandardRaw from '!raw-loader!./ExampleStandard';
import MultiSelectCheckbox from '..';

const options = [
  { value: 'Alabama', id: 'Alabama' },
  { value: 'Alaska', id: 'Alaska' },
  { value: 'Arkansas', id: 'Arkansas' },
  { value: 'California', id: 'California' },
  { value: 'California2', id: 'California2' },
  { value: 'California3', id: 'California3' },
  { value: 'California4', id: 'California4' },
  { value: 'California5', id: 'California5' },
  { value: 'California6', id: 'California6' },
  { value: 'California7', id: 'California7' },
  { value: 'Two words', id: 'Two words' },
];

export default {
  category: '4. Selection',
  storyName: '4.1 + MultiSelectCheckbox',
  component: MultiSelectCheckbox,
  componentPath: '..',

  componentProps: (setState, getState) => ({
    options,
    selectedOptions: [],
    onDeselect: selectedOption => {
      setState({
        selectedOptions: getState().selectedOptions.filter(
          val => val !== selectedOption,
        ),
      });
    },
    onSelect: selectedOption => {
      setState({
        selectedOptions: [...getState().selectedOptions, selectedOption],
      });
    },
    dataHook: 'multi-select-checkbox',
  }),

  exampleProps: {
    options: [
      { label: 'One option', value: [{ id: 0, value: 'Just me here' }] },
      { label: `${options.length} options`, value: options },
    ],
  },

  examples: (
    <CodeExample title="Standard" code={ExampleStandardRaw}>
      <ExampleStandard />
    </CodeExample>
  ),
};
