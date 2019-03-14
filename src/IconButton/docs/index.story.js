import React from 'react';
import IconButton from '..';
import { storySettings } from './storySettings';
import More from 'wix-style-react/new-icons/More';

import IconButtonStory from './examples';
import icons from '../../../stories/utils/icons-for-story';

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

  examples: <IconButtonStory />,
};
