import React from 'react';
import { storiesOf } from '@storybook/react';
import Markdown from 'wix-storybook-utils/Markdown';
import TabbedView from 'wix-storybook-utils/TabbedView';
import CodeExample from 'wix-storybook-utils/CodeExample';

import ReadmeTestKit from '../README.TESTKIT.md';
import Readme from '../README.md';

import ExampleControlled from './ExampleControlled';
import ExampleControlledRaw from '!raw-loader!./ExampleControlled';

storiesOf('9. Modals', module).add('Modal', () => (
  <TabbedView tabs={['API', 'TestKits']}>
    <div>
      <Markdown source={Readme} />

      <h1>Usage examples</h1>

      <CodeExample title="Controlled modal" code={ExampleControlledRaw}>
        <ExampleControlled />
      </CodeExample>
    </div>

    <Markdown source={ReadmeTestKit} />
  </TabbedView>
));
