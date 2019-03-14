import React from 'react';
import {
  tab,
  api,
  playground,
  testkit,
  title,
  description,
  importExample,
  code,
} from 'wix-storybook-utils/Sections';
import { Image, Hint, More } from 'wix-style-react/new-icons';

import { storySettings } from './storySettings';
import Box from '..';
import Text from '../../Text';
import IconButton from '../../IconButton';
import Button from '../../Button';
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
  componentPath: '..',

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
        description(
          `📦  Box is a wrapper component that provides a way to align, space, resize and style - easily and straightforwardly.`,
        ),

        importExample({
          source: "import Box from 'wix-style-react/Box';",
        }),

        // Children
        description(propExplanations.children.description),
        propExplanationLiveExample(propExplanations.children.example),

        // Alignment
        description(propExplanations.alignment.description),
        propExplanationLiveExample(propExplanations.alignment.example),

        // Spacing
        description(propExplanations.spacing.description),
        propExplanationLiveExample(propExplanations.spacing.example),

        // Sizing
        description(propExplanations.sizing.description),
        propExplanationLiveExample(propExplanations.sizing.example),

        // Styling
        description(propExplanations.styling.description),
        propExplanationLiveExample(propExplanations.styling.example),

        title('Examples'),

        code({
          title: 'Event Item (multiple boxes)',
          compact: true,
          source: ExampleEventItem,
          components: { Box, Image, Text, Hint, IconButton, More, Button },
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
