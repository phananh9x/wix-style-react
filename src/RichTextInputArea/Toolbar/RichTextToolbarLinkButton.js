import React from 'react';

import RichTextToolbarButton from './RichTextToolbarButton';
import RichTextInputAreaLinkForm from '../Form/RichTextInputAreaLinkForm';
import Popover from '../../Popover';
import Box from '../../Box';

class RichTextToolbarLinkButton extends React.PureComponent {
  state = {
    isFormShown: false,
  };

  render() {
    const { dataHook, tooltipText, isActive, children, data } = this.props;
    const { isFormShown } = this.state;

    return (
      <Popover
        appendTo="parent"
        placement="bottom"
        showArrow
        animate
        shown={isFormShown}
        onClickOutside={this._hideForm}
      >
        <Popover.Element>
          <RichTextToolbarButton
            dataHook={dataHook}
            onClick={() => this.setState({ isFormShown: !isFormShown })}
            tooltipText={tooltipText}
            isActive={isActive || this.state.isFormShown}
          >
            {children}
          </RichTextToolbarButton>
        </Popover.Element>
        <Popover.Content>
          <Box padding={'20px'}>
            <RichTextInputAreaLinkForm
              dataHook="richtextarea-form"
              onSubmit={this._handleSubmit}
              onCancel={this._hideForm}
              defaultData={data}
            />
          </Box>
        </Popover.Content>
      </Popover>
    );
  }

  _hideForm = () => {
    this.setState({
      isFormShown: false,
    });
  };

  _handleSubmit = (event, linkData) => {
    const { onClick } = this.props;

    onClick(event, linkData);
    this._hideForm();
  };
}

export default RichTextToolbarLinkButton;
