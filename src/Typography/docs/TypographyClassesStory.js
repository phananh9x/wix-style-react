import React from 'react';
import { storiesOf } from '@storybook/react';
import CodeExample from 'wix-storybook-utils/CodeExample';
import Markdown from 'wix-storybook-utils/Markdown';

import { Category } from '../../../stories/storiesHierarchy';
import { Title, Section, StoryLink } from '../../../stories/UXStoryTemplate';

import styles from './styles.scss';

import BasicClassesExample from './BasicClassesExample';
import BasicClassesExampleRaw from '!raw-loader!./BasicClassesExample';

import BasicClassesSassExampleJs from './BasicClassesSassExample.js';
import BasicClassesSassExampleJsRaw from '!raw-loader!./BasicClassesSassExample.js';
import BasicClassesSassExampleSassRaw from '!raw-loader!./BasicClassesSassExample.scss';

import TypographyClassesTableRaw from '!raw-loader!./TypographyClassesTable.md';
import TypographyClassesMigration from '!raw-loader!./TypographyClassesMigration.md';

storiesOf(Category.STYLING, module).add('1.2 Typography Classes', () => {
  return (
    <div>
      <Title>1.2 Typography Classes</Title>
      <Section title="Typography Components">
        <Markdown
          source={`
The recommended way to use Wix-Style-React typography is via components: \`<Text/>\` and \`<Heading/>\`.<br/>
Using these components gives you also ellipsis with tooptip.<br/>
`}
        />
        <p>
          See <StoryLink kind={Category.FOUNDATION} story="1.2 Typography" />
        </p>
      </Section>
      <Section title="Typography Classes">
        <Markdown
          source={`
In case the \`<Text/>\` and \`<Heading/>\` components do not suit your need, you can use the Typography classes directly.
> Note: some styles are available only by using typography CSS classes (like link and disabled text colors)
`}
        />
        <CodeExample
          title="Basic Example (JS)"
          code={BasicClassesExampleRaw}
          autoExpand
        >
          <div className={styles.codeExample}>
            <BasicClassesExample />
          </div>
        </CodeExample>

        <CodeExample
          title="Basic Example (Sass)"
          code={BasicClassesSassExampleJsRaw + BasicClassesSassExampleSassRaw}
          autoExpand
        >
          <div className={styles.codeExample}>
            <BasicClassesSassExampleJs />
          </div>
        </CodeExample>

        <Markdown source={TypographyClassesTableRaw} />
        <Section title="Typography Classes Migration (from preior to WSR 5.6.x)">
          <Markdown source={TypographyClassesMigration} />
        </Section>
      </Section>
    </div>
  );
});
