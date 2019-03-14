/* eslint-disable react/prop-types */

import React from 'react';
import { storiesOf } from '@storybook/react';

import { getTestStoryKind } from '../../../stories/storiesHierarchy';
import { storySettings, testStories } from './storySettings';
import LiveCodeExample from '../../../stories/utils/LiveCodeExample';
import ExampleEventItem from '!raw-loader!./examples/ExampleEventItem';

const kind = getTestStoryKind(storySettings);
const dataHook = `${storySettings.dataHook}-test`;

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

storiesOf(kind, module).add(testStories.multipleBoxes, () => (
  <TestContainer>
    <LiveCodeExample compact initialCode={ExampleEventItem} />
  </TestContainer>
));
