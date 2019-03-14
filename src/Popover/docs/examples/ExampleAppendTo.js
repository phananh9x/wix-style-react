import React from 'react';

import Markdown from 'wix-storybook-utils/Markdown';

import { Layout, Cell } from 'wix-style-react/Layout';

import LiveCodeExample, {
  createPropsArray,
} from '../../../../stories/utils/LiveCodeExample';

const createPopperWithStateExample = ({ shown = true, ...props }) => `
class PopoverWithState extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shown: ${shown}
    };
  }

  toggle() {
    this.setState(({ shown }) => ({ shown: !shown }));
  }

  render() {
    const { shown } = this.state;

    return (
      <Popover
        showArrow
        shown={shown}
        ${createPropsArray(props).join('\n        ')}
      >
        <Popover.Element>
          <Button onClick={() => this.toggle()}>Click me to toggle</Button>
        </Popover.Element>
        <Popover.Content>
          <div style={{ padding: '12px 24px', textAlign: 'center' }}>
            <Text size="small" skin="standard" weight="normal">
              I am the content!
            </Text>
          </div>
        </Popover.Content>
      </Popover>
    );
  }
}
`;

const createScrolParentExample = () => `
const ScrollableContent = ({ children }) => (
  <div
    style={{
      overflow: 'hidden',
      position: 'relative',
      border: '1px solid black',
    }}
  >
    <div
      style={{
        overflow: 'auto',
        height: 120,
      }}
    >
      <div style={{ padding: '25px 25px 150px' }}>
        {children}
      </div>
    </div>
  </div>
);

${createPopperWithStateExample({
  appendTo: 'scrollParent',
  placement: 'right',
})}

render(
  <ScrollableContent>
    <PopoverWithState />
  </ScrollableContent>
);
`;

const Section = ({ appendToProp, description, children }) => (
  <Layout>
    <Cell span={6}>
      <Markdown source={`#### \`appendTo="${appendToProp}"\``} />
      <Markdown source={description} />
    </Cell>

    <Cell span={6}>{children}</Cell>
  </Layout>
);

export default () => (
  <div style={{ maxWidth: 1254 }} data-hook="story-popover-append-to">
    <Section
      appendToProp="window"
      description="If you inspect the content, you'll see it is attached to a new `<div/>` under the body."
    >
      <LiveCodeExample
        compact
        initialCode={createPopperWithStateExample({
          appendTo: 'window',
          placement: 'right',
        })}
      />
    </Section>

    <Section
      appendToProp="viewport"
      description={`
This is similar to \`window\` as it also appends the content to a new \`<div/>\` under the body, but also set its boundry to the viewport.

_The Popover in the example is not shown by default._ Try to scroll out of the Popover's viewport to see the effect.
      `}
    >
      <LiveCodeExample
        compact
        initialCode={createPopperWithStateExample({
          shown: false,
          appendTo: 'viewport',
          placement: 'bottom',
        })}
      />
    </Section>

    <Section
      appendToProp="parent"
      description="If you inspect the content, you'll see it is attached to a new div next to the target element (the Button)."
    >
      <LiveCodeExample
        compact
        initialCode={createPopperWithStateExample({
          appendTo: 'parent',
          placement: 'right',
        })}
      />
    </Section>

    <Section
      appendToProp="scrollParent"
      description="If you inspect the content, you'll see it is attached to a new div under the list container."
    >
      <LiveCodeExample
        compact
        autoRender={false}
        initialCode={createScrolParentExample()}
      />
    </Section>
  </div>
);
