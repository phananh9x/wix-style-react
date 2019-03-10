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

  >
    {children}
  </div>
);

storiesOf(kind, module).add(testStories.e2e, () => (
  <TestContainer>
    <input data-hook="input-for-focus-1"/>
    <Example/>
    <input data-hook="input-for-focus-2"/>
  </TestContainer>
));
