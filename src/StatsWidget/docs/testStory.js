/* eslint-disable react/prop-types */
import React from 'react';
import { storiesOf } from '@storybook/react';

import { getTestStoryKind } from '../../../stories/storiesHierarchy';
import { storySettings, testStories } from './storySettings';

import Standard from './ExampleStatsWidgetStandard';
import WithPercents from './ExampleStatsWidgetWithPercents';
import WithInvertPercentColor from './ExampleStatsWidgetWithInvertPercentColor';
import WithFilters from './ExampleStatsWidgetWithFilters';
import EmptyState from './ExampleStatsWidgetEmptyState';
import WithFilterWithNoBorder from './ExampleStatsWidgetWithFilterWithNoBorder';

const kind = getTestStoryKind(storySettings);

storiesOf(kind, module).add(testStories.statsWidget, () => (
  <div>
    <Standard />
    <WithPercents />
    <WithInvertPercentColor />
    <WithFilterWithNoBorder />
    <WithFilters />
    <EmptyState />
  </div>
));
