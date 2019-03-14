import { EditorState, ContentState, SelectionState } from 'draft-js';

import EditorUtilities from './EditorUtilities';
import {
  inlineStyleTypes,
  blockTypes,
  entityTypes,
} from './RichTextInputAreaTypes';

describe('EditorUtilities', () => {
  const linkEntity = {
    text: 'Test',
    url: 'http://wix.com',
  };

  let editorState;

  beforeEach(() => {
    editorState = EditorState.createEmpty();
  });

  describe('hasStyle', () => {
    it('should return true when editor contains a style', () => {
      const newEditorState = EditorUtilities.toggleStyle(
        editorState,
        inlineStyleTypes.bold,
      );

      expect(
        EditorUtilities.hasStyle(newEditorState, inlineStyleTypes.bold),
      ).toBe(true);
    });

    it(`should return false when editor contains a style but the selection doesn't`, () => {
      let newEditorState = EditorUtilities.toggleStyle(
        editorState,
        inlineStyleTypes.bold,
      );

      newEditorState = EditorState.moveSelectionToEnd(editorState);

      expect(
        EditorUtilities.hasStyle(newEditorState, inlineStyleTypes.bold),
      ).toBe(false);
    });
  });

  describe('hasBlockType', () => {
    it('should return true when editor contains a block type', () => {
      const newEditorState = EditorUtilities.toggleBlockType(
        editorState,
        blockTypes.bulletedList,
      );

      expect(
        EditorUtilities.hasBlockType(newEditorState, blockTypes.bulletedList),
      ).toBe(true);
    });

    it(`should return false when editor contains a block type but the selection doesn't`, () => {
      let newEditorState = EditorUtilities.toggleBlockType(
        editorState,
        inlineStyleTypes.bulletedList,
      );

      newEditorState = EditorState.moveSelectionToEnd(editorState);

      expect(
        EditorUtilities.hasBlockType(newEditorState, blockTypes.bulletedList),
      ).toBe(false);
    });
  });

  describe('hasEntity', () => {
    it('should return true when editor contains an entity', () => {
      const newEditorState = EditorUtilities.toggleEntity(
        editorState,
        linkEntity,
      );

      expect(EditorUtilities.hasEntity(newEditorState, entityTypes.link)).toBe(
        true,
      );
    });

    it(`should return false when editor contains an entity but the selection doesn't`, () => {
      let newEditorState = EditorUtilities.toggleEntity(
        editorState,
        linkEntity,
      );

      newEditorState = EditorState.moveSelectionToEnd(editorState);

      expect(EditorUtilities.hasEntity(newEditorState, entityTypes.link)).toBe(
        false,
      );
    });
  });

  it('should attach the specified style to a block', () => {
    const newEditorState = EditorUtilities.toggleStyle(
      editorState,
      inlineStyleTypes.italic,
    );

    expect(
      EditorUtilities.hasStyle(newEditorState, inlineStyleTypes.italic),
    ).toBe(true);
  });

  it('should attach the specified type to a block', () => {
    const newEditorState = EditorUtilities.toggleBlockType(
      editorState,
      blockTypes.numberedList,
    );

    expect(
      EditorUtilities.hasBlockType(newEditorState, blockTypes.numberedList),
    ).toBe(true);
  });

  describe('triggerEntity', () => {
    it('should attach the specified entity to a block', () => {
      const newEditorState = EditorUtilities.toggleEntity(
        editorState,
        linkEntity,
      );

      expect(EditorUtilities.hasEntity(newEditorState, entityTypes.link)).toBe(
        true,
      );
    });

    it('should insert the text of the specified entity to a block', () => {
      const initialText = editorState.getCurrentContent().getPlainText();

      const newEditorState = EditorUtilities.toggleEntity(
        editorState,
        linkEntity,
      );
      const currentText = newEditorState.getCurrentContent().getPlainText();

      expect(initialText).toEqual('');
      expect(currentText).toEqual(linkEntity.text);
    });
  });

  describe('getSelectedText', () => {
    it('should be empty when no text is selected', () => {
      expect(EditorUtilities.getSelectedText(editorState)).toEqual('');
    });

    it('should return the selected text', () => {
      const expectedText = 'Test2';
      editorState = EditorState.createWithContent(
        ContentState.createFromText(`Test1\n${expectedText}\nTest3`),
      );
      const middleBlock = editorState.getCurrentContent().getBlocksAsArray()[1];
      const anchorOffset = editorState.getSelection().getStartOffset();

      const newEditorState = EditorState.acceptSelection(
        editorState,
        new SelectionState({
          anchorOffset,
          anchorKey: middleBlock.getKey(),
          focusOffset: anchorOffset + middleBlock.getText().length,
          focusKey: middleBlock.getKey(),
        }),
      );

      expect(EditorUtilities.getSelectedText(newEditorState)).toEqual(
        expectedText,
      );
    });
  });
});
