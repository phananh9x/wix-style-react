import React from 'react';
import { storiesOf } from '@storybook/react';

import { getTestStoryKind } from '../../../stories/storiesHierarchy';
import MainExample from './MainExample';
import { storySettings } from './storySettings';
import { RTLWrapper } from '../../../stories/utils/RTLWrapper';

const kind = getTestStoryKind({
  category: storySettings.category,
  storyName: storySettings.storyName,
});

storiesOf(kind, module).add('1. Toolbar', () => {
  return (
    <RTLWrapper>
      <MainExample />
    </RTLWrapper>
  );
});
