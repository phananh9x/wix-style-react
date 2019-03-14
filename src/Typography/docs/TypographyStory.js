import React from 'react';
import { storiesOf } from '@storybook/react';

import Markdown from 'wix-storybook-utils/Markdown';
import { Category } from '../../../stories/storiesHierarchy';
import {
  Title,
  IncludedComponents,
  StoryLink,
} from '../../../stories/UXStoryTemplate';

import styles from './styles.scss';
import CodeExample from 'wix-storybook-utils/CodeExample';

import BasicExample from './BasicExample';
import BasicExampleRaw from '!raw-loader!./BasicExample';

import HeadingExamples from './HeadingExamples';
import HeadingExamplesRaw from '!raw-loader!./HeadingExamples';

import TextExamples from './TextExamples';
import TextExamplesRaw from '!raw-loader!./TextExamples';

storiesOf(Category.FOUNDATION, module).add('1.2 Typography', () => {
  return (
    <div>
      <Title>1.2 Typography</Title>
      <Markdown
        source={`
The recommended way to use Wix-Style-React typography is via components: \`<Text/>\` and \`<Heading/>\`.<br/>
Using these components gives you also ellipsis with tooptip.<br/>
You can also use typography css classes directly. See Styling->Typography.
`}
      />
      <p>
        See <StoryLink kind="Styling" story="1.2 Typography Classes" />
      </p>
      <CodeExample title="Basic Usage" code={BasicExampleRaw} autoExpand>
        <div className={styles.codeExample}>
          <BasicExample />
        </div>
      </CodeExample>
      <IncludedComponents componentNames={['Text', 'Heading']} />
      <CodeExample title="<Heading/> Examples" code={HeadingExamplesRaw}>
        <div className={styles.codeExample}>
          <HeadingExamples />
        </div>
      </CodeExample>
      <CodeExample title="<Text/> Examples" code={TextExamplesRaw}>
        <div className={styles.codeExample}>
          <TextExamples />
        </div>
      </CodeExample>
    </div>
  );
});
