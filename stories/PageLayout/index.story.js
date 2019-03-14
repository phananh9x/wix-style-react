import React from 'react';
import LinkTo from '@storybook/addon-links/react';
import {
  title,
  description,
  columns,
  table,
  importExample,
  code as baseCode,
} from 'wix-storybook-utils/Sections';

import { storySettings } from './storySettings';
import { baseScope } from '../utils/LiveCodeExample';

import * as examples from './examples';
import { sterilizeCode } from '../utils/sterilizeCodeForLive';

import ExampleGeneralLayoutRaw from '!raw-loader!./ExampleGeneralLayout';
import ExampleSplitLayoutRaw from '!raw-loader!./ExampleSplitLayout';
import ExampleGalleryLayoutRaw from '!raw-loader!./ExampleGalleryLayout';
import ExampleEmptyStateRaw from '!raw-loader!./ExampleEmptyState';

const code = config =>
  baseCode({ components: baseScope, compact: true, ...config });

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,

  sections: [
    description({
      title: 'Description',
      text: `Compositions from multiple components that help to setup a page.`,
    }),

    columns([
      table({
        title: 'Included Components',
        rows: [
          ['Page', 'Business Manager’s root component'],
          ['Page.Header', '`<Page/>` component’s child'],
          ['Grid', 'Component that constructs a grid'],
          ['Card', 'Light card component'],
          ['EmptyState', 'Component that render Empty state layout'],
        ].map(([story, text]) => [
          <LinkTo kind="Components" story={story} children={`<${story} />`} />,
          text,
        ]),
      }),
    ]),

    columns([importExample({ source: examples.importExample })]),

    title('Examples'),

    ...[
      {
        pretitle: '2.1.A',
        title: 'General Layout',
        description: 'A classic layout for forms and lists',
        source: sterilizeCode(ExampleGeneralLayoutRaw),
      },

      {
        pretitle: '2.1.B',
        title: 'Split Layout',
        description: 'A Layout for forms item previews',
        source: sterilizeCode(ExampleSplitLayoutRaw),
      },

      {
        pretitle: '2.1.C',
        title: 'Gallery Layout',
        description: 'Best for product category lists',
        source: sterilizeCode(ExampleGalleryLayoutRaw),
      },

      {
        pretitle: '2.1.D',
        title: 'Empty State',
        description: 'Best for initial call to action',
        source: sterilizeCode(ExampleEmptyStateRaw),
      },
    ].map(code),
  ],
};
