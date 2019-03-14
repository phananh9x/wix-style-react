import React from 'react';

import Markdown from 'wix-storybook-utils/Markdown';

import { Layout, Cell } from 'wix-style-react/Layout';
import LiveCodeExample, {
  createPropsArray,
} from '../../../../stories/utils/LiveCodeExample';

const createClickablePopoverExample = props => `
class ClickablePopover extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shown: false
    };
  }

  toggle() {
    this.setState(({ shown }) => ({ shown: !shown }));
  }

  close() {
    this.setState({ shown: false });
  }

  render() {
    const { shown } = this.state;

    return (
      <Popover
        showArrow
        animate
        placement="right"
        shown={shown}
        onClickOutside={() => this.close()}
        ${createPropsArray(props).join('\n        ')}
      >
        <Popover.Element>
          <Button onClick={() => this.toggle()}>Click me to toggle</Button>
        </Popover.Element>
        <Popover.Content>
          <div style={{ padding: '12px 24px', textAlign: 'center', width: 140 }}>
            <Text size="small" skin="standard" weight="normal">
              Try to click me now!
            </Text>
          </div>
        </Popover.Content>
      </Popover>
    );
  }
}
`;

const createHoverablePopoverExamle = props => `
class HoverablePopover extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      shown: false
    };
  }

  open() {
    this.setState({ shown: true });
  }

  close() {
    this.setState({ shown: false });
  }

  render() {
    const { shown } = this.state;

    return (
      <Popover
        showArrow
        animate
        placement="right"
        shown={shown}
        onMouseEnter={() => this.open()}
        onMouseLeave={() => this.close()}
        ${createPropsArray(props).join('\n        ')}
      >
        <Popover.Element>
          <Button>Hover me to open</Button>
        </Popover.Element>
        <Popover.Content>
          <div style={{ padding: '12px 24px', textAlign: 'center', width: 120 }}>
            <Text size="small" skin="standard" weight="normal">
              Now hover me!
            </Text>
          </div>
        </Popover.Content>
      </Popover>
    );
  }
}
`;

export default () => (
  <div style={{ maxWidth: 1254 }}>
    <Markdown
      source={`
A Popover can be interactive when setting \`appendTo="parent"\` or a \`hideDelay\`. This means the
event handlers set directly on the \`<Popover/>\` component will be triggerd on both the
\`<Popover.Element/>\` and \`<Popover.Content/>\`

#### Using click handlers

The following example uses the \`onClick\` and the \`onClickOutside\` handlers
to toggle the Popover. Notice that in the non-interative example, when clicking
the \`<Popover.Content/>\`, the \`onClickOutside\` event fires.
      `}
    />

    <Layout>
      <Cell span={6}>
        <LiveCodeExample
          compact
          title={`Interactive with appendTo="parent"`}
          initialCode={createClickablePopoverExample({ appendTo: 'parent' })}
        />
      </Cell>

      <Cell span={6}>
        <LiveCodeExample
          compact
          title="Non-Interactive"
          initialCode={createClickablePopoverExample({ appendTo: 'window' })}
        />
      </Cell>
    </Layout>
    <Markdown
      source={`
#### Using mouse events

A similar approach can be used with mouse events handlers (\`onMouseEnter\`,
\`onMouseLeave\`). Notice that in the non-interative example, the
\`onMouseLeave\` event fires when entering the \`<Popover.Content/>\`.
      `}
    />

    <Layout>
      <Cell span={6}>
        <LiveCodeExample
          compact
          title={`Interactive with appendTo="parent"`}
          initialCode={createHoverablePopoverExamle({ appendTo: 'parent' })}
        />
      </Cell>

      <Cell span={6}>
        <LiveCodeExample
          compact
          title={`Interactive with hideDelay={150}`}
          initialCode={createHoverablePopoverExamle({
            hideDelay: 150,
          })}
        />
      </Cell>

      <Cell span={6}>
        <LiveCodeExample
          compact
          title="Non-Interactive"
          initialCode={createHoverablePopoverExamle({ appendTo: 'window' })}
        />
      </Cell>
    </Layout>
  </div>
);
