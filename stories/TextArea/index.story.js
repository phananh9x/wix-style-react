import React from 'react';
import { storySettings } from './storySettings';
import { baseScope } from '../utils/Components/LiveCodeExample';
import {
  description,
  table,
  importExample,
  columns,
  liveCode as baseCode,
} from 'wix-storybook-utils/Sections';
import LinkTo from '@storybook/addon-links/react';
import * as examples from './examples';

const liveCode = config =>
  baseCode({
    components: { ...baseScope },
    ...config,
  });

export default {
  category: storySettings.kind,
  storyName: storySettings.storyName,

  sections: [
    columns({
      items: [
        description({
          text: 'A text area can be used to allow for extended user input.',
        }),
        description(),
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
                story="InputArea"
              >{`<InputArea/>`}</LinkTo>,
              'Component that receives data',
            ],
          ],
        }),
        description(),
      ],
    }),

    columns({
      items: [importExample({ source: examples.importExample }), description()],
    }),

    description({
      text: '## Examples',
    }),

    columns({
      items: [
        description({
          title: 'Plain Example',
          text: 'The most basic example.',
        }),
        liveCode({ compact: true, source: examples.basicExample }),
      ],
    }),

    columns({
      items: [
        description({
          title: 'No Label',
          text: 'Can be used without a label.',
        }),
        liveCode({ compact: true, source: examples.withoutALabelExample }),
      ],
    }),

    columns({
      items: [
        description({
          title: 'Resizable Height',
          text: 'The text area can changes its size by user drag.',
        }),
        liveCode({ compact: true, source: examples.resizableHeightExample }),
      ],
    }),
  ],
};
