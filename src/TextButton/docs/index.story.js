import React from 'react';
import TextButton from '..';
import { storySettings } from './storySettings';
import icons from '../../../stories/utils/icons-for-story';

import TextButtonStory from './examples';

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

  examples: <TextButtonStory />,
};
