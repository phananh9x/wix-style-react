import React from 'react';
import { storySettings } from './storySettings';
import {
  header,
  divider,
  tabs,
  tab,
  code as baseCode,
  description,
  importExample,
  api,
  testkit,
  playground,
} from 'wix-storybook-utils/Sections';
import { baseScope } from '../utils/Components/LiveCodeExample';
import * as examples from './examples';

import Input from 'wix-style-react/Input';

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
    header({
      issueUrl: 'https://github.com/wix/wix-style-react/issues/new',
      sourceUrl: 'https://github.com/wix/wix-style-react/tree/master/src/Input',
      component: (
        <div style={{ width: '50%' }}>
          <Input />
        </div>
      ),
    }),

    tabs({
      tabs: [
        tab({
          title: 'Usage',
          sections: [
            importExample({
              source: "import Input from 'wix-style-react/Input';",
            }),

            divider(),

            description({ text: '## Examples' }),

            ...[
              { title: 'Standard States', source: examples.standard },
              { title: 'Error', source: examples.error },
              { title: 'Loader', source: examples.loader },
              { title: 'Affix', source: examples.affix },
              { title: 'Icon Affix', source: examples.iconAffix },
              { title: 'Sizes', source: examples.sizes },
              { title: 'Rounded', source: examples.rounded },
            ].map(code),
          ],
        }),

        ...[
          { title: 'API', sections: [api()] },
          { title: 'TestKit', sections: [testkit()] },
          { title: 'Playground', sections: [playground()] },
        ].map(tab),
      ],
    }),
  ],
};
