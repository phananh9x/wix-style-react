import React from 'react';
import PropTypes from 'prop-types';
import {
  EditorState,
  Editor,
  ContentState,
  convertFromHTML,
  convertToRaw,
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';

import styles from './RichTextInputArea.scss';
import RichTextToolbar from './RichTextToolbar';

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
        <RichTextToolbar
          className={styles.toolbar}
          editorState={this.state.editorState}
          onBold={this._setEditorState}
          onItalic={this._setEditorState}
          onUnderline={this._setEditorState}
          onBulletedList={this._setEditorState}
          onNumberedList={this._setEditorState}
        />
        <Editor
          editorState={this.state.editorState}
          onChange={this._onEditorChange}
        />
      </div>
    );
  }

  _setEditorState = editorState => this.setState({ editorState });

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
