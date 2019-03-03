import React from 'react';
import PropTypes from 'prop-types';
import {
  EditorState,
  Editor,
  ContentState,
  convertFromHTML,
  convertToRaw,
  CompositeDecorator,
} from 'draft-js';
import draftToHtml from 'draftjs-to-html';

import styles from './RichTextInputArea.scss';
import RichTextToolbar from './RichTextToolbar';
import { entityTypes } from './RichTextInputAreaTypes';

const findLinkEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();

    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === entityTypes.link
    );
  }, callback);
};

const decorator = new CompositeDecorator([
  {
    strategy: findLinkEntities,
    component: ({ contentState, entityKey, children }) => {
      const { url } = contentState.getEntity(entityKey).getData();

      return (
        <a href={url} className={styles.link}>
          {children}
        </a>
      );
    },
  },
]);

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
    editorState: EditorState.createEmpty(decorator),
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
          dataHook="richtextarea-toolbar"
          className={styles.toolbar}
          editorState={this.state.editorState}
          onBold={this._setEditorState}
          onItalic={this._setEditorState}
          onUnderline={this._setEditorState}
          onLink={newEditorState => {
            this._setEditorState(newEditorState, () =>
              setTimeout(() => this.refs.editor.focus(), 0),
            );
          }}
          onBulletedList={this._setEditorState}
          onNumberedList={this._setEditorState}
        />
        <Editor
          ref="editor"
          editorState={this.state.editorState}
          onChange={this._onEditorChange}
        />
      </div>
    );
  }

  _setEditorState = (editorState, onDone) =>
    this.setState({ editorState }, onDone);

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
