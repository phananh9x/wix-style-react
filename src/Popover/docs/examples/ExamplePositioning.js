import React from 'react';

import { Layout, Cell } from 'wix-style-react/Layout';
import Popover from 'wix-style-react/Popover';
import Button from 'wix-style-react/Button';

class PositionedPopover extends React.Component {
  state = {
    shown: false,
  };

  open = () => this.setState({ shown: true });
  close = () => this.setState({ shown: false });

  render() {
    const { shown } = this.state;

    return (
      <div style={{ padding: '10px 0' }}>
        <Popover
          appendTo="window"
          dataHook={`story-popover-positioning-${this.props.placement}`}
          shown={shown}
          onMouseEnter={this.open}
          onMouseLeave={this.close}
          style={{ display: 'block' }}
          {...this.props}
        >
          <Popover.Element>
            <Button size="tiny" fullWidth>
              {this.props.placement}
            </Button>
          </Popover.Element>
          <Popover.Content>
            <div style={{ padding: 10, fontSize: 12 }}>Content</div>
          </Popover.Content>
        </Popover>
      </div>
    );
  }
}

const PopoversRow = ({ placements }) => (
  <Layout cols={5}>
    {placements.map(placement => (
      <Cell
        span={1}
        children={
          placement ? <PositionedPopover placement={placement} /> : null
        }
      />
    ))}
  </Layout>
);

export default () => (
  <div
    data-hook="story-popover-positioning"
    style={{
      maxWidth: 1254,
      padding: 50,
      backgroundColor: '#DFE5EB',
      display: 'flex',
      justifyContent: 'center',
    }}
  >
    <div style={{ maxWidth: 600 }}>
      <PopoversRow placements={['', 'top-start', 'top', 'top-end', '']} />
      <PopoversRow placements={['left-start', '', '', '', 'right-start']} />
      <PopoversRow placements={['left', '', '', '', 'right']} />
      <PopoversRow placements={['left-end', '', '', '', 'right-end']} />
      <PopoversRow
        placements={['', 'bottom-start', 'bottom', 'bottom-end', '']}
      />
    </div>
  </div>
);
