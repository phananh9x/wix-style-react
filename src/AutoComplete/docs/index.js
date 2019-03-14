import React from 'react';
import { storiesOf } from '@storybook/react';
import Markdown from 'wix-storybook-utils/Markdown';
import TabbedView from 'wix-storybook-utils/TabbedView';
import CodeExample from 'wix-storybook-utils/CodeExample';

import LiveCodeExample from '../../../stories/utils/LiveCodeExample';
import { Layout, Cell } from '../../Layout';

import Readme from '../README.md';
import ReadmeTestKit from '../README.TESTKIT.md';

import ExampleStandard from './ExampleStandard';
import ExampleStandardRaw from '!raw-loader!./ExampleStandard';

import ExampleControlled from './ExampleControlled';
import ExampleControlledRaw from '!raw-loader!./ExampleControlled';

import ExampleComplex from './ExampleComplex';
import ExampleComplexRaw from '!raw-loader!./ExampleComplex';
import EmptyMessageExampleRaw from '!raw-loader!./EmptyMessageExample';

storiesOf('4. Selection', module).add('4.1 + AutoComplete', () => (
  <TabbedView tabs={['API', 'TestKits']}>
    <div style={{ marginBottom: '200px' }}>
      <Markdown source={Readme} />

      <h1>Usage examples</h1>

      <CodeExample title="Standard" code={ExampleStandardRaw}>
        <ExampleStandard />
      </CodeExample>

      <CodeExample title="Controlled input" code={ExampleControlledRaw}>
        <ExampleControlled />
      </CodeExample>

      <CodeExample title="Complex input" code={ExampleComplexRaw}>
        <ExampleComplex />
      </CodeExample>

      <Layout>
        <Cell span={4}>
          <LiveCodeExample
            title="Show empty message for no results"
            compact
            initialCode={EmptyMessageExampleRaw}
          />
        </Cell>
      </Layout>
    </div>

    <Markdown source={ReadmeTestKit} />
  </TabbedView>
));
