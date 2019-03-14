import React from 'react';
import CodeExample from 'wix-storybook-utils/CodeExample';

import Text, { SIZES, SKINS, WEIGHTS } from '..';

import TypographyExample from './ExampleTextTypography';
import TypographyExampleRaw from '!raw-loader!./ExampleTextTypography';

import MultilineExample from './ExampleMultiline';
import MultilineExampleRaw from '!raw-loader!./ExampleMultiline';

import EllipsisExample from './ExampleEllipsis';
import EllipsisExampleRaw from '!raw-loader!./ExampleEllipsis';

import H1TagNameExample from './ExampleH1TagName';
import H1TagNameExampleRaw from '!raw-loader!./ExampleH1TagName';

import LinkExample from './ExampleLink';
import LinkExampleRaw from '!raw-loader!./ExampleLink';

import { storySettings } from './storySettings';

export default {
  category: storySettings.kind,
  storyName: storySettings.storyName,
  component: Text,
  componentPath: '../Text.js',

  componentProps: {
    children: 'Some text',
    light: false,
    dataHook: 'storybook-text',
    size: SIZES.medium,
    secondary: false,
    skin: SKINS.standard,
    weight: WEIGHTS.thin,
    tagName: 'span',
    ellipsis: false,
  },

  examples: (
    <div>
      <CodeExample title="Multiline Example" code={MultilineExampleRaw}>
        <MultilineExample />
      </CodeExample>

      <CodeExample title="Ellipsis Example" code={EllipsisExampleRaw}>
        <EllipsisExample />
      </CodeExample>

      <CodeExample title="Custom TagName Example" code={H1TagNameExampleRaw}>
        <H1TagNameExample />
      </CodeExample>

      <CodeExample title="Link Example" code={LinkExampleRaw}>
        <LinkExample />
      </CodeExample>

      <CodeExample title="Typography Examples" code={TypographyExampleRaw}>
        <TypographyExample />
      </CodeExample>
    </div>
  ),
};
