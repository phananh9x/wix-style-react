import React from 'react';
import {
  tab,
  api,
  code as baseCode,
  importExample,
  description,
  playground,
  testkit,
} from 'wix-storybook-utils/Sections';
import RichTextArea from 'wix-style-react/RichTextArea';

import { baseScope } from '../utils/Components/LiveCodeExample';
import { storySettings } from './storySettings';
import * as examples from './examples';

const code = config =>
  baseCode({
    components: baseScope,
    ...config,
  });

export default {
  category: storySettings.apiCategory,
  storyName: storySettings.storyName,
  component: RichTextArea,
  componentPath: '../../src/RichTextArea/RichTextArea.js',

  componentProps: setProps => ({
    value: '',
    resizable: false,
    error: false,
    onChange: value => {
      setProps({ value });
    },
  }),
  exampleProps: {
    onChange: value => value,
  },

  sections: [
    tab({
      title: 'Usage',
      sections: [
        importExample({
          source: "import RichTextArea from 'wix-style-react/RichTextArea';",
        }),
        description({ text: '## Examples' }),
        description({
          title: 'Resizable',
        }),
        code({
          source: examples.resizable,
        }),
        description({
          title: 'Error',
        }),
        code({
          source: examples.error,
        }),
        description({
          title: 'Disabled',
        }),
        code({
          source: examples.disabled,
        }),
        description({
          title: 'Placeholder',
        }),
        code({
          source: examples.placeholder,
        }),
      ],
    }),

    tab({
      title: 'API',
      sections: [api()],
    }),

    tab({
      title: 'TestKit',
      sections: [testkit()],
    }),

    tab({
      title: 'Playground',
      sections: [playground()],
    }),
  ],
};
