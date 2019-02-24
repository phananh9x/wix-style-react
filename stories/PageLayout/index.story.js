import { storySettings } from './storySettings';
import { baseScope } from '../utils/Components/LiveCodeExample';
import {
  description,
  columns,
  code as baseCode,
} from 'wix-storybook-utils/Sections';
import * as examples from './examples';
import UXStorySections from '../UXStorySections';
import { sterilizeCode } from './sterilizeCodeForLive';

import ExampleGeneralLayoutRaw from '!raw-loader!./ExampleGeneralLayout';
import ExampleSplitLayoutRaw from '!raw-loader!./ExampleSplitLayout';
import ExampleGalleryLayoutRaw from '!raw-loader!./ExampleGalleryLayout';
import ExampleEmptyStateRaw from '!raw-loader!./ExampleEmptyState';

const code = config =>
  baseCode({ components: baseScope, compact: true, ...config });

const halfWidthSection = desc =>
  columns({
    items: [desc, description({})],
  });

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,

  sections: [
    ...UXStorySections({
      description: `Compositions from multiple components that help to setup a page.`,
      includedComponents: [
        { name: 'Page', description: 'Business Manager’s root component' },
        { name: 'Page.Header', description: '`<Page/>` component’s child' },
        { name: 'Grid', description: 'Component that constructs a grid' },
        { name: 'Card', description: 'Light card component' },
        {
          name: 'EmptyState',
          description: 'Component that render Empty state layout',
        },
      ],
      importExample: examples.importExample,
    }),
    description({ text: '## Examples' }),
    halfWidthSection(
      description({
        pretitle: '2.1.A',
        title: 'General Layout',
        description: 'A classic layout for forms and lists',
      }),
    ),
    code({
      source: sterilizeCode(ExampleGeneralLayoutRaw),
    }),
    halfWidthSection(
      description({
        pretitle: '2.1.B',
        title: 'Split Layout',
        description: 'A Layout for forms item previews',
      }),
    ),
    code({
      source: sterilizeCode(ExampleSplitLayoutRaw),
    }),
    halfWidthSection(
      description({
        pretitle: '2.1.C',
        title: 'Gallery Layout',
        description: 'Best for product category lists',
      }),
    ),
    code({
      source: sterilizeCode(ExampleGalleryLayoutRaw),
    }),
    halfWidthSection(
      description({
        pretitle: '2.1.D',
        title: 'Empty State',
        description: 'Best for initial call to action',
      }),
    ),
    code({
      source: sterilizeCode(ExampleEmptyStateRaw),
    }),
  ],
};
