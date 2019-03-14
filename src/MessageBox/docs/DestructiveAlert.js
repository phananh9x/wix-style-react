import React from 'react';
import TabbedView from 'wix-storybook-utils/TabbedView';
import Markdown from 'wix-storybook-utils/Markdown';
import CodeExample from 'wix-storybook-utils/CodeExample';

import Readme from '../README.md';
import ReadmeTestKit from '../README.TESTKIT.md';

import StandardMessageBoxFunctionalLayout from './DestructiveAlertExamples/Standard';
import StandardMessageBoxFunctionalLayoutRaw from '!raw-loader!./DestructiveAlertExamples/Standard';

import SecondaryMessageBoxFunctionalLayout from './DestructiveAlertExamples/Secondary';
import SecondaryMessageBoxFunctionalLayoutRaw from '!raw-loader!./DestructiveAlertExamples/Secondary';

const introduction = `# Destructive Alert (\`<MessageBoxFunctionalLayout/>\`)
Components to be used within \`wix-style-react/Modal\`:
`;

const layoutStyles = {
  margin: '0 30px',
};

export default () => (
  <TabbedView tabs={['Usage', 'API', 'TestKits']}>
    <div>
      <Markdown source={introduction} />
      <div style={layoutStyles}>
        <CodeExample
          title="Standard"
          code={StandardMessageBoxFunctionalLayoutRaw}
          children={<StandardMessageBoxFunctionalLayout />}
        />
        <CodeExample
          title="Secondary Action"
          code={SecondaryMessageBoxFunctionalLayoutRaw}
          children={<SecondaryMessageBoxFunctionalLayout />}
        />
      </div>
    </div>

    <Markdown source={Readme} />

    <Markdown source={ReadmeTestKit} />
  </TabbedView>
);
