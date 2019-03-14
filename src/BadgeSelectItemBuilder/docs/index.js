import React from 'react';
import { storiesOf } from '@storybook/react';

import Markdown from 'wix-storybook-utils/Markdown';
import TabbedView from 'wix-storybook-utils/TabbedView';
import CodeExample from 'wix-storybook-utils/CodeExample';

import Readme from './README.md';

import Example from './Example';
import ExampleRaw from '!raw-loader!./Example';

storiesOf('WIP/Builders', module).add('BadgeSelectItemBuilder', () => (
  <TabbedView tabs={['Usage']}>
    <div>
      <Markdown source={Readme} />

      <CodeExample title="Standard" code={ExampleRaw}>
        <Example />
      </CodeExample>

      <div style={{ paddingTop: '230px' }} />
    </div>
  </TabbedView>
));
