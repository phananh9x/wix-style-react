import React from 'react';
import { storiesOf } from '@storybook/react';

import { getTestStoryKind } from '../../../stories/storiesHierarchy';
import { storySettings } from './storySettings';
import { RTLWrapper } from '../../../stories/utils/RTLWrapper';
import Tag from '..';

const kind = getTestStoryKind({
  category: storySettings.category,
  storyName: storySettings.storyName,
});

storiesOf(kind, module).add('1. Thumb Variations', () => (
  <RTLWrapper>
    <div>
      <div>
        sizes:
        <Tag size="tiny" children="tiny" />
        <Tag size="small" children="small" />
        <Tag size="medium" children="medium" />
        <Tag size="large" children="large" />
      </div>
      <div>
        themes:
        <Tag children="default" />
        <Tag children="error theme" theme="error" />
        <Tag children="warning theme" theme="warning" />
      </div>
      <div>
        Removable / Disabled:
        <Tag children="removable" />
        <Tag children="non-removable" removable={false} />
        <Tag children="disabled" disabled />
      </div>
      <div>
        With Thumb:
        <Tag
          children="green"
          thumb={
            <div
              style={{
                backgroundColor: 'green',
                height: '100%',
                width: '100%',
              }}
            />
          }
        />
      </div>
    </div>
  </RTLWrapper>
));
