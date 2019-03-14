/* eslint-disable no-console */
import React from 'react';
import CodeExample from 'wix-storybook-utils/CodeExample';

import ExampleBasic from './ExampleBasic';
import ExampleBasicRaw from '!raw-loader!./ExampleBasic';

import CardGalleryItem from '..';
import { storySettings } from './storySettings';

const { kind, storyName, dataHook } = storySettings;
const backgroundImageUrl =
  'https://static.wixstatic.com/media/89ea07a19c3d415e99a8a8a3c0ab1de8.jpg/v1/fill/w_343,h_343,al_c,q_80,usm_0.66_1.00_0.01/89ea07a19c3d415e99a8a8a3c0ab1de8.jpg';
const imageUrls = {
  '4/3':
    'https://static.wixstatic.com/media/89ea07a19c3d415e99a8a8a3c0ab1de8.jpg/v1/fill/w_640,h_480,al_c,q_80,usm_0.66_1.00_0.01/89ea07a19c3d415e99a8a8a3c0ab1de8.jpg',
  '16/9':
    'https://static.wixstatic.com/media/89ea07a19c3d415e99a8a8a3c0ab1de8.jpg/v1/fill/w_640,h_360,al_c,q_80,usm_0.66_1.00_0.01/89ea07a19c3d415e99a8a8a3c0ab1de8.jpg',
  '21/9':
    'https://static.wixstatic.com/media/89ea07a19c3d415e99a8a8a3c0ab1de8.jpg/v1/fill/w_700,h_300,al_c,q_80,usm_0.66_1.00_0.01/89ea07a19c3d415e99a8a8a3c0ab1de8.jpg',
};

const getPrimaryActionProps = label => ({
  label,
  onClick: () => {
    alert('Primary action clicked');
  },
});
const getSecondaryActionProps = label => ({
  label,
  onClick: () => {
    alert('Secondary action clicked');
  },
});
const commonProps = {
  title: 'Card Title',
  subtitle: 'Card subtitle',
  backgroundImageUrl: backgroundImageUrl,
};
const exampleProps = {
  title: ['Card Title', 'Long Card Content Title Long Card Content Title'],
  subtitle: [
    'Card subtitle',
    'Long card content subtitle long card content subtitle',
  ],
  backgroundImageUrl: [
    { label: '4/3', value: imageUrls['4/3'] },
    { label: '16/9', value: imageUrls['16/9'] },
    { label: '21/9', value: imageUrls['21/9'] },
  ],
};

export default {
  category: kind,
  storyName,

  component: CardGalleryItem,
  componentPath: '..',

  componentProps: {
    ...commonProps,
    dataHook,
    primaryActionProps: getPrimaryActionProps('Button'),
    secondaryActionProps: getSecondaryActionProps('Text Link'),
  },

  exampleProps,

  examples: (
    <div>
      <CodeExample title="Basic" code={ExampleBasicRaw}>
        <ExampleBasic />
      </CodeExample>
    </div>
  ),
};
