/* eslint-disable react/prop-types */
import React from 'react';
import { storiesOf } from '@storybook/react';

import { getTestStoryKind } from '../../../stories/storiesHierarchy';
import { storySettings, testStories } from './storySettings';

import CardWithEditableSelector from './CardWithEditableSelector';
import PopoverWithEditableSelector from './PopoverWithEditableSelector';

const kind = getTestStoryKind(storySettings);

storiesOf(kind, module).add(testStories.editableSelector, () => (
  <div>
    <CardWithEditableSelector />
    <PopoverWithEditableSelector />
  </div>
));
