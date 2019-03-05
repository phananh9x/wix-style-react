import React from 'react';
import { storySettings } from './storySettings';
import LiveCodeExample from '../utils/LiveCodeExample';

import EditableTitle from '../../src/EditableTitle';

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,

  component: EditableTitle,
  componentPath: '../../src/EditableTitle/EditableTitle.js',

  componentProps: {
    dataHook: storySettings.dataHook,
  },

  exampleProps: {
    // Put here presets of props, for more info:
    // https://github.com/wix/wix-ui/blob/master/packages/wix-storybook-utils/docs/usage.md#using-list
  },

  examples: (
    <div style={{ maxWidth: 627 }}>
      <LiveCodeExample
        compact
        title="With a value"
        initialCode={`
<EditableTitle
  dataHook="story-editable-title-live-example"
  value="Some Title"
  />
        `}
      />
      <LiveCodeExample
        compact
        title="With a Placeholder"
        initialCode={`
<EditableTitle
  dataHook="story-editable-title-live-example"
  placeholder="Some Title"
  />
        `}
      />

      <LiveCodeExample
        compact
        title="With an ellipsis"
        initialCode={`
<EditableTitle
  dataHook="story-editable-title-live-example"
  value="Some Title Some Title Some Title Some Title Some Title Some Title"
  />
        `}
      />
    </div>
  ),
};
