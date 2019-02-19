import React from 'react';
import { storySettings } from './storySettings';
import { baseScope } from '../utils/Components/LiveCodeExample';
import {
  description,
  table,
  importExample,
  columns,
  code as baseCode,
} from 'wix-storybook-utils/Sections';
import LinkTo from '@storybook/addon-links/react';
import * as examples from './examples';

const code = config =>
  baseCode({ components: baseScope, compact: true, ...config });

const example = ({ title, text, source }) =>
  columns({
    items: [description({ title, text }), code({ source })],
  });

export default {
  category: storySettings.kind,
  storyName: storySettings.storyName,

  sections: [
    description({
      text: `
Text Input is a composition of 2 individual components – &lt;FormField/&gt; and &lt;Input /&gt;.

This composition is used to build various forms.`,
    }),

    table({
      title: 'Included Components',
      rows: [
        [
          <LinkTo kind="Components" story="FormField">{`<FormField/>`}</LinkTo>,
          'Layout component for form elements',
        ],
        [
          <LinkTo kind="Components" story="Input">{`<Input/>`}</LinkTo>,
          'Component that receives data',
        ],
      ],
    }),

    importExample({
      source: examples.importExample,
    }),

    description({ text: '## Examples' }),

    ...[
      {
        title: 'Size',
        text: 'Text Input supports 3 sizes',
        source: examples.sizes,
      },

      {
        title: 'Affix',
        text: 'Text Input has additional container in prefix and suffix area',
        source: examples.affix,
      },

      {
        title: 'Char limit',
        text: 'It is allowed to set maximum number of characters',
        source: examples.charLimit,
      },

      {
        title: 'Required Info',
        text: 'You can add an asterisk if the field is required',
        source: examples.required,
      },

      {
        title: 'Position',
        text:
          'Text Input’s label can be position on top, left or can be hidden. Additional properties behave accordingly.',
        source: examples.position,
      },
    ].map(example),
  ],
};
