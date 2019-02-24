import React from 'react';
import { storiesOf } from '@storybook/react';
import Markdown from 'wix-storybook-utils/Markdown';
import CodeExample from 'wix-storybook-utils/CodeExample';

import ExampleBasicGrid from './ExampleBasicGrid';
import ExampleBasicGridRaw from '!raw-loader!./ExampleBasicGrid';

import ExampleGridStandard from './ExampleGridStandard';
import ExampleGridStandardRaw from '!raw-loader!./ExampleGridStandard';

import ExampleRowWithEqualHeight from './ExampleRowWithEqualHeight';
import ExampleRowWithEqualHeightRaw from '!raw-loader!./ExampleRowWithEqualHeight';

import ExampleAutoAdjustedRow from './ExampleAutoAdjustedRow';
import ExampleAutoAdjustedRowRaw from '!raw-loader!./ExampleAutoAdjustedRow';

import GridReadme from '../../../src/Grid/README.md';
import { Category } from '../../storiesHierarchy';

storiesOf(Category.COMPONENTS, module).add('Grid', () => (
  <div>
    <Markdown source={GridReadme} />

    <CodeExample title="Basic Example" code={ExampleBasicGridRaw}>
      <ExampleBasicGrid />
    </CodeExample>

    <CodeExample title="Example with Card" code={ExampleGridStandardRaw}>
      <ExampleGridStandard />
    </CodeExample>

    <CodeExample
      title="Grid with equal height columns"
      code={ExampleRowWithEqualHeightRaw}
    >
      <ExampleRowWithEqualHeight />
    </CodeExample>

    <CodeExample
      title="Grid with auto adjusted columns"
      code={ExampleAutoAdjustedRowRaw}
    >
      <ExampleAutoAdjustedRow />
    </CodeExample>
  </div>
));
