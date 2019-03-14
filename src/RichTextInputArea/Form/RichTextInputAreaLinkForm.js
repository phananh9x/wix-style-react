import React from 'react';

import RichTextInputAreaForm from './RichTextInputAreaForm';
import Box from '../../Box';
import Input from '../../Input';

class RichTextInputAreaLinkForm extends React.PureComponent {
  state = {
    text: '',
    url: '',
  };

  constructor(props) {
    super(props);

    const { defaultData = {} } = props;
    const { text = '', url = '' } = defaultData;

    this.state = {
      text,
      url,
    };
  }

  render() {
    const { dataHook, onCancel } = this.props;

    return (
      <RichTextInputAreaForm
        dataHook={dataHook}
        onSubmit={this._onSubmit}
        onCancel={onCancel}
        isDisabled={this.state.url.length === 0}
      >
        <Box marginBottom={2}>
          <Input
            placeholder="Text to display"
            size="small"
            value={this.state.text}
            onChange={event => this._setInputValue(event, 'text')}
          />
        </Box>
        <Input
          placeholder="URL this link should go"
          size="small"
          value={this.state.url}
          onChange={event => this._setInputValue(event, 'url')}
        />
      </RichTextInputAreaForm>
    );
  }

  _setInputValue(event, key) {
    const {
      target: { value },
    } = event;

    this.setState({ [key]: value });
  }

  _onSubmit = event => {
    event.preventDefault();

    const { onSubmit } = this.props;
    onSubmit && onSubmit(event, this.state);
  };
}

export default RichTextInputAreaLinkForm;
