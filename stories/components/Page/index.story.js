import React from 'react';
import CodeExample from 'wix-storybook-utils/CodeExample';
import Page from 'wix-style-react/Page';
import { storySettings } from './storySettings';

import { header, tail, fixedContent, content } from './PageChildren';
import './PageStory.scss';

import ExampleEmptyState from './ExampleEmptyState';
import ExampleEmptyStateRaw from '!raw-loader!./ExampleEmptyState';

const examplePageContainerStyles = {
  height: 500,
  display: 'flex',
  flexFlow: 'column',
  minHeight: 0,
};

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,
  name: 'Page',
  component: Page,
  componentWrapper: ({ component }) => (
    <div style={{ position: 'relative' }}>{component}</div>
  ),
  componentPath: '../../../src/Page/Page.deprecated.js',

  componentProps: {
    children: [header(), tail, content(false)],
    dataHook: 'story-page-playground',
    gradientClassName: 'background-gradient',
    gradientCoverTail: true,
    backgroundImageUrl:
      'https://static.wixstatic.com/media/f0548921c53940ec803dfb1c203e96fe.jpg/v1/fill/w_400,h_100/f0548921c53940ec803dfb1c203e96fe.jpg',
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

  examples: (
    <CodeExample title="Page with and EmptyState" code={ExampleEmptyStateRaw}>
      <div
        data-hook="story-page-empty-state"
        style={examplePageContainerStyles}
      >
        <ExampleEmptyState />
      </div>
    </CodeExample>
  ),
};
