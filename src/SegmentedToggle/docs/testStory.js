/* eslint-disable react/prop-types */
import React from 'react';
import { storiesOf } from '@storybook/react';

import { getTestStoryKind } from '../../../stories/storiesHierarchy';
import { storySettings, testStories } from './storySettings';

import LockLocked from 'wix-style-react/new-icons/LockLocked';
import SegmentedToggle from 'wix-style-react/SegmentedToggle';
import { Layout, Cell } from 'wix-style-react/Layout';

const kind = getTestStoryKind(storySettings);

storiesOf(kind, module).add(testStories.textAndPrefix, () => (
  <Layout>
    <Cell span={6}>
      <SegmentedToggle defaultSelected="option">
        <SegmentedToggle.Button prefixIcon={<LockLocked />} value="option">
          Option
        </SegmentedToggle.Button>
        <SegmentedToggle.Button prefixIcon={<LockLocked />} value="option2">
          Option
        </SegmentedToggle.Button>
      </SegmentedToggle>
    </Cell>
    <Cell span={6}>
      <SegmentedToggle defaultSelected="option" disabled>
        <SegmentedToggle.Button prefixIcon={<LockLocked />} value="option">
          Option
        </SegmentedToggle.Button>
        <SegmentedToggle.Button prefixIcon={<LockLocked />} value="option2">
          Very long fancy and hardly fitting tab
        </SegmentedToggle.Button>
      </SegmentedToggle>
    </Cell>
    <Cell span={4}>
      <SegmentedToggle defaultSelected="option">
        <SegmentedToggle.Button prefixIcon={<LockLocked />} value="option">
          Option
        </SegmentedToggle.Button>
        <SegmentedToggle.Button prefixIcon={<LockLocked />} value="option2">
          Very long fancy and hardly fitting tab
        </SegmentedToggle.Button>
      </SegmentedToggle>
    </Cell>
    <Cell span={4}>
      <SegmentedToggle defaultSelected="option" disabled>
        <SegmentedToggle.Button prefixIcon={<LockLocked />} value="option">
          Option
        </SegmentedToggle.Button>
        <SegmentedToggle.Button prefixIcon={<LockLocked />} value="option2">
          Very long fancy and hardly fitting tab
        </SegmentedToggle.Button>
      </SegmentedToggle>
    </Cell>
    <Cell span={6}>
      <SegmentedToggle defaultSelected="option">
        <SegmentedToggle.Button value="option">Option</SegmentedToggle.Button>
        <SegmentedToggle.Button value="option2">Option</SegmentedToggle.Button>
      </SegmentedToggle>
    </Cell>
    <Cell span={6}>
      <SegmentedToggle
        defaultSelected="option"
        disabled
        dataHook={storySettings.dataHook}
      >
        <SegmentedToggle.Button value="option">Option</SegmentedToggle.Button>
        <SegmentedToggle.Button value="option2">Option</SegmentedToggle.Button>
      </SegmentedToggle>
    </Cell>
  </Layout>
));

storiesOf(kind, module).add(testStories.icon, () => (
  <Layout>
    <Cell span={6}>
      <SegmentedToggle
        defaultSelected="option"
        dataHook={storySettings.dataHook}
      >
        <SegmentedToggle.Icon value="option">
          <LockLocked />
        </SegmentedToggle.Icon>
        <SegmentedToggle.Icon value="option2">
          <LockLocked />
        </SegmentedToggle.Icon>
      </SegmentedToggle>
    </Cell>
    <Cell span={6}>
      <SegmentedToggle defaultSelected="option" disabled>
        <SegmentedToggle.Icon value="option">
          <LockLocked />
        </SegmentedToggle.Icon>
        <SegmentedToggle.Icon value="option2">
          <LockLocked />
        </SegmentedToggle.Icon>
      </SegmentedToggle>
    </Cell>
  </Layout>
));
