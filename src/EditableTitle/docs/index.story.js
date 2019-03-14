import React from 'react';
import { storySettings } from './storySettings';
import LiveCodeExample from '../../../stories/utils/LiveCodeExample';

import EditableTitle from '..';

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,

  component: EditableTitle,
  componentPath: '../EditableTitle.js',

  componentProps: {
    dataHook: storySettings.dataHook,
    initialValue: 'Some title',
    defaultValue: undefined,
  },

  examples: (
    <div style={{ maxWidth: 627 }}>
      <LiveCodeExample
        compact
        title="With a value"
        initialCode={`
<EditableTitle
  dataHook="story-editable-title-live-example"
  initialValue="Some Title"
  />
        `}
      />
      <LiveCodeExample
        compact
        title="With a default value"
        initialCode={`
<EditableTitle
  dataHook="story-editable-title-live-example"
  defaultValue="Some Title"
  />
        `}
      />

      <LiveCodeExample
        compact
        title="With a Default value and an Initial value"
        initialCode={`
<EditableTitle
  dataHook="story-editable-title-live-example"
  defaultValue="Default Value"
  initialValue="Initial Value"
  />
        `}
      />

      <LiveCodeExample
        compact
        title="With an ellipsis - initial"
        initialCode={`
<EditableTitle
  dataHook="story-editable-title-live-example"
  initialValue="Some Title Some Title Some Title Some Title Some Title Some Title"
  />
        `}
      />
      <LiveCodeExample
        compact
        title="With an ellipsis - default"
        initialCode={`
<EditableTitle
  dataHook="story-editable-title-live-example"
  defaultValue="Some Title Some Title Some Title Some Title Some Title Some Title"
  />
        `}
      />
    </div>
  ),
};
