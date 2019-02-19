import React from 'react';

import CodeExample from 'wix-storybook-utils/CodeExample';
import Markdown from 'wix-storybook-utils/Markdown';

import SingleAreaListWithAnimationReadme from './SingleAreaListWithAnimationReadme.md';
import SingleAreaListWithAnimation from './SingleAreaListWithAnimation';
import SingleAreaListWithAnimationRaw from '!raw-loader!./SingleAreaListWithAnimation';
import SingleAreaListWithAnimationScssRaw from '!raw-loader!./SingleAreaListWithAnimation.scss';

const SingleAreaListWithAnimationRawCombined = `
${SingleAreaListWithAnimationRaw}

//IntroductionExample.scss
${SingleAreaListWithAnimationScssRaw}
`;

export default () => (
  <div>
    <Markdown source={SingleAreaListWithAnimationReadme} />
    <CodeExample
      title="SortableList"
      code={SingleAreaListWithAnimationRawCombined}
    >
      <SingleAreaListWithAnimation />
    </CodeExample>
  </div>
);
