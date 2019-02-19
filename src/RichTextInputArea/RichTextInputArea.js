import React from 'react';
import PropTypes from 'prop-types';
import { ContentState, convertFromHTML, convertToRaw } from '@wix/draft-js';
import { EditorState, RichContentEditor } from 'wix-rich-content-editor';
import draftToHtml from 'draftjs-to-html';

import styles from './RichTextInputArea.scss';

class RichTextInputArea extends React.PureComponent {
  static displayName = 'RichTextInputArea';

  static propTypes = {
    dataHook: PropTypes.string,
    value: PropTypes.string,
    onChange: PropTypes.func,
  };

  static defaultProps = {
    value: '',
  };

  state = {
    editorState: EditorState.createEmpty(),
  };

  componentDidMount() {
    const { value } = this.props;

    // TODO: currently it treats the value as an initial value
    this._updateContentByValue(value);
  }

  render() {
    const { dataHook } = this.props;

    return (
      <div data-hook={dataHook} className={styles.root}>
        <RichContentEditor
          editorState={this.state.editorState}
          onChange={this._onEditorChange}
          textToolbarType="static"
        />
      </div>
    );
  }

  _onEditorChange = newEditorState => {
    this.setState({ editorState: newEditorState });

    const currentContent = this.state.editorState.getCurrentContent();
    const newContent = newEditorState.getCurrentContent();

    if (currentContent !== newContent) {
      const { onChange = () => {} } = this.props;
      const rawNewContent = convertToRaw(newContent);
      const newContentAsHtml = draftToHtml(rawNewContent);

      onChange(newContentAsHtml);
    }
  };

  _updateContentByValue = value => {
    const blocksFromHtml = convertFromHTML(value);
    if (blocksFromHtml.contentBlocks) {
      const content = ContentState.createFromBlockArray(blocksFromHtml);
      const updatedEditorState = EditorState.push(
        this.state.editorState,
        content,
      );
      this.setState({ editorState: updatedEditorState });
    }
  };
}

export default RichTextInputArea;
