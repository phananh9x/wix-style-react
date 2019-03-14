import React from 'react';

import {
  tab,
  importExample,
  title,
  description,
  code,
  api,
  playground,
  testkit,
} from 'wix-storybook-utils/Sections';

import Notification from '..';
import Text from 'wix-style-react/Text';

import * as examples from './examples.js';
import readme from '../README.md';
import typesReadme from './types.readme.md';

const exampleChildren = [
  {
    label: 'Just text',
    value: [
      <Notification.TextLabel>Notification text</Notification.TextLabel>,
      <Notification.CloseButton />,
    ],
  },

  {
    label: 'Text and button',
    value: [
      <Notification.TextLabel>Notification text</Notification.TextLabel>,
      <Notification.ActionButton>Button</Notification.ActionButton>,
      <Notification.CloseButton />,
    ],
  },
];

export default {
  category: '8. Notification Bars',
  storyName: '8.1 Notification',
  component: Notification,
  componentPath: '..',

  componentProps: {
    theme: 'standard',
    type: 'global',
    show: true,
    children: exampleChildren[0].value,
  },

  componentWrapper: ({ component }) => (
    <div>
      {component}
      <Text>
        {'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'.repeat(
          5,
        )}
      </Text>
    </div>
  ),

  exampleProps: {
    children: exampleChildren,
  },

  sections: [
    tab({
      title: 'Description',
      sections: [
        description(
          'A sticky toast bar that appears on top of the screen notifying about system changes.',
        ),

        importExample({
          source: "import Notification from 'wix-style-react/Notification';",
        }),

        description(readme),

        title('Examples'),

        code({
          title: 'Themes',
          compact: true,
          source: examples.themes,
          components: { Notification },
        }),

        code({
          title: 'Actions',
          compact: true,
          source: examples.actions,
          components: { Notification },
        }),

        description({
          title: 'Ways to display Notification',
          text: typesReadme,
        }),
      ],
    }),

    ...[
      { title: 'Playground', sections: [playground()] },
      { title: 'API', sections: [api()] },
      { title: 'Testkit', sections: [testkit()] },
    ].map(tab),
  ],
};
