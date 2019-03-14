import React from 'react';
import { storiesOf } from '@storybook/react';
import Markdown from 'wix-storybook-utils/Markdown';
import TabbedView from 'wix-storybook-utils/TabbedView';
import CodeExample from 'wix-storybook-utils/CodeExample';

import Readme from '../README.md';
import ReadmeTestkit from '../README.TESTKIT.md';

import ExampleStandard from './ExampleStandard';
import ExampleStandardRaw from '!raw-loader!./ExampleStandard';

import ExampleDropdownSize from './ExampleDropdownSize';
import ExampleDropdownSizeRaw from '!raw-loader!./ExampleDropdownSize';

import ExampleControlled from './ExampleControlled';
import ExampleControlledRaw from '!raw-loader!./ExampleControlled';

import ExampleNoDropdownIfEmptyInput from './ExampleNoDropdownIfEmptyInput';
import ExampleNoDropdownIfEmptyInputRaw from '!raw-loader!./ExampleNoDropdownIfEmptyInput';

storiesOf('4. Selection', module).add('4.1 + InputWithOptions', () => (
  <TabbedView tabs={['API', 'Testkit']}>
    <div>
      <Markdown source={Readme} />

      <h1>Usage examples</h1>

      <CodeExample title="Standard" code={ExampleStandardRaw}>
        <ExampleStandard />
      </CodeExample>

      <CodeExample title="Dropdown size" code={ExampleDropdownSizeRaw}>
        <ExampleDropdownSize />
      </CodeExample>

      <CodeExample
        title="No dropdown if input is empty"
        code={ExampleNoDropdownIfEmptyInputRaw}
      >
        <ExampleNoDropdownIfEmptyInput />
      </CodeExample>

      <CodeExample title="Controlled input" code={ExampleControlledRaw}>
        <ExampleControlled />
      </CodeExample>
    </div>

    <Markdown source={ReadmeTestkit} />
  </TabbedView>
));
