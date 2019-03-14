import React from 'react';
import TabbedView from 'wix-storybook-utils/TabbedView';
import Markdown from 'wix-storybook-utils/Markdown';
import CodeExample from 'wix-storybook-utils/CodeExample';

import Readme from '../README.md';
import ReadmeTestKit from '../README.TESTKIT.md';
import { RTLWrapper } from '../../../stories/utils/RTLWrapper';

import AnnouncementStandard from './AnnouncementExamples/Standard';
import AnnouncementStandardRaw from '!raw-loader!./AnnouncementExamples/Standard';

import PremiumAction from './AnnouncementExamples/PremiumAction';
import PremiumActionRaw from '!raw-loader!./AnnouncementExamples/PremiumAction';

import DisabledAction from './AnnouncementExamples/DisabledAction';
import DisabledActionRaw from '!raw-loader!./AnnouncementExamples/DisabledAction';

import Footnote from './AnnouncementExamples/Footnote';
import FootnoteRaw from '!raw-loader!./AnnouncementExamples/Footnote';

const introduction = `# Announcement (\`<MessageBoxMarketerialLayout/>\`)
Components to be used within \`wix-style-react/Modal\`:
`;

const layoutStyles = {
  margin: '0 30px',
};

export default () => (
  <TabbedView tabs={['Usage', 'API', 'TestKits']}>
    <div>
      <Markdown source={introduction} />
      <RTLWrapper>
        <div style={layoutStyles}>
          <CodeExample
            title="Standard"
            code={AnnouncementStandardRaw}
            children={<AnnouncementStandard />}
          />
          <CodeExample
            title="Premium Action"
            code={PremiumActionRaw}
            children={<PremiumAction />}
          />
          <CodeExample
            title="Footnote"
            code={FootnoteRaw}
            children={<Footnote />}
          />
          <CodeExample
            title="Disabled Action"
            code={DisabledActionRaw}
            children={<DisabledAction />}
          />
        </div>
      </RTLWrapper>
    </div>

    <Markdown source={Readme} />

    <Markdown source={ReadmeTestKit} />
  </TabbedView>
);
