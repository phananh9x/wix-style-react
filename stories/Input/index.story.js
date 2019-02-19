import { storySettings } from './storySettings';
import {
  tab,
  code as baseCode,
  importExample,
  api,
  testkit,
  tabs,
  playground,
} from 'wix-storybook-utils/Sections';
import { baseScope } from '../utils/Components/LiveCodeExample';
import * as examples from './examples';

import Input from '../../src/Input';

const code = config => baseCode({ components: baseScope, ...config });

export default {
  category: storySettings.kind,
  storyName: storySettings.storyName,
  component: Input,
  componentPath: '../../src/Input/Input.js',

  componentProps: {
    theme: 'normal',
  },

  sections: [
    tab({
      title: 'Usage',
      sections: [
        importExample({
          source: "import Input from 'wix-style-react/Input'",
        }),

        tabs({
          tabs: [
            { title: 'Standard', source: examples.standard },
            { title: 'Error', source: examples.error },
            { title: 'Loader', source: examples.loader },
            { title: 'Affix', source: examples.affix },
            { title: 'Icon Affix', source: examples.iconAffix },
            { title: 'Sizes', source: examples.sizes },
            { title: 'Rounded', source: examples.rounded },
          ].map(({ title, source }) =>
            tab({ title, sections: [code({ source })] }),
          ),
        }),
      ],
    }),

    ...[
      { title: 'API', sections: [api()] },
      { title: 'TestKit', sections: [testkit()] },
      { title: 'Playground', sections: [playground()] },
    ].map(tab),
  ],
};
