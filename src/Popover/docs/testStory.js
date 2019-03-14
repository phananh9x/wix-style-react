/* eslint-disable react/prop-types */
import React from 'react';
import { storiesOf } from '@storybook/react';

import { getTestStoryKind } from '../../../stories/storiesHierarchy';
import { storySettings, testStories } from './storySettings';

import Popover from '..';
import IconButton from '../../IconButton';
import More from '../../new-icons/More';

const kind = getTestStoryKind(storySettings);
const dataHook = 'story-popover-test';

const TestContainer = ({ children }) => (
  <div
    data-hook={dataHook}
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#f0f4f7',
    }}
  >
    {children}
  </div>
);

const PopoverAnchor = ({ anchorStyles, placement }) => (
  <Popover
    shown
    showArrow
    placement={placement}
    appendTo="window"
    style={{
      position: 'absolute',
      ...anchorStyles,
    }}
  >
    <Popover.Element>
      <IconButton>
        <More />
      </IconButton>
    </Popover.Element>
    <Popover.Content>
      <div
        style={{
          width: 168,
          height: 90,
        }}
      />
    </Popover.Content>
  </Popover>
);

storiesOf(kind, module).add(testStories.AUTO_POSITIONING, () => (
  <TestContainer>
    <PopoverAnchor
      placement="auto"
      anchorStyles={{
        top: '50%',
        left: 36,
        transform: 'translateY(-50%)',
      }}
    />

    <PopoverAnchor
      placement="auto"
      anchorStyles={{
        left: '50%',
        bottom: 36,
        transform: 'translateX(-50%)',
      }}
    />

    <PopoverAnchor
      placement="auto"
      anchorStyles={{
        top: '50%',
        right: 36,
        transform: 'translateY(-50%)',
      }}
    />

    <PopoverAnchor
      placement="auto"
      anchorStyles={{
        top: 36,
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    />
  </TestContainer>
));

storiesOf(kind, module).add(testStories.ARROW_ADJUSTING, () => (
  <TestContainer>
    <PopoverAnchor
      anchorStyles={{
        top: 18,
        left: 18,
      }}
    />

    <PopoverAnchor
      anchorStyles={{
        left: 18,
        bottom: 18,
      }}
    />

    <PopoverAnchor
      anchorStyles={{
        top: 18,
        right: 18,
      }}
    />

    <PopoverAnchor
      anchorStyles={{
        right: 18,
        bottom: 18,
      }}
    />
  </TestContainer>
));

storiesOf(kind, module).add(testStories.ARROW_EDGE_ADJUSTING, () => (
  <TestContainer>
    <PopoverAnchor
      anchorStyles={{
        top: 0,
        left: 0,
      }}
    />

    <PopoverAnchor
      anchorStyles={{
        left: 0,
        bottom: 0,
      }}
    />

    <PopoverAnchor
      anchorStyles={{
        top: 0,
        right: 0,
      }}
    />

    <PopoverAnchor
      anchorStyles={{
        right: 0,
        bottom: 0,
      }}
    />
  </TestContainer>
));
