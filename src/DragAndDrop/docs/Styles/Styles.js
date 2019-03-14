import React from 'react';

import Markdown from 'wix-storybook-utils/Markdown';
import CodeExample from 'wix-storybook-utils/CodeExample';

import ItemExample from './examples/Item';
import ItemExampleRaw from '!raw-loader!./examples/Item';
import ItemPlaceholderExample from './examples/ItemPlaceholder';
import ItemPlaceholderExampleRaw from '!raw-loader!./examples/ItemPlaceholder';
import ItemPreviewExample from './examples/ItemPreview';
import ItemPreviewExampleRaw from '!raw-loader!./examples/ItemPreview';
import ListExample from './examples/List';
import ListExampleRaw from '!raw-loader!./examples/List';

import Styles from './Styles.md';

export default () => (
  <div>
    <Markdown source={Styles} />

    <CodeExample title="dndStyles.item" code={ItemExampleRaw}>
      <ItemExample />
    </CodeExample>

    <CodeExample
      title="dndStyles.itemPlaceholder"
      code={ItemPlaceholderExampleRaw}
    >
      <ItemPlaceholderExample />
    </CodeExample>

    <CodeExample title="dndStyles.itemPreview" code={ItemPreviewExampleRaw}>
      <ItemPreviewExample />
    </CodeExample>

    <CodeExample title="dndStyles.list" code={ListExampleRaw}>
      <ListExample />
    </CodeExample>
  </div>
);
