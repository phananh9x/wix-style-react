import React from 'react';

import Markdown from 'wix-storybook-utils/Markdown';

import { Layout, Cell } from 'wix-style-react/Layout';
import LiveCodeExample, {
  createPropsArray,
} from '../../../../stories/utils/LiveCodeExample';

const createStaticPopoverExample = props => `
<div
  style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'auto',
    height: 80
  }}
>
  <Popover
    shown
    showArrow
    placement="right"
    appendTo="scrollParent"
    ${createPropsArray(props).join('\n        ')}
  >
    <Popover.Element>
      <Button>I am a plain Button</Button>
    </Popover.Element>
    <Popover.Content>
      <div style={{ padding: '12px 24px', textAlign: 'center', width: 180 }}>
        <Text size="small" skin="standard" weight="normal">
          I am a very long popover's content
        </Text>
      </div>
    </Popover.Content>
  </Popover>
</div>
`;

export default () => (
  <div style={{ maxWidth: 1254 }} data-hook="story-popover-flip-behaviour">
    <Markdown
      source={`
The \`<Popover/>\` uses the \`flip\` behaviour by default. This behaviour used to flip the
\`<Popover/>\`'s placement when it starts to overlap the target element (\`<Popover.Element/>\`).
      `}
    />

    <Layout>
      <Cell span={6}>
        <LiveCodeExample
          compact
          title={`Flip enabled and placement="right"`}
          initialCode={createStaticPopoverExample({ flip: true })}
        />
      </Cell>

      <Cell span={6}>
        <LiveCodeExample
          compact
          title={`Flip disabled and placement="right"`}
          initialCode={createStaticPopoverExample({ flip: false })}
        />
      </Cell>
    </Layout>
  </div>
);
