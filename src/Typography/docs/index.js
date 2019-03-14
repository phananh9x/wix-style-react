import React from 'react';
import { storiesOf } from '@storybook/react';

import { renderSizeAndWeightTable, renderColorTable } from './TextExample';
import { renderHeadingTable } from './HeadingExample';
import { getTestStoryKind, Category } from '../storiesHierarchy';

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
