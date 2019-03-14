import React from 'react';

import CodeExample from 'wix-storybook-utils/CodeExample';
import Markdown from 'wix-storybook-utils/Markdown';

import MultiAreaListWithSortableColumnsReadme from './MultiAreaListWithSortableColumnsReadme.md';
import MultiAreaListWithSortableColumns from './MultiAreaListWithSortableColumns';
import MultiAreaListWithSortableColumnsRaw from '!raw-loader!./MultiAreaListWithSortableColumns';
import MultiAreaListWithSortableColumnsScssRaw from '!raw-loader!./MultiAreaListWithSortableColumns.scss';

const MultiAreaListWithSortableColumnsRawCombined = `
//IntroductionExample.js
${MultiAreaListWithSortableColumnsRaw}

//IntroductionExample.scss
${MultiAreaListWithSortableColumnsScssRaw}
`;

export default () => (
  <div>
    <Markdown source={MultiAreaListWithSortableColumnsReadme} />
    <CodeExample
      title="Sortable List - Draggable columns"
      code={MultiAreaListWithSortableColumnsRawCombined}
    >
      <MultiAreaListWithSortableColumns />
    </CodeExample>
  </div>
);
