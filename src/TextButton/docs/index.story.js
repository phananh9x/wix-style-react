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

import TextButton from '..';
import { Layout } from 'wix-style-react/Layout';
import { storySettings } from './storySettings';
import icons from '../../../stories/utils/icons-for-story';
import { baseScope } from '../../../stories/utils/LiveCodeExample';
import testkit from '!raw-loader!./testkit.md';
import * as examples from './examples';
import styles from './examples.scss';

const Link = ({ children, ...rest }) => <a {...rest}>{children}</a>;

const liveCode = config =>
  baseLiveCode({
    previewProps: {
      className: styles.livePreview,
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
  component: TextButton,
  componentPath: '..',

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
            columns([
              description({
                text: `Text buttons have a low level of emphasis and are typically used for less important actions.`,
              }),
            ]),

            importExample({
              source: "import TexButton from 'wix-style-react/TextButton';",
            }),

            divider(),

            columns([title('Examples')]),

            ...[
              {
                title: 'Skin',
                text:
                  'TextButton supports 4 styles of different skins. Light skin is designed to be used on dark backgrounds while dark skin is for coloured backgrounds.',
                source: examples.skins,
              },
              {
                title: 'Size',
                text: 'This action supports two sizes – small and medium.',
                source: examples.size,
              },
              {
                title: 'Affix',
                text:
                  'TextButton allows using any icon before or after the text.',
                source: examples.affixes,
              },
              {
                title: 'Underline',
                text: `To emphasise an action, it is allowed to make underline always visible. While to make it more neutral, it's allowed to disable underline too.`,
                source: examples.underline,
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
