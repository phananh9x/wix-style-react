import React from 'react';
import ImageViewer from '..';

import CodeExample from 'wix-storybook-utils/CodeExample';

import ExampleStandard from './ExampleStandard';
import ExampleStandardRaw from '!raw-loader!./ExampleStandard';

const exampleImageUrl = [
  { label: 'No Image', value: '' },
  {
    label: 'Image',
    value:
      'https://static.wixstatic.com/media/c78d05b79ede429fb77c9d8ec4443b93.jpg/v1/fit/w_375,h_375/c78d05b79ede429fb77c9d8ec4443b93.jpg',
  },
  {
    label: 'Small Image',
    value:
      'https://static.wixstatic.com/media/7175d1_bc0f6b3c4f43485aa99f0bcceaaea740~mv2.png',
  },
];

export default {
  category: '3. Inputs',
  storyName: '3.10 ImageViewer',

  component: ImageViewer,
  componentPath: '..',

  componentProps: {
    dataHook: 'story-image-viewer',
    imageUrl: exampleImageUrl[0].value,
  },

  exampleProps: {
    imageUrl: exampleImageUrl,
    onAddImage: () => 'onAddImage',
    onUpdateImage: () => 'onUpdateImage',
    onRemoveImage: () => 'onRemoveImage',
    tooltipProps: [{ label: 'from left', value: { placement: 'left' } }],
  },

  examples: (
    <CodeExample title="Standard" code={ExampleStandardRaw}>
      <ExampleStandard />
    </CodeExample>
  ),
};
