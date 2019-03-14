import React from 'react';

import CodeExample from 'wix-storybook-utils/CodeExample';
import Markdown from 'wix-storybook-utils/Markdown';

import ListWithDelayReadme from './ListWithDelayReadme.md';
import ListWithDelay from './ListWithDelay';
import ListWithDelayRaw from '!raw-loader!./ListWithDelay';
import ListWithDelayScssRaw from '!raw-loader!./ListWithDelay.scss';

const ListWithDelayRawCombined = `
${ListWithDelayRaw}

//IntroductionExample.scss
${ListWithDelayScssRaw}
`;

export default () => (
  <div>
    <Markdown source={ListWithDelayReadme} />
    <CodeExample title="SortableList" code={ListWithDelayRawCombined}>
      <ListWithDelay />
    </CodeExample>
  </div>
);
