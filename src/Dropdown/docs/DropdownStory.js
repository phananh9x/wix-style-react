import React from 'react';
import { storiesOf } from '@storybook/react';
import { linkTo } from '@storybook/addon-links';
import Markdown from 'wix-storybook-utils/Markdown';
import TabbedView from 'wix-storybook-utils/TabbedView';

import TextButton from '../../TextButton';
import LiveCodeExample from '../../../stories/utils/LiveCodeExample';
import ExampleRaw from '!raw-loader!./Example';

storiesOf('4. Selection', module).add('4.1 Dropdown', () => (
  <TabbedView tabs={['Usage']}>
    <div>
      <Markdown
        source={`
# 4.1 Dropdown

## Included components
          `}
      />

      <lu>
        <li>
          <TextButton
            onClick={linkTo('Components', 'Dropdown')}
          >{`<Dropdown/>`}</TextButton>
        </li>
        <li>
          <TextButton
            onClick={linkTo('Components', 'FormField')}
          >{`<FormField/>`}</TextButton>
        </li>
      </lu>

      <Markdown source={`## Examples`} />

      <div style={{ maxWidth: 520 }}>
        <LiveCodeExample
          compact
          title="Dropdown within a FormField"
          initialCode={ExampleRaw}
        />
      </div>
    </div>
  </TabbedView>
));
