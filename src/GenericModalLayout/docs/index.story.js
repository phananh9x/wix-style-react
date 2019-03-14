import React from 'react';
import CodeExample from 'wix-storybook-utils/CodeExample';

import ExampleGeneric from './ExampleGeneric';

import ExampleStandard from './ExampleStandard';
import ExampleStandardRaw from '!raw-loader!./ExampleStandard';

import ExampleFullscreen from './ExampleFullscreen';
import ExampleFullscreenRaw from '!raw-loader!./ExampleFullscreen';

export default {
  category: 'Components',
  storyName: 'GenericModalLayout',
  component: ExampleGeneric,
  componentPath: '..',

  componentProps: {
    header: 'header',
    content: 'content',
    footer: 'footer',
    fullscreen: false,
  },

  examples: (
    <div>
      <CodeExample title="Default" code={ExampleStandardRaw}>
        <ExampleStandard />
      </CodeExample>

      <CodeExample title="Fullscreen" code={ExampleFullscreenRaw}>
        <ExampleFullscreen />
      </CodeExample>
    </div>
  ),
};
