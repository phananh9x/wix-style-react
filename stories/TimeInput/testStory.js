/* eslint-disable react/prop-types */
import React from 'react';
import { storiesOf } from '@storybook/react';
import TimeInput from 'wix-style-react/TimeInput';
import { getTestStoryKind } from '../storiesHierarchy';
import { storySettings, testStories } from './storySettings';

import { Layout } from '../../src/Layout';
import moment from 'moment';

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

storiesOf(kind, module).add(testStories.DEFAULT, () => (
  <TestContainer>
    <div style={{ marginLeft: '10px', marginTop: '10px' }}>
      <Layout>
        <TimeInput defaultValue={moment(0)} />
      </Layout>
    </div>
  </TestContainer>
));
