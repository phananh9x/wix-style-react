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
  code as baseLiveCode,
} from 'wix-storybook-utils/Sections';

import TextButton from 'wix-style-react/TextButton';
import { Layout } from 'wix-style-react/Layout';
import { storySettings } from './storySettings';
import icons from '../utils/icons-for-story';
import { baseScope } from '../utils/Components/LiveCodeExample';
import testkit from '!raw-loader!./testkit.md';
import * as examples from './examples';
import styles from './examples.scss';


const liveCode = config =>
  baseLiveCode({
    previewProps: {
      className: styles.livePreview,
    },
    compact: true,
    components: baseScope,
    ...config,
  });

const example = ({ title, source }) =>
  liveCode({
    title,
    source,
  });

export default {
  category: storySettings.kind,
  storyName: storySettings.storyName,
  component: TextButton,
  componentPath: '../../src/TextButton',

  componentProps: {
    as: 'button',
    children: 'Text button',
    skin: 'standard',
    underline: 'none',
    weight: 'thin',
    size: 'medium',
    disabled: false,
  },
  exampleProps: {
    onClick: () => 'Clicked!',
    prefixIcon: icons,
    suffixIcon: icons,
    as: ['button', 'a', 'span', 'div'],
  },

  sections: [
    header({
      component: (
        <Layout gap={0}>
          <TextButton>Text Button</TextButton>
        </Layout>
      ),
      sourceUrl:
        'https://github.com/wix/wix-style-react/tree/master/src/TextButton/TextButton.js',
      issueUrl: 'https://github.com/wix/wix-style-react/issues/new',
    }),
    tabs({
      tabs: [
        tab({
          title: 'Description',
          sections: [
            description({
              text: 'Text buttons minimize distraction from content.',
            }),

            importExample({
              source: "import TexButton from 'wix-style-react/TextButton';",
            }),

            divider(),

            columns({
              items: [
                description({
                  text: '### Examples',
                }),
                description(),
              ],
            }),

            ...[
              {
                title: 'Underline: none',
                source: examples.underlineNone,
              },
              {
                title: 'Underline: onHover',
                source: examples.underlineOnHover,
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
