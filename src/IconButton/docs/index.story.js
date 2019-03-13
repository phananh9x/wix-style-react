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
                text: `Icon Button is used when action is lower priority than a regular action or there’s no space available to place a button with text.`,
              }),
            ]),

            importExample({
              source: "import IconButton from 'wix-style-react/IconButton';",
            }),

            divider(),

            columns([title('Examples')]),

            ...[
              {
                title: 'Skin',
                text:
                  'Icon Button supports 3 skin styles. `standard` works well on white, `inverted` is great on grey and `light` is perfect on dark backgrounds.',
                source: examples.skins,
              },
              {
                title: 'Priority',
                text:
                  'It can be `primary` or `secondary` action. There should be only one primary action per page.',
                source: examples.priority,
              },
              {
                title: 'Size',
                text:
                  'Its size can be `small` or `medium`. Smaller layout container should contain small buttons.',
                source: examples.size,
              },
              {
                title: 'Disabled',
                text:
                  'It can be `disabled` when needed to indicate that action is available, but cannot be performed at the moment.',
                source: examples.disabled,
              },
              {
                title: 'Custom rendering',
                text:
                  'This component can appear in different HTML tag names – `button`, `a`, `span`, `div`.',
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
