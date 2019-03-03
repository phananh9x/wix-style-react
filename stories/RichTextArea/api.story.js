import {
  tab,
  api,
  title,
  code as baseCode,
  importExample,
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

        title('Examples'),

        ...[
          { title: 'Resizable', source: examples.resizable },
          { title: 'Error', source: examples.error },
          { title: 'Disabled', source: examples.disabled },
          { title: 'Placeholder', source: examples.placeholder },
        ].map(code),
      ],
    }),

    ...[
      {
        title: 'API',
        sections: [api()],
      },

      {
        title: 'TestKit',
        sections: [testkit()],
      },

      {
        title: 'Playground',
        sections: [playground()],
      },
    ].map(tab),
  ],
};
