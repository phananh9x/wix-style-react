/* eslint-disable react/prop-types */

import React from 'react';
import { storiesOf } from '@storybook/react';
import RichTextArea from 'wix-style-react/RichTextArea';

import { getTestStoryKind } from '../storiesHierarchy';
import { storySettings, testStories } from './storySettings';

const kind = getTestStoryKind({
  storyName: storySettings.storyName,
  category: storySettings.indexCategory,
});

const TestContainer = ({ children }) => (
  <div
    data-hook={storySettings.dataHook}
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

storiesOf(kind, module).add(testStories.basic, () => (
  <TestContainer>
    <RichTextArea />
  </TestContainer>
));

storiesOf(kind, module).add(testStories.absoluteLinks, () => (
  <TestContainer>
    <RichTextArea absoluteLinks />
  </TestContainer>
));

storiesOf(kind, module).add(testStories.error, () => (
  <TestContainer>
    <RichTextArea error />
  </TestContainer>
));
