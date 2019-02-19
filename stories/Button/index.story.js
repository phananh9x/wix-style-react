import React from 'react';
import { storySettings } from './storySettings';
import icons from '../utils/icons-for-story';
import {
  tab,
  api,
  code as baseCode,
  playground,
  description,
  importExample,
} from 'wix-storybook-utils/Sections';

import Button from 'wix-style-react/Button';
import testkit from '!raw-loader!./README.TESTKIT.md';

import { baseScope } from '../utils/Components/LiveCodeExample';
import * as examples from './examples';
import styles from './examples.scss';

const Link = ({ children, ...rest }) => <a {...rest}>{children}</a>;

const code = config =>
  baseCode({
    components: { ...baseScope, Link },
    previewProps: {
      className: styles.livePreview,
    },
    ...config,
  });

export default {
  category: storySettings.kind,
  storyName: storySettings.storyName,
  component: Button,
  componentPath: '../../src/Button/Button.js',

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
    tab({
      title: 'Description',
      sections: [
        description({
          text: `🔨 To trigger an operation.`,
        }),

        importExample({
          source: "import Button from 'wix-style-react/Button';",
        }),

        description({
          title: `Primary (Filled Buttons)`,
          text:
            'Use primary buttons to give more prominence to actions in layouts with a lot of varying content.',
        }),

        code({
          source: examples.primary,
        }),

        description({
          title: `Secondary (Ghost Buttons)`,
          text:
            'Secondary button is best used for secondary or tertiary content, since it should not compete with your primary call to action.',
        }),

        code({
          source: examples.secondary,
        }),

        description({
          title: `Sizes`,
          text:
            'Button supports four main sizes: tiny, small,medium, large. Default size is medium',
        }),

        code({
          source: examples.sizes,
        }),

        description({
          title: `Affixes`,
          text:
            'Suffix and prefix icons can be added to a button by setting prefixIcon or suffixIcon props.',
        }),

        code({
          source: examples.affixes,
        }),

        description({
          title: `Loading state`,
          text: `A button can show a loading indicator.`,
        }),

        code({
          source: examples.loading,
        }),

        description({
          title: `Custom rendering`,
          text:
            'Control the rendered HTML tag, or render Button component as another component.',
        }),

        code({
          source: examples.custom,
        }),
      ],
    }),

    ...[
      { title: 'Playground', sections: [playground()] },
      { title: 'API', sections: [api()] },
      { title: 'Testkit', sections: [description({ text: testkit })] },
    ].map(tab),
  ],
};
