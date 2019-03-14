import React from 'react';
import { storySettings } from './storySettings';
import icons from '../../../stories/utils/icons-for-story';
import {
  tab,
  tabs,
  api,
  header,
  code as baseLiveCode,
  divider,
  columns,
  title,
  playground,
  description,
  importExample,
} from 'wix-storybook-utils/Sections';

import { Layout } from '../..';
import Button from '..';
import testkit from './README.TESTKIT.md';

import { baseScope } from '../../../stories/utils/LiveCodeExample';
import * as examples from './examples';

const Link = ({ children, ...rest }) => <a {...rest}>{children}</a>;

const liveCode = config =>
  baseLiveCode({
    previewProps: {
      style: { backgroundColor: '#f0f4f7' },
    },
    compact: true,
    components: { ...baseScope, Link },
    ...config,
  });

const example = ({ source, ...rest }) =>
  columns([description({ ...rest }), liveCode({ source })]);

export default {
  category: storySettings.kind,
  storyName: storySettings.storyName,
  component: Button,
  componentPath: '..',

  componentProps: {
    as: 'button',
    children: 'Button',
    skin: 'standard',
    priority: 'primary',
    size: 'medium',
  },

  exampleProps: {
    onClick: () => 'Clicked!',
    prefixIcon: icons,
    suffixIcon: icons,
    fullWidth: false,
    disabled: false,
    as: ['button', 'a', 'span', 'div'],
  },

  sections: [
    header({
      component: (
        <Layout gap={0}>
          <Button>Button</Button>
        </Layout>
      ),
      sourceUrl:
        'https://github.com/wix/wix-style-react/tree/master/src/Button/Button.js',
      issueUrl: 'https://github.com/wix/wix-style-react/issues/new',
    }),
    tabs([
      tab({
        title: 'Description',
        sections: [
          description(`🔨 To trigger an operation.`),

          importExample({
            source: "import Button from 'wix-style-react/Button';",
          }),

          divider(),

          columns([title('Examples')]),

          ...[
            {
              title: 'Primary (Filled Buttons)',
              text:
                'Use primary buttons to give more prominence to actions in layouts with a lot of varying content.',
              source: examples.primary,
            },
            {
              title: 'Secondary (Ghost Buttons)',
              text:
                'Secondary button is best used for secondary or tertiary content, since it should not compete with your primary call to action.',
              source: examples.secondary,
            },
            {
              title: 'Sizes',
              text:
                'Button supports four main sizes: tiny, small,medium, large. Default size is medium.',
              source: examples.sizes,
            },
            {
              title: 'Affixes',
              text:
                'Suffix and prefix icons can be added to a button by setting prefixIcon or suffixIcon props.',
              source: examples.affixes,
            },
            {
              title: 'Loading state',
              text: 'A button can show a loading indicator.',
              source: examples.loading,
            },
            {
              title: 'Custom rendering',
              text:
                'Control the rendered HTML tag, or render Button component as another component.',
              source: examples.custom,
            },
          ].map(example),
        ],
      }),

      ...[
        { title: 'API', sections: [api()] },
        { title: 'Testkit', sections: [description(testkit)] },
        { title: 'Playground', sections: [playground()] },
      ].map(tab),
    ]),
  ],
};
