import React from 'react';

import Markdown from 'wix-storybook-utils/Markdown';

import { Layout, Cell } from 'wix-style-react/Layout';
import LiveCodeExample, {
  createPropsArray,
} from '../../../../stories/utils/LiveCodeExample';

const createStaticPopoverExample = (props, dataHook) => `
const ScrollableContent = ({ children }) => (
  <div
    style={{
      overflow: 'hidden',
      position: 'relative',
      border: '1px solid black',
    }}
  >
    <div
      data-hook="${dataHook}"
      style={{
        overflow: 'auto',
        height: 120,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div style={{ padding: '70px 25px 100px' }}>
        {children}
      </div>
    </div>
  </div>
);

const StaticPopover = () => (
  <Popover
    shown
    showArrow
    placement="top"
    appendTo="scrollParent"
    ${createPropsArray(props).join('\n        ')}
  >
    <Popover.Element>
      <Button>I am a plain Button</Button>
    </Popover.Element>
    <Popover.Content>
      <div style={{ padding: '12px 24px', textAlign: 'center' }}>
        <Text size="small" skin="standard" weight="normal">
          Content
        </Text>
      </div>
    </Popover.Content>
  </Popover>
);

render(
  <ScrollableContent>
    <StaticPopover />
  </ScrollableContent>
);
`;

export default () => (
  <div style={{ maxWidth: 1254 }}>
    <Markdown
      source={`
You can set the \`fixed\` behaviour for the \`<Popover/>\` component (which is **disabled** by
default).

This behaviour used to keep the \`<Popover/>\` in it's original placement. By default this behaviour
is disabled, and the \`<Popover/>\` will change it's position when it'll being positioned outside
the boundary (the boundry is the value of the \`appendTo\` prop).
      `}
    />

    <Layout>
      <Cell span={6}>
        <LiveCodeExample
          compact
          autoRender={false}
          title={`Fixed disabled (default) and placement="top"`}
          initialCode={createStaticPopoverExample(
            { fixed: false },
            'story-popover-fixed-disabled',
          )}
        />
      </Cell>

      <Cell span={6}>
        <LiveCodeExample
          compact
          autoRender={false}
          title={`Fixed enabled and placement="top"`}
          initialCode={createStaticPopoverExample(
            { fixed: true },
            'story-popover-fixed-enabled',
          )}
        />
      </Cell>

      <Cell span={6}>
        <LiveCodeExample
          compact
          autoRender={false}
          title={`Fixed disabled and placement="top" and flip={false}`}
          initialCode={createStaticPopoverExample(
            {
              fixed: false,
              flip: false,
            },
            'story-popover-fixed-disabled-flip-disabled',
          )}
        />
      </Cell>
    </Layout>
  </div>
);
