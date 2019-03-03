import React from 'react';
import { tab, description, api, testkit } from 'wix-storybook-utils/Sections';

import CodeExample from 'wix-storybook-utils/CodeExample';

import Slider from 'wix-style-react/Slider';

import ExampleStandard from './ExampleStandard';
import ExampleStandardRaw from '!raw-loader!./ExampleStandard';

import ExampleControlled from './ExampleControlled';
import ExampleControlledRaw from '!raw-loader!./ExampleControlled';

import ExampleRtl from './ExampleRtl';
import ExampleRtlRaw from '!raw-loader!./ExampleRtl';

export default {
  category: '4. Selection',
  storyName: '4.7 Slider',

  component: Slider,
  componentPath: '../../src/Slider',

  sections: [
    tab({
      title: 'Examples',
      sections: [
        description({
          text: (
            <div>
              <CodeExample title="Standard" code={ExampleStandardRaw}>
                <ExampleStandard />
              </CodeExample>

              <CodeExample title="Standard RTL" code={ExampleRtlRaw}>
                <ExampleRtl />
              </CodeExample>

              <CodeExample title="Controlled input" code={ExampleControlledRaw}>
                <ExampleControlled />
              </CodeExample>
            </div>
          ),
        }),
      ],
    }),

    ...[
      {
        title: 'API',
        sections: [api()],
      },

      {
        title: 'Testkit',
        sections: [testkit()],
      },
    ].map(tab),
  ],
};
