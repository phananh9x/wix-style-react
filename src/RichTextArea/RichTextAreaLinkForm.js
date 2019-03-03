import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormField from '../FormField';
import Button from '../Button';
import X from '../new-icons/X';
import Check from '../new-icons/Check';
import Input from '../Input';
import styles from './RichTextAreaLinkForm.scss';

class RichTextAreaLinkForm extends Component {
  state = {
    text: this.props.selection,
  };

  getChangeHandler = field => ({ target: { value } }) => {
    this.setState({ [field]: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { onSubmit } = this.props;
    onSubmit && onSubmit(this.state);
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderTextInput()}
        <div className={styles.input}>
          <FormField>
            <Input
              dataHook="rich-text-area-link-url"
              onChange={this.getChangeHandler('href')}
              placeholder="URL this link should go to"
              size="small"
              width="190px"
            />
          </FormField>
        </div>
        <div className={styles.buttons}>
          <span className={styles.button}>
            <Button
              theme="icon-standardsecondary"
              onClick={this.props.onCancel}
              height="small"
              type="button"
            >
              <X />
            </Button>
          </span>
          <span className={styles.button}>
            <Button
              dataHook="rich-text-area-submit-button"
              theme="icon-standard"
              height="small"
              type="submit"
              disabled={!this.state.href}
            >
              <Check />
            </Button>
          </span>
        </div>
      </form>
    );
  }

  renderTextInput() {
    return (
      <div className={styles.input}>
        <FormField>
          <Input
            dataHook="rich-text-area-link-text"
            defaultValue={this.props.selection}
            onChange={this.getChangeHandler('text')}
            placeholder="Text to display"
            size="small"
            width="190px"
          />
        </FormField>
      </div>
    );
  }
}

RichTextAreaLinkForm.propTypes = {
  selection: PropTypes.string,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  isTextInputVisible: PropTypes.bool,
};

export default RichTextAreaLinkForm;
