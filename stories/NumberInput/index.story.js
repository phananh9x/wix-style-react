import React from 'react';
import { storySettings } from './storySettings';
import { baseScope } from '../utils/LiveCodeExample';
import {
  header,
  description,
  table,
  importExample,
  columns,
  code as baseCode,
} from 'wix-storybook-utils/Sections';
import LinkTo from '@storybook/addon-links/react';
import * as examples from './examples';

import NumberInput from 'wix-style-react/NumberInput';
import FormField from 'wix-style-react/FormField';

const code = config =>
  baseCode({ components: baseScope, compact: true, ...config });

const example = ({ title, text, source }) =>
  columns({
    items: [description({ title, text }), code({ source })],
  });

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,

  sections: [
    header({
      component: (
        <div style={{ width: '50%' }}>
          <FormField label="Number Input">
            <NumberInput />
          </FormField>
        </div>
      ),

      issueUrl: 'https://github.com/wix/wix-style-react/issues/new',
      sourceUrl:
        'https://github.com/wix/wix-style-react/blob/master/src/NumberInput',
    }),

    columns({
      items: [
        description({
          title: 'Description',
          text: `Number Input is a composition of 2 individual components – &lt;FormField/&gt; and &lt;NumberInput /&gt;. This composition is used to build various forms.`,
        }),
      ],
    }),

    columns({
      items: [
        table({
          title: 'Included Components',
          rows: [
            [
              <LinkTo
                kind="Components"
                story="FormField"
              >{`<FormField/>`}</LinkTo>,
              'Layout component for form elements',
            ],
            [
              <LinkTo
                kind="Components"
                story="NumberInput"
              >{`<NumberInput/>`}</LinkTo>,
              'Component that receives data',
            ],
          ],
        }),
      ],
    }),

    columns({
      items: [
        importExample({
          source: examples.importExample,
        }),
      ],
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
        title: 'Required Info',
        text: 'You can add an asterisk if the field is required',
        source: examples.required,
      },

      {
        title: 'Label Position',
        text:
          'Text Input’s label can be position on top, left or can be hidden. Additional properties behave accordingly.',
        source: examples.position,
      },
    ].map(example),
  ],
};
