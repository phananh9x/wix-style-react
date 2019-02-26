import React from 'react';
import { storySettings } from './storySettings';
import LiveCodeExample from '../utils/Components/LiveCodeExample';

import NoBorderInput from '../../src/NoBorderInput';

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,

  component: NoBorderInput,
  componentPath: '../../src/NoBorderInput/NoBorderInput.js',

  componentProps: setState => ({
    dataHook: storySettings.dataHook,
    value: '',
    label: '',
    placeholder: '',
    onChange: e => setState({ value: e.target.value }),
    size: 'normal',
    statusMessage: undefined,
  }),

  exampleProps: {
    status: [{ label: 'NoBorderInput.StatusError', value: 'error' }],
  },

  examples: (
    <div style={{ maxWidth: 627 }}>
      <LiveCodeExample
        compact
        title="No border input standard example"
        initialCode={`
          <NoBorderInput
            dataHook="story-no-border-input-live-example"
            placeholder="this is a placeholder"
          />
        `}
      />
    </div>
  ),
};
