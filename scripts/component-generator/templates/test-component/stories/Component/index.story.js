import React from 'react';
import { storySettings } from './storySettings';

import {%ComponentName%} from '../../src/{%ComponentName%}';

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,

  component: {%ComponentName%},
  componentPath: '../../src/{%ComponentName%}/{%ComponentName%}.js',

  componentProps: {
    dataHook: storySettings.dataHook,
    buttonText: undefined,
  },

  exampleProps: {
    // Put here presets of props, for more info:
    // https://github.com/wix/wix-ui/blob/master/packages/wix-storybook-utils/docs/usage.md#using-list
  },

  examples: (
    <div style={{ maxWidth: 627 }}>
      <{%ComponentName%}
        dataHook="story-{%component-name%}-live-example"
        buttonText="Press me for a surprise"
        />
    </div>
  ),
};

