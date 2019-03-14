import { EditorState, SelectionState, Modifier, RichUtils } from 'draft-js';

import { entityTypes } from './RichTextInputAreaTypes';

/** Returns whether the specified style is applied on a block */
const hasStyle = (editorState, style) => {
  const currentStyle = editorState.getCurrentInlineStyle();

  return currentStyle.has(style);
};

/** Returns whether a block with the specified type exists */
const hasBlockType = (editorState, blockType) => {
  const selection = editorState.getSelection();
  const currentBlockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return currentBlockType === blockType;
};

/** Returns whether the specified entity is applied on a block */
const hasEntity = (editorState, entity) => {
  const selection = editorState.getSelection();
  const contentState = editorState.getCurrentContent();
  const currentKey = contentState
    .getBlockForKey(selection.getStartKey())
    .getEntityAt(selection.getStartOffset());

  if (currentKey) {
    const currentEntity = contentState.getEntity(currentKey);

    return currentEntity.type === entity;
  }

  return false;
};

/** Returns an EditorState with the rendered selection.
 * Mainly useful in order to maintain the selection after creating new state */
const keepCurrentSelection = editorState =>
  EditorState.forceSelection(editorState, editorState.getSelection());

/** Returns an EditorState so that the specified style is toggled on the selection */
const toggleStyle = (editorState, toggledStyle) => {
  return RichUtils.toggleInlineStyle(
    keepCurrentSelection(editorState),
    toggledStyle,
  );
};

/** Returns an EditorState so that the specified block type is toggled on the selection */
const toggleBlockType = (editorState, toggledBlockType) => {
  return RichUtils.toggleBlockType(
    keepCurrentSelection(editorState),
    toggledBlockType,
  );
};

const toggleEntity = (editorState, linkData) => {
  const { href: url = '', text = '' } = linkData;
  const selection = editorState.getSelection();
  const contentState = editorState.getCurrentContent();
  const contentStateWithEntity = contentState.createEntity('LINK', 'MUTABLE', {
    url,
  });
  const entityKey = contentStateWithEntity.getLastCreatedEntityKey();

  let newEditorState;
  let newSelection = selection;

  // In case there is selected text
  if (!selection.isCollapsed()) {
    newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });

    // TODO: Add logic for editing existing entity
  } else {
    const startPosition = selection.getStartOffset();
    const endPosition = startPosition + text.length;

    // A key for the block that containing the start of the selection range
    const blockKey = selection.getStartKey();

    // Replaces the content in specified selection range with text
    const newContentState = Modifier.insertText(contentState, selection, text);

    newSelection = new SelectionState({
      anchorOffset: startPosition,
      anchorKey: blockKey,
      focusOffset: endPosition,
      focusKey: blockKey,
    });

    newEditorState = EditorState.push(
      editorState,
      newContentState,
      'insert-characters',
    );
  }

  return RichUtils.toggleLink(newEditorState, newSelection, entityKey);
};

const getSelectedText = editorState => {
  const selection = editorState.getSelection();
  const currentContent = editorState.getCurrentContent();

  // Resolves the current block of the selection
  const anchorKey = selection.getAnchorKey();
  const currentBlock = currentContent.getBlockForKey(anchorKey);

  // Resolves the starting and ending position of current block
  const startPosition = selection.getStartOffset();
  const endPosition = selection.getEndOffset();

  const selectedText = currentBlock.getText().slice(startPosition, endPosition);

  return selectedText;
};

const findLinkEntities = (contentBlock, callback, contentState) => {
  contentBlock.findEntityRanges(character => {
    const entityKey = character.getEntity();

    return (
      entityKey !== null &&
      contentState.getEntity(entityKey).getType() === entityTypes.link
    );
  }, callback);
};

export default {
  hasStyle,
  hasBlockType,
  hasEntity,
  toggleStyle,
  toggleBlockType,
  toggleEntity,
  getSelectedText,
  findLinkEntities,
};
