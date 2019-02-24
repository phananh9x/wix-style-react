import React from 'react';
import { storiesOf } from '@storybook/react';
import Markdown from 'wix-storybook-utils/Markdown';
import CodeExample from 'wix-storybook-utils/CodeExample';

import CardReadme from '../../../src/Card/README.md';

import ExampleBasic from './ExampleBasic';
import ExampleBasicRaw from '!raw-loader!./ExampleBasic';

import ExampleGridActionHeaders from './ExampleActionHeaders';
import ExampleGridActionHeadersRaw from '!raw-loader!./ExampleActionHeaders';

import ExampleCollapse from './ExampleCollapse';
import ExampleCollapseRaw from '!raw-loader!./ExampleCollapse';

import ExampleEmptyState from './ExampleEmptyState';
import ExampleEmptyStateRaw from '!raw-loader!./ExampleEmptyState';
import { Category } from '../../storiesHierarchy';

storiesOf(Category.COMPONENTS, module).add('Card', () => (
  <div>
    <Markdown source={CardReadme} />

    <CodeExample title="Basic Example" code={ExampleBasicRaw}>
      <ExampleBasic />
    </CodeExample>

    <CodeExample
      title="Cards with action headers"
      code={ExampleGridActionHeadersRaw}
    >
      <ExampleGridActionHeaders />
    </CodeExample>

    <CodeExample
      title="Cards with <Collapse/> component"
      code={ExampleCollapseRaw}
    >
      <ExampleCollapse />
    </CodeExample>

    <CodeExample title="Card with an EmptyState" code={ExampleEmptyStateRaw}>
      <ExampleEmptyState />
    </CodeExample>
  </div>
));
