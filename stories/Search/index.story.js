import React from 'react';
import Search from 'wix-style-react/Search';
import { Predicate, Expandable } from './examples';

const createOption = (value, id = 0) => ({ id, value });

const options = [
  'The quick',
  'brown',
  'fox',
  'jumps over',
  'the lazy',
  'dog',
  'Option1',
  'Option2',
  'Option3',
  'Option4',
  'Option5',
  'last Option',
].map(createOption);

const settings = {
  category: '3. Inputs',
  storyName: '3.9 Search',
  dataHook: 'storybook-search',
  options,
};

export default {
  category: settings.category,
  storyName: settings.storyName,
  component: Search,
  componentPath: '../../src/Search',

  componentProps: setState => ({
    dataHook: settings.dataHook,
    value: '',
    options: settings.options,
    showOptionsIfEmptyInput: false,
    closeOnSelect: false,

    onChange: e => setState({ value: e.target.value }),

    onSelect: option => setState({ value: option.value }),
  }),

  exampleProps: {
    onSelect: option => option.value,
    onChange: e => e.target.value,
    options: [
      { label: 'One option', value: [createOption('Just me :)')] },
      { label: `${options.length} options`, value: options },
    ],
  },

  examples: (
    <div>
      <Expandable />
      <Predicate />
    </div>
  ),
};
