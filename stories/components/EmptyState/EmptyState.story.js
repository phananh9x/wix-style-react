import React from 'react';
import { linkTo } from '@storybook/addon-links';
import { storySettings } from './storySettings';

import EmptyState from 'wix-style-react/EmptyState';
import TextButton from 'wix-style-react/TextButton';
import Heading from 'wix-style-react/Heading';

import Add from 'wix-style-react/new-icons/Add';
import Download from 'wix-style-react/new-icons/Download';
import StatusComplete from 'wix-style-react/new-icons/StatusComplete';

import ImagePlaceholder from '../../assets/ImagePlaceholder';

const singleAction = <TextButton prefixIcon={<Add />}>New Item</TextButton>;

const singleActionLongText = (
  <TextButton ellipsis prefixIcon={<Add />}>
    New Item with a ridiculous length name that does not fit to a single line
  </TextButton>
);

const twoActions = (
  <span>
    <span style={{ margin: '0 15px' }}>
      <TextButton prefixIcon={<Add />}>New Item</TextButton>
    </span>
    <span style={{ margin: '0 15px' }}>
      <TextButton prefixIcon={<Download />}>Import Items</TextButton>
    </span>
  </span>
);

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,

  component: EmptyState,
  componentPath: '../../../src/EmptyState/EmptyState.js',

  componentProps: {
    dataHook: storySettings.dataHook,
    theme: 'page',
    title: "You don't have any items yet",
    subtitle:
      'Create your product item in an easy & fast way to display it on your site',
    image: <ImagePlaceholder />,
    children: null,
  },

  exampleProps: {
    theme: ['page', 'page-no-border', 'section'],
    image: [
      { label: 'No image', value: null },
      {
        label: 'Image URL',
        value:
          'https://static.wixstatic.com/media/c78d05b79ede429fb77c9d8ec4443b93.jpg/v1/fit/w_375,h_375/c78d05b79ede429fb77c9d8ec4443b93.jpg',
      },
      { label: 'Node', value: <ImagePlaceholder /> },
      { label: 'SVG', value: <StatusComplete size="120px" /> },
    ],
    children: [
      { label: 'No children', value: null },
      { label: 'Single action', value: singleAction },
      { label: 'Two actions', value: twoActions },
      { label: 'Single action with long text', value: singleActionLongText },
    ],
  },

  examples: (
    <div>
      <Heading appearance="H2">
        You can find more examples for components that utilize the EmptyState:
      </Heading>

      <ul>
        <li>
          <TextButton onClick={linkTo('2. Layout', '2.5 Page')}>
            Page
          </TextButton>
          <br />
        </li>
        <li>
          <TextButton onClick={linkTo('2. Layout', 'Card')}>Card</TextButton>
          <br />
        </li>
        <li>
          <TextButton onClick={linkTo('7. Tooltips', '7.2. Popover')}>
            Popover
          </TextButton>
          <br />
        </li>
        <li>
          <TextButton onClick={linkTo('9. Modals', '9.1 Alert')}>
            Alert
          </TextButton>
          <br />
        </li>
        <li>
          <TextButton onClick={linkTo('10. Tables', '10.1 Table')}>
            Table
          </TextButton>
          <br />
        </li>
      </ul>
    </div>
  ),
};
