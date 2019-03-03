import React from 'react';
import { storySettings } from './storySettings';

import GeneratedTestComponent from '../../src/GeneratedTestComponent';

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,

  component: GeneratedTestComponent,
  componentPath: '../../src/GeneratedTestComponent/GeneratedTestComponent.js',

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
      <GeneratedTestComponent
        dataHook="story-generated-test-component-live-example"
        buttonText="Press me for a surprise"
      />
    </div>
  ),
};
