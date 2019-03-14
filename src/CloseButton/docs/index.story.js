import React from 'react';
import CloseButton from '..';
import { storySettings } from './storySettings';

import CloseButtonStory from './examples';
import Help from 'wix-ui-icons-common/Help';

export default {
  category: storySettings.kind,
  storyName: storySettings.storyName,
  component: CloseButton,
  componentPath: '..',

  componentProps: {
    as: 'button',
    skin: 'standard',
    size: 'small',
    disabled: false,
  },

  exampleProps: {
    onClick: () => 'Clicked!',
    as: ['button', 'a', 'span', 'div'],
    children: [
      { label: 'No children', value: null },
      { label: 'Custom Icon', value: <Help /> },
    ],
  },

  examples: <CloseButtonStory />,
};
