import React from 'react';
import { storiesOf } from '@storybook/react';
import { getTestStoryKind } from '../../../stories/storiesHierarchy';
import { storySettings } from './storySettings';

import Tooltip from '..';

const TestStories = storiesOf(getTestStoryKind(storySettings), module);
const { testStoryNames, dataHook } = storySettings;

TestStories.add(testStoryNames.DEFAULT, () => (
  <Tooltip dataHook={dataHook} buttonText="Press me for a surprise" />
));
