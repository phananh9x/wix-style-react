import React from 'react';
import {
  tab,
  api,
  playground,
  testkit,
  description,
  importExample,
  code,
} from 'wix-storybook-utils/Sections';
import { Image, Hint, More } from 'wix-style-react/new-icons';

import { storySettings } from './storySettings';
import Box from '../../src/Box';
import Text from '../../src/Text';
import IconButton from '../../src/IconButton';
import Button from '../../src/Button';
import propExplanations from './propExplanations';
import ExampleEventItem from '!raw-loader!./examples/ExampleEventItem';

const childrenExamples = [
  {
    label: 'Text',
    value: <span>Here is a simple text</span>,
  },
  {
    label: 'Multiple direct children',
    value: [
      <Box
        align="center"
        verticalAlign="middle"
        margin={1}
        width={80}
        height={80}
        color="D70"
        backgroundColor="B10"
        borderRadius={3}
        key={1}
      >
        Blue
      </Box>,
      <Box
        align="center"
        verticalAlign="middle"
        margin={1}
        width={80}
        height={80}
        color="D70"
        backgroundColor="R10"
        borderRadius={3}
        key={2}
      >
        Red
      </Box>,
      <Box
        align="center"
        verticalAlign="middle"
        margin={1}
        width={80}
        height={80}
        color="D70"
        backgroundColor="G10"
        borderRadius={3}
        key={3}
      >
        Green
      </Box>,
    ],
  },
];

const propExplanationLiveExample = source =>
  code({
    compact: true,
    source,
    components: { Box, Button },
  });

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,
  component: Box,
  componentPath: '../../src/Box',

  componentProps: () => ({
    children: childrenExamples[0].value,
    inline: false,
    direction: 'horizontal',
    align: 'center',
    verticalAlign: 'middle',
    padding: 1,
    minHeight: 200,
    color: 'P00',
    backgroundColor: 'B50',
    dataHook: storySettings.dataHook,
  }),

  exampleProps: {
    children: childrenExamples,
  },

  sections: [
    tab({
      title: 'Description',
      sections: [
        description({
          text: `📦  Box is a wrapper component that provides a way to align, space, resize and style - easily and straightforwardly.`,
        }),

        importExample({
          source: "import Box from 'wix-style-react/Box';",
        }),

        // Children
        description({ text: propExplanations.children.description }),
        propExplanationLiveExample(propExplanations.children.example),

        // Alignment
        description({ text: propExplanations.alignment.description }),
        propExplanationLiveExample(propExplanations.alignment.example),

        // Spacing
        description({ text: propExplanations.spacing.description }),
        propExplanationLiveExample(propExplanations.spacing.example),

        // Sizing
        description({ text: propExplanations.sizing.description }),
        propExplanationLiveExample(propExplanations.sizing.example),

        // Styling
        description({ text: propExplanations.styling.description }),
        propExplanationLiveExample(propExplanations.styling.example),

        description({
          title: 'Examples',
        }),

        code({
          title: 'Event Item (multiple boxes)',
          compact: true,
          source: ExampleEventItem,
          components: { Box, Image, Text, Hint, IconButton, More, Button },
        }),
      ],
    }),

    tab({
      title: 'Playground',
      sections: [playground()],
    }),

    tab({
      title: 'API',
      sections: [api()],
    }),

    tab({
      title: 'Testkit',
      sections: [testkit()],
    }),
  ],
};
