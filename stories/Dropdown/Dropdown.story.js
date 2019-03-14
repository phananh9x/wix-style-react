/* eslint-disable no-console */
import React from 'react';
import CodeExample from 'wix-storybook-utils/CodeExample';

import ExampleStandard from './ExampleStandard';
import ExampleStandardRaw from '!raw-loader!./ExampleStandard';

import ExampleControlled from './ExampleControlled';
import ExampleControlledRaw from '!raw-loader!./ExampleControlled';

import ExampleWithCustomValue from './ExampleWithCustomValue';
import ExampleWithCustomValueRaw from '!raw-loader!./ExampleWithCustomValue';

import Dropdown from 'wix-style-react/Dropdown';
import { storySettings } from './storySettings';

const options = [
  { id: 0, value: 'Option 1' },
  { id: 1, value: 'Option 2' },
  { id: 2, value: 'Option 3' },
  { id: 3, value: 'Option 4' },
];

const optionsWithDivider = [
  { id: 0, value: 'Option 1' },
  { id: 1, value: 'Option 2' },
  { id: -99, value: '-' },
  { id: 2, value: 'Option 3' },
  { id: 3, value: 'Option 4' },
];

const optionsWithFooter = [
  { id: 0, value: 'Option 1' },
  { id: 1, value: 'Option 2' },
  { id: 2, value: 'Option 3' },
  { id: 3, value: 'Option 4' },
  {
    id: 'footer',
    overrideStyle: true,
    value: (
      <div
        style={{ height: '240px', padding: '20px', backgroundColor: '#F0F' }}
      >
        This is a footer with a <a href="http://www.wix.com">link</a>.
      </div>
    ),
  },
];

export default {
  category: storySettings.kind,
  storyName: storySettings.storyName,

  component: Dropdown,
  componentPath: '../../src/Dropdown',

  componentProps: {
    dataHook: storySettings.dataHook,
    placeholder: 'This is a placeholder',
    options,
    onSelect: option =>
      console.log(`option selected. ${JSON.stringify(option)}.`),
  },
  exampleProps: {
    // FIXME: The following onSelect callback prop is commented out since it exposes a
    // bug in Dropdown, that the selectedId is not updated. Needs investigation.
    // onSelect: option => console.log(`${option.value} selected`),
    options: [
      { label: 'normal', value: options },
      { label: 'with divider', value: optionsWithDivider },
      { label: 'with footer', value: optionsWithFooter },
    ],
  },
  examples: (
    <div>
      <CodeExample title="Standard" code={ExampleStandardRaw}>
        <ExampleStandard />
      </CodeExample>

      <CodeExample title="Controlled Dropdown" code={ExampleControlledRaw}>
        <ExampleControlled />
      </CodeExample>

      <CodeExample
        title="Custom Values in Dropdown"
        code={ExampleWithCustomValueRaw}
      >
        <ExampleWithCustomValue />
      </CodeExample>
    </div>
  ),
};
