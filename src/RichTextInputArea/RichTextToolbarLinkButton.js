import React from 'react';

import RichTextToolbarButton from './RichTextToolbarButton';
import RichTextAreaLinkForm from '../RichTextArea/RichTextAreaLinkForm';
import Popover from '../Popover';
import Box from '../Box';

class RichTextToolbarLinkButton extends React.PureComponent {
  state = {
    isPopoverShown: false,
  };

  render() {
    const { dataHook, tooltipText, isActive, children } = this.props;
    const { isPopoverShown } = this.state;

    return (
      <Popover
        appendTo="parent"
        placement="bottom"
        showArrow
        animate
        shown={isPopoverShown}
        onClickOutside={this._hidePopover}
      >
        <Popover.Element>
          <RichTextToolbarButton
            dataHook={dataHook}
            onClick={() => this.setState({ isPopoverShown: !isPopoverShown })}
            tooltipText={tooltipText}
            isActive={isActive}
          >
            {children}
          </RichTextToolbarButton>
        </Popover.Element>
        <Popover.Content>
          <Box padding={'12px 24px'}>
            <RichTextAreaLinkForm
              onSubmit={this._handleSubmit}
              onCancel={this._hidePopover}
            />
          </Box>
        </Popover.Content>
      </Popover>
    );
  }

  _hidePopover = () => {
    this.setState({
      isPopoverShown: false,
    });
  };

  _handleSubmit = linkData => {
    const { onClick } = this.props;

    onClick(linkData);
    this._hidePopover();
  };
}

export default RichTextToolbarLinkButton;
