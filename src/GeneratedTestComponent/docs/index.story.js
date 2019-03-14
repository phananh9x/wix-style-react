import React from 'react';
import LiveCodeExample from '../../../stories/utils/LiveCodeExample';
import { Category } from '../../../stories/storiesHierarchy';
import GeneratedTestComponent from '..';

export default {
  category: Category.TESTS,
  storyName: 'GeneratedTestComponent',

  component: GeneratedTestComponent,
  componentPath: '..',

  componentProps: {
    buttonText: undefined,
  },

  exampleProps: {
    // Put here presets of props, for more info:
    // https://github.com/wix/wix-ui/blob/master/packages/wix-storybook-utils/docs/usage.md#using-list
  },

  examples: (
    <div style={{ maxWidth: 627 }}>
      <LiveCodeExample
        compact
        title="Live code example"
        initialCode={`
<GeneratedTestComponent
  dataHook="story-generated-test-component-live-example"
  buttonText="Press me for a surprise"
  />
        `}
      />
    </div>
  ),
};
