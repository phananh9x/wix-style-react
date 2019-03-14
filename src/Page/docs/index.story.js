import React from 'react';

import {
  api,
  tab,
  playground,
  testkit,
  title,
  columns,
  table,
  code as baseCode,
  description,
  importExample,
} from 'wix-storybook-utils/Sections';

import Page from '..';
import { storySettings } from './storySettings';
import { sterilizeCode } from '../../../stories/utils/sterilizeCodeForLive';
import { baseScope } from '../../../stories/utils/LiveCodeExample';
import LinkTo from '@storybook/addon-links/react';

import { header, tail, fixedContent, content } from './PageChildren';
import './PageStory.scss';

import PageReadme from './Description.md';
import ChildrenReadme from './Children.md';

import ExampleStretchGridRaw from '!raw-loader!./ExampleStretchGrid';
import ExampleStickyTableWithGapRaw from '!raw-loader!./ExampleStickyTableWithGap';

const code = config =>
  baseCode({ components: baseScope, compact: true, ...config });

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,
  name: 'Page',
  component: Page,
  componentWrapper: ({ component }) => (
    <div style={{ position: 'relative' }}>{component}</div>
  ),
  componentPath: '../Page.js',

  componentProps: {
    children: [header(), tail, content(false)],
    dataHook: 'story-page-playground',
    gradientClassName: 'background-gradient',
    gradientCoverTail: false,
    upgrade: true,
  },

  exampleProps: {
    children: [
      {
        label: 'header, tail & content',
        value: [header(), tail, content()],
      },
      {
        label: 'header & content',
        value: [header(), content()],
      },
      {
        label: 'just content',
        value: [content()],
      },
      {
        label: 'header, tail, fixed-content & content',
        value: [header(), tail, fixedContent, content()],
      },
    ],
    backgroundImageUrl: [
      {
        label: 'https://some-host.com/image-path.jpg',
        value:
          'https://static.wixstatic.com/media/f0548921c53940ec803dfb1c203e96fe.jpg/v1/fill/w_400,h_100/f0548921c53940ec803dfb1c203e96fe.jpg',
      },
    ],
  },

  sections: [
    tab({
      title: 'Usage',
      sections: [
        columns([description(PageReadme)]),

        columns([
          table({
            title: 'Included Components',
            rows: [
              [
                <LinkTo
                  kind="Components"
                  story="PageHeader"
                  children="Page.Header"
                />,
                '`<Page/>` component’s child',
              ],
            ],
          }),
        ]),

        columns([
          importExample({ source: `import Page from 'wix-style-react/Page';` }),
        ]),

        title('Examples'),

        code({
          title: 'Stretch Content Vertically',
          description: `Use Grid's <Container stretchVertically> to fill the viewport's height`,
          source: sterilizeCode(ExampleStretchGridRaw),
          compact: true,
          autoRender: false,
        }),

        code({
          title: 'Multiple Tables With Sticky Headers',
          description: `Use <Page.Sticky/> to wrap the Table's header`,
          source: sterilizeCode(ExampleStickyTableWithGapRaw),
          compact: true,
          autoRender: false,
        }),
      ],
    }),

    ...[
      { title: 'Playground', sections: [playground()] },
      {
        title: 'API',
        sections: [
          api(),
          description({ title: 'Children', text: ChildrenReadme }),
        ],
      },
      { title: 'Testkit', sections: [testkit()] },
    ].map(tab),
  ],
};
