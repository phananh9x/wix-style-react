import React from 'react';
import Heading from '..';

import CodeExample from 'wix-storybook-utils/CodeExample';

import EllipsisExample from './ExampleEllipsis';
import EllipsisExampleRaw from '!raw-loader!./ExampleEllipsis';

import TypographyExample from './ExampleTypography';
import TypographyExampleRaw from '!raw-loader!./ExampleTypography';

import { storySettings } from './storySettings';

export default {
  category: storySettings.kind,
  storyName: storySettings.storyName,
  component: Heading,
  componentPath: '../Heading.js',

  componentProps: {
    children: 'Hey there, good looking',
    light: false,
    dataHook: 'storybook-heading',
    appearance: 'H1',
    ellipsis: false,
  },

  examples: (
    <div>
      <CodeExample title="Ellipsis Example" code={EllipsisExampleRaw}>
        <EllipsisExample />
      </CodeExample>

      <CodeExample title="Typography Example" code={TypographyExampleRaw}>
        <TypographyExample />
      </CodeExample>
    </div>
  ),
};
