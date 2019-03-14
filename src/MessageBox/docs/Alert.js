import React from 'react';
import TabbedView from 'wix-storybook-utils/TabbedView';
import Markdown from 'wix-storybook-utils/Markdown';
import CodeExample from 'wix-storybook-utils/CodeExample';

import Readme from '../README.md';
import ReadmeTestKit from '../README.TESTKIT.md';
import { RTLWrapper } from '../../../stories/utils/RTLWrapper';

import StandardAlert from './AlertExamples/Standard';
import StandardAlertRaw from '!raw-loader!./AlertExamples/Standard';

import SecondaryAlert from './AlertExamples/Secondary';
import SecondaryAlertRaw from '!raw-loader!./AlertExamples/Secondary';

import FootNoteAlert from './AlertExamples/FootNote';
import FootNoteAlertRaw from '!raw-loader!./AlertExamples/FootNote';

import Image from './AlertExamples/Image';
import ImageRaw from '!raw-loader!./AlertExamples/Image';

import ImageWithSideAction from './AlertExamples/ImageWithSideAction';
import ImageWithSideActionRaw from '!raw-loader!./AlertExamples/ImageWithSideAction';

import ScrollableAlert from './AlertExamples/Scrollable';
import ScrollableAlertRaw from '!raw-loader!./AlertExamples/Scrollable';

import EmptyStateAlert from './AlertExamples/EmptyState';
import EmptyStateAlertRaw from '!raw-loader!./AlertExamples/EmptyState';

import ActionsAlert from './AlertExamples/Actions';
import ActionsAlertRaw from '!raw-loader!./AlertExamples/Actions';

const introduction = `# Alert (\`<MessageBoxFunctionalLayout/>\`)
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
            code={StandardAlertRaw}
            children={<StandardAlert />}
          />
          <CodeExample
            title="Secondary Action"
            code={SecondaryAlertRaw}
            children={<SecondaryAlert />}
          />
          <CodeExample
            title="Footnote"
            code={FootNoteAlertRaw}
            children={<FootNoteAlert />}
          />
          <CodeExample
            title="With EmptyState"
            code={EmptyStateAlertRaw}
            children={<EmptyStateAlert />}
          />
          <CodeExample
            title="Scrollable"
            code={ScrollableAlertRaw}
            children={<ScrollableAlert />}
          />
          <CodeExample
            title="With image"
            code={ImageRaw}
            children={<Image />}
          />
          <CodeExample
            title="With Actions"
            code={ActionsAlertRaw}
            children={<ActionsAlert />}
          />
          <CodeExample
            title="With Image And Actions"
            code={ImageWithSideActionRaw}
            children={<ImageWithSideAction />}
          />
        </div>
      </RTLWrapper>
    </div>

    <Markdown source={Readme} />

    <Markdown source={ReadmeTestKit} />
  </TabbedView>
);
