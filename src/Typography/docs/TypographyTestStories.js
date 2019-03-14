import React from 'react';
import { storiesOf } from '@storybook/react';

import {
  renderSizeAndWeightTable,
  renderColorTable,
} from './TextClassesExample';
import { renderHeadingTable } from './HeadingClassesExample';
import { getTestStoryKind, Category } from '../../../stories/storiesHierarchy';

import typography from '..';

const kind = getTestStoryKind({
  category: Category.FOUNDATION,
  storyName: '1.2 Typography',
});
storiesOf(kind, module).add('1. Typography with Classes - Text', () => {
  return (
    <div>
      <h1>Typography text with classes</h1>
      <br />
      <div style={{ display: 'flex' }}>
        {renderSizeAndWeightTable()}
        <div style={{ width: '20px' }} />
        {renderColorTable()}
      </div>
    </div>
  );
});

storiesOf(kind, module).add('2. Typography with Classes - Heading', () => {
  return (
    <div>
      <h1>Typography heading with classes</h1>
      <br />
      <div style={{ display: 'flex' }}>{renderHeadingTable()}</div>
    </div>
  );
});

storiesOf(kind, module).add('3. Typography class deprecation log', () => {
  return (
    <div style={{ backgroundColor: 'black' }}>
      <h1 className={typography.h1_1}>Deprecated h1_1 class</h1>
    </div>
  );
});
