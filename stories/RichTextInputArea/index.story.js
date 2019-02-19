import React from 'react';
import { storySettings } from './storySettings';
import LiveCodeExample from '../utils/Components/LiveCodeExample';

import RichTextInputArea from '../../src/RichTextInputArea';
import ExampleRichTextInputArea from '!raw-loader!./examples/ExampleRichTextInputArea';

export default {
  category: storySettings.kind,
  storyName: storySettings.storyName,

  component: RichTextInputArea,
  componentPath: '../../src/RichTextInputArea/RichTextInputArea.js',

  componentProps: setProps => ({
    dataHook: storySettings.dataHook,
    value: '',
    onChange: value => {
      setProps({ value });
    },
  }),

  exampleProps: {
    onChange: value => value,
  },

  examples: (
    <div style={{ maxWidth: 627 }}>
      <LiveCodeExample
        compact
        title="Live code example"
        initialCode={ExampleRichTextInputArea}
      />
    </div>
  ),
};
