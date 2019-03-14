import React from 'react';
import LiveCodeExample from '../../../stories/utils/LiveCodeExample';
import { Category } from '../../../stories/storiesHierarchy';
import {%ComponentName%} from '..';

export default {
  category: Category.{%CATEGORY%},
  storyName: '{%ComponentName%}',

  component: {%ComponentName%},
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
<{%ComponentName%}
  dataHook="story-{%component-name%}-live-example"
  buttonText="Press me for a surprise"
  />
        `}
      />
    </div>
  ),
};
