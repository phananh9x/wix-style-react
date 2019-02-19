import React from 'react';
import { storySettings } from './storySettings';
import {
  tab,
  description,
  playground,
  api,
  testkit,
  code,
} from 'wix-storybook-utils/Sections';

import Thumbnail from 'wix-style-react/Thumbnail';
import { Layout, Cell } from 'wix-style-react/Layout';
import LiveCodeExample from '../utils/Components/LiveCodeExample';

import * as examples from './examples';
import exampleControlled from '!raw-loader!./exampleControlled';
import thumbnailReadme from '!raw-loader!../../src/Thumbnail/README.md';

const sizes = [{ value: 100, label: '100' }, { value: 300, label: '300' }];

export default {
  category: storySettings.kind,
  storyName: storySettings.storyName,

  component: Thumbnail,
  componentPath: '../../src/Thumbnail/Thumbnail.js',

  componentProps: (setState, getState) => ({
    dataHook: storySettings.dataHook,
    title: 'I am a Thumbnail',
    description: 'And I can do this and that',
    image: examples.image,
    size: 'medium',
    backgroundImage: false,
    hideSelectedIcon: false,
    onClick: () => setState({ selected: !getState().selected }),
  }),

  exampleProps: {
    onClick: () => 'Thumbnail Clicked',
    size: [
      { label: 'Medium', value: 'medium' },
      { label: 'Small', value: 'small' },
      { label: 'Tiny', value: 'tiny' },
    ],
    backgroundImage: [
      {
        label: 'On',
        value: examples.getImageUrl(500, 500),
      },
      { label: 'Off', value: false },
    ],
    image: [
      {
        label: '64x64 image as URL',
        value: examples.getImageUrl(64, 64),
      },
      {
        label: '300x200 image as <img/> component',
        value: examples.image,
      },
    ],
    width: sizes,
    height: sizes,
  },

  sections: [
    tab({
      title: 'Description',
      sections: [
        description({
          text: thumbnailReadme,
        }),

        ...[
          {
            title: 'Thumbnail with title',
            source: examples.exampleDefault,
          },
          {
            title: 'Thumbnail with image',
            source: examples.selectedWithImage,
          },
          {
            title: 'Thumbnail with background image',
            source: examples.selectedWithBackgroundImage,
          },
          {
            title: 'List of small thumbnails',
            source: examples.listOfSmall,
          },
        ].map(({ source, title }) =>
          code({
            source,
            title,
            components: { Thumbnail, Layout, Cell },
          }),
        ),

        description({
          title: 'Controlled Thumbnail',
          text: (
            <LiveCodeExample
              initialCode={exampleControlled}
              autoRender={false}
            />
          ),
        }),
      ],
    }),

    tab({
      title: 'Playground',
      sections: [playground()],
    }),

    tab({
      title: 'API',
      sections: [api()],
    }),

    tab({
      title: 'Testkit',
      sections: [testkit()],
    }),
  ],
};
