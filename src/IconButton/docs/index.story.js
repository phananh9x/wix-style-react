import React from 'react';
import {
  tab,
  tabs,
  api,
  playground,
  description,
  divider,
  importExample,
  columns,
  header,
  title,
  code as baseLiveCode,
} from 'wix-storybook-utils/Sections';

import IconButton from '..';
import { Layout } from '../../Layout';
import { storySettings } from './storySettings';
import icons from '../../../stories/utils/icons-for-story';
import { baseScope } from '../../../stories/utils/LiveCodeExample';
import testkit from '!raw-loader!./testkit.md';
import More from '../../new-icons/More';
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
  component: IconButton,
  componentPath: '..',

  componentProps: {
    as: 'button',
    children: <More />,
    skin: 'standard',
    priority: 'primary',
    size: 'medium',
    disabled: false,
  },
  exampleProps: {
    onClick: () => 'Clicked!',
    children: icons,
    as: ['button', 'a', 'span', 'div'],
  },

  sections: [
    header({
      component: (
        <Layout gap={0}>
          <IconButton>
            <More />
          </IconButton>
        </Layout>
      ),
      sourceUrl:
        'https://github.com/wix/wix-style-react/tree/master/src/IconButton/IconButton.js',
      issueUrl: 'https://github.com/wix/wix-style-react/issues/new',
    }),
    tabs({
      tabs: [
        tab({
          title: 'Description',
          sections: [
            columns([
              description({
                text: `An IconButton should perform a constructive action such as creating a new item or sharing the item on screen.`,
              }),
            ]),

            importExample({
              source: "import IconButton from 'wix-style-react/IconButton';",
            }),

            divider(),

            columns([title('Examples')]),

            ...[
              {
                title: 'Primary Skins',
                text: 'TextButton supports 3 primary priority styles.',
                source: examples.primary,
              },
              {
                title: 'Secondary Skins',
                text: 'TextButton supports 2 secondary priority styles.',
                source: examples.secondary,
              },
              {
                title: 'Size',
                text: 'TextButton supports 2 sizes.',
                source: examples.size,
              },
              {
                title: 'Custom rendering',
                text:
                  'This component can appear in different HTML tag names – button, a, span, div.',
                source: examples.custom,
              },
            ].map(example),
          ],
        }),

        tab({
          title: 'API',
          sections: [api()],
        }),

        tab({
          title: 'Testkit',
          sections: [description({ text: testkit })],
        }),

        tab({
          title: 'Playground',
          sections: [playground()],
        }),
      ],
    }),
  ],
};
