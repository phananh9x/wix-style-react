import React from 'react';
import ToggleSwitch from '..';
import {
  SKINS,
  SIZES,
} from 'wix-ui-backoffice/dist/src/components/ToggleSwitch/constants';
import CodeExample from 'wix-storybook-utils/CodeExample';

import ExampleFormField from './ExampleFormField';
import ExampleFormFieldRaw from '!raw-loader!./ExampleFormField';

export default {
  category: '4. Selection',
  storyName: '4.4 ToggleSwitch',

  component: ToggleSwitch,
  componentPath: '..',

  componentProps: (setState, getState) => ({
    checked: false,
    onChange: () => setState({ checked: !getState().checked }),
  }),

  exampleProps: {
    size: Object.keys(SIZES),
    skin: Object.keys(SKINS),

    onChange: () => 'changed',
  },

  examples: (
    <CodeExample title="Composition with FormField" code={ExampleFormFieldRaw}>
      <ExampleFormField />
    </CodeExample>
  ),
};
