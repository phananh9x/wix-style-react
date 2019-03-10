/* eslint-disable react/prop-types */

import React from 'react';
import { storiesOf } from '@storybook/react';

import { getTestStoryKind } from '../../../stories/storiesHierarchy';
import { storySettings, testStories } from './storySettings';
import Example from "./ExampleControlled";


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
    data-hook="input-with-options-test-story"
  >
    {children}
  </div>
);

storiesOf(kind, module).add(testStories.basic, () => (
  <TestContainer>
    <input/>
    <Example/>
    <input/>
  </TestContainer>
));
