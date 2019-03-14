import React from 'react';

import CodeExample from 'wix-storybook-utils/CodeExample';
import Markdown from 'wix-storybook-utils/Markdown';

import MultiAreaListReadme from './MultiAreaListReadme.md';
import MultiAreaList from './MultiAreaList';
import MultiAreaListRaw from '!raw-loader!./MultiAreaList';
import MultiAreaListScssRaw from '!raw-loader!./MultiAreaList.scss';

const MultiAreaListRawCombined = `
//IntroductionExample.js
${MultiAreaListRaw}

//IntroductionExample.scss
${MultiAreaListScssRaw}
`;

export default () => (
  <div>
    <Markdown source={MultiAreaListReadme} />
    <CodeExample
      title="Sortable List - D&D between columns"
      code={MultiAreaListRawCombined}
    >
      <MultiAreaList />
    </CodeExample>
  </div>
);
