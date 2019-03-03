/* eslint-disable react/prop-types */
import React from 'react';
import { storiesOf } from '@storybook/react';

import { getTestStoryKind } from '../storiesHierarchy';
import { storySettings, testStories } from './storySettings';

import ColorInput from '../../src/ColorInput';
import { Layout, Cell } from '../../src/Layout';

const kind = getTestStoryKind(storySettings);

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

storiesOf(kind, module).add(testStories.STATES, () => (
  <TestContainer>
    <div style={{ margin: '10px', width: '50%' }}>
      <Layout>
        <ColorInput value="#FF0000" size="large" />
        <ColorInput value="#FF0000" size="medium" />
        <ColorInput value="#FF0000" size="small" />
      </Layout>
    </div>
    <div style={{ margin: '10px', width: '50%' }}>
      <Layout>
        <ColorInput value="#FF0000" error />
        <ColorInput value="" />
        <ColorInput value="#FF0000" disabled />
      </Layout>
    </div>
  </TestContainer>
));
