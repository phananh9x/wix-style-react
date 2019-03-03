import React from 'react';
import {
  description,
  title,
  table,
  importExample,
  columns,
  code as baseCode,
} from 'wix-storybook-utils/Sections';
import LinkTo from '@storybook/addon-links/react';

import { baseScope } from '../utils/Components/LiveCodeExample';
import { storySettings } from './storySettings';
import * as examples from './examples';

export const settings = {
  category: storySettings.indexCategory,
  storyName: `3.3 ${storySettings.storyName}`,
  dataHook: storySettings.dataHook,
};

// TODO: Reuse the code below inside a general "StoryPage" component
const code = config =>
  baseCode({ components: baseScope, compact: true, ...config });

const example = ({ title, text, source }) =>
  columns([description({ title, text }), code({ source })]);

export default {
  category: settings.category,
  storyName: settings.storyName,

  sections: [
    columns([
      description({
        title: 'Description',
        text: `Rich text area allows to enter and edit long and complex descriptions.`,
      }),
    ]),

    columns([
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
              story="RichTextArea"
            >{`<RichTextArea/>`}</LinkTo>,
            'Component that receives rich data',
          ],
        ],
      }),
    ]),

    columns([
      importExample({
        source: examples.importExample,
      }),
    ]),

    title('Examples'),

    ...[
      {
        title: 'Plain Example',
        text: 'Default rich text area setup.',
        source: examples.plainFormFieldComposition,
      },
      {
        title: 'Text Styling',
        text:
          'Rich text area supports two types of bullet point styles, basic text styling and hyperlinks.',
        source: examples.textStylingFormFieldComposition,
      },
    ].map(example),
  ],
};
