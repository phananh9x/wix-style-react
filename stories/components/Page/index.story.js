import React from 'react';
import Page from 'wix-style-react/Page';
import { storySettings } from './storySettings';

import {
  api,
  tab,
  playground,
  testkit,
  title,
  description,
} from 'wix-storybook-utils/Sections';
import { codeExampleFullWidth } from '../../utils/sections';
import UXStorySections from '../../utils/UXStorySections';

import { header, tail, fixedContent, content } from './PageChildren';
import './PageStory.scss';

import PageDescriptionRaw from '!raw-loader!./Description.md';
import ChildrenRaw from '!raw-loader!./Children.md';
import ExampleStretchGridRaw from '!raw-loader!./ExampleStretchGrid';
import ExampleStickyTableWithGapRaw from '!raw-loader!./ExampleStickyTableWithGap';

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,
  name: 'Page',
  component: Page,
  componentWrapper: ({ component }) => (
    <div style={{ position: 'relative' }}>{component}</div>
  ),
  componentPath: '../../../src/Page/Page.js',

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
        ...UXStorySections({
          description: PageDescriptionRaw,
          includedComponents: [
            { name: 'Page.Header', description: '`<Page/>` component’s child' },
          ],
          importExample: `import Page from 'wix-style-react/Page';`,
        }),
        title('Examples'),
        ...codeExampleFullWidth({
          title: 'Stretch Content Vertically',
          description: `Use Grid's <Container stretchVertically> to fill the viewport's height`,
          code: ExampleStretchGridRaw,
          codeConfig: { autoRender: false },
        }),
        ...codeExampleFullWidth({
          title: 'Multiple Tables With Sticky Headers',
          description: `Use <Page.Sticky/> to wrap the Table's header`,
          code: ExampleStickyTableWithGapRaw,
          codeConfig: { autoRender: false },
        }),
      ],
    }),
    ...[
      { title: 'Playground', sections: [playground()] },
      {
        title: 'API',
        sections: [
          api(),
          description({ title: 'Children', text: ChildrenRaw }),
        ],
      },
      { title: 'Testkit', sections: [testkit()] },
    ].map(tab),
  ],
};
