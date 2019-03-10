/* eslint-disable react/prop-types */

import React from 'react';
import { storiesOf } from '@storybook/react';
// import RichTextArea from 'wix-style-react/RichTextArea';
import ExampleManyOptions from './ExampleManyOptions';

import { getTestStoryKind } from '../../../stories/storiesHierarchy';
import { storySettings, testStories } from './storySettings';

const kind = getTestStoryKind({
  storyName: storySettings.storyName,
  category: storySettings.indexCategory,
});

const TestContainer = ({ children }) => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#f0f4f7',
    }}
    data-hook="dropdown-test-story"
  >
    {children}
  </div>
);

storiesOf(kind, module).add(testStories.basic, () => (
  <TestContainer>
    <input data-hook="input-for-initial-focus" />
    <ExampleManyOptions />
    <input style={{ position: 'relative', top: '400px' }} />
  </TestContainer>
));
