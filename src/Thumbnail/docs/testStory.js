/* eslint-disable react/prop-types */
import React from 'react';
import { storiesOf } from '@storybook/react';

import { getTestStoryKind } from '../../../stories/storiesHierarchy';
import { storySettings, testStories } from './storySettings';
import Thumbnail from '../Thumbnail';
import { Layout, Cell } from '../../Layout';
import { getImageUrl } from './examples';

const kind = getTestStoryKind(storySettings);

storiesOf(kind, module).add(testStories.multipleThumbnails, () => (
  <Layout>
    <Cell span={4}>
      <Thumbnail
        title="Thumbnail Title"
        description="Not selected"
        image={getImageUrl(234, 72)}
      />
    </Cell>
    <Cell span={4}>
      <Thumbnail
        title="Thumbnail Title"
        description="Selected"
        image={getImageUrl(234, 72)}
        selected
      />
    </Cell>
    <Cell span={4}>
      <Thumbnail
        title="Thumbnail Title"
        description="Selected & disabled"
        image={getImageUrl(234, 72)}
        selected
        disabled
      />
    </Cell>
    <Cell span={4}>
      <div>
        <Thumbnail
          dataHook={storySettings.dataHook}
          title="Thumbnail Title"
          description="Without image"
          width={270}
        />
      </div>
    </Cell>
    <Cell span={4}>
      <div>
        <Thumbnail
          dataHook={storySettings.dataHook}
          size="tiny"
          image={getImageUrl(234, 30)}
          height={70}
        />
      </div>
    </Cell>
    <Cell>
      <Thumbnail
        dataHook={storySettings.dataHook}
        title="Thumbnail without description"
        width={270}
      />
    </Cell>
    <Cell span={4}>
      <div dir="rtl">
        <div>RTL</div>
        <Thumbnail
          backgroundImage={getImageUrl(270, 270)}
          selected
          width={270}
          height={170}
        />
      </div>
    </Cell>
    <Cell span={4}>
      <Thumbnail
        backgroundImage={getImageUrl(270, 270)}
        selected
        width={270}
        height={170}
      />
    </Cell>
    <Cell span={4}>
      <Thumbnail
        backgroundImage={getImageUrl(270, 270)}
        selected
        disabled
        width={270}
        height={170}
      />
    </Cell>
    <Cell>
      <Layout gap="12px">
        {[1, 2, 3, 4].map(n => (
          <Cell key={n} span={1}>
            <Thumbnail
              size="tiny"
              backgroundImage={getImageUrl(64, 64)}
              selected={n === 2}
              disabled={n === 4}
              width={64}
              height={64}
            />
          </Cell>
        ))}
      </Layout>
    </Cell>
  </Layout>
));
