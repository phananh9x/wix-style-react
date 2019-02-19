import React from 'react';

import CodeExample from 'wix-storybook-utils/CodeExample';
import Markdown from 'wix-storybook-utils/Markdown';

import MultiAreaListWithSortableColumnsWithAnimationsReadme from './MultiAreaListWithSortableColumnsWithAnimationsReadme.md';
import MultiAreaListWithSortableColumnsWithAnimations from './MultiAreaListWithSortableColumnsWithAnimations';
import MultiAreaListWithSortableColumnsWithAnimationsRaw from '!raw-loader!./MultiAreaListWithSortableColumnsWithAnimations';
import MultiAreaListWithSortableColumnsWithAnimationsScssRaw from '!raw-loader!./MultiAreaListWithSortableColumnsWithAnimations.scss';

const MultiAreaListWithSortableColumnsWithAnimationsRawCombined = `
//IntroductionExample.js
${MultiAreaListWithSortableColumnsWithAnimationsRaw}

//IntroductionExample.scss
${MultiAreaListWithSortableColumnsWithAnimationsScssRaw}
`;

export default () => (
  <div>
    <Markdown source={MultiAreaListWithSortableColumnsWithAnimationsReadme} />
    <CodeExample
      title="Sortable List - Draggable columns"
      code={MultiAreaListWithSortableColumnsWithAnimationsRawCombined}
    >
      <MultiAreaListWithSortableColumnsWithAnimations />
    </CodeExample>
  </div>
);
