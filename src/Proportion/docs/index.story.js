import React from 'react';
import CodeExample from 'wix-storybook-utils/CodeExample';

import { storySettings } from './storySettings';
import Proportion from '..';

import ExampleComponent from './ExampleComponent';
import ExampleComponentRaw from '!raw-loader!./ExampleComponent';

const IMG_URL =
  'https://upload.wikimedia.org/wikipedia/commons/b/b2/Vincent_van_Gogh_-_Self-Portrait_-_Google_Art_Project.jpg';
const CUSTOM_RATIO = 3142 / 3820; // taken from image ^

const exampleAspectRatio = [
  {
    value: CUSTOM_RATIO,
    label: `custom (3142 / 3820 = image original ratio)`,
  },
  { value: Proportion.PREDEFINED_RATIOS.square, label: 'square' },
  { value: Proportion.PREDEFINED_RATIOS.portrait, label: 'portrait' },
  { value: Proportion.PREDEFINED_RATIOS.cinema, label: 'cinema' },
  { value: Proportion.PREDEFINED_RATIOS.landscape, label: 'landscape' },
];

export default {
  category: storySettings.kind,
  storyName: storySettings.storyName,

  component: Proportion,
  componentPath: '..',

  componentProps: {
    dataHook: storySettings.dataHook,
    children: (
      <img
        src={IMG_URL}
        style={{ verticalAlign: 'middle' }}
        width={'100%'}
        height={'100%'}
      />
    ),
  },

  exampleProps: {
    aspectRatio: exampleAspectRatio,
  },

  examples: (
    <div style={{ maxWidth: 627, paddingBottom: 60 }}>
      <CodeExample title="Proportion demo" code={ExampleComponentRaw}>
        <ExampleComponent />
      </CodeExample>
    </div>
  ),
};
