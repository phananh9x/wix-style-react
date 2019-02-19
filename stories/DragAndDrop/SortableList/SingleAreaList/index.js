import React from 'react';

import CodeExample from 'wix-storybook-utils/CodeExample';
import Markdown from 'wix-storybook-utils/Markdown';

import SingleAreaListReadme from './SingleAreaListReadme.md';
import SingleAreaList from './SingleAreaList';
import SingleAreaListRaw from '!raw-loader!./SingleAreaList';
import SingleAreaListScssRaw from '!raw-loader!./SingleAreaList.scss';

const SingleAreaListRawCombined = `
${SingleAreaListRaw}

//IntroductionExample.scss
${SingleAreaListScssRaw}
`;

export default () => (
  <div>
    <Markdown source={SingleAreaListReadme} />
    <CodeExample title="ListWithDelay" code={SingleAreaListRawCombined}>
      <SingleAreaList />
    </CodeExample>
    <CodeExample
      title="ListWithDelay with handle"
      code={SingleAreaListRawCombined}
    >
      <SingleAreaList withHandle />
    </CodeExample>
  </div>
);
