import React from 'react';
import classNames from 'classnames';

import styles from './RichTextToolbar.scss';
import RichTextToolbarButton from './RichTextToolbarButton';
import RichTextToolbarLinkButton from './RichTextToolbarLinkButton';
import EditorUtilities from './EditorUtilities';
import {
  inlineStyleTypes,
  blockTypes,
  entityTypes,
} from './RichTextInputAreaTypes';
import {
  TextAreaBold,
  TextAreaItalic,
  TextAreaUnderline,
  TextAreaLink,
  TextAreaBulletList,
  TextAreaNumberedList,
} from '../new-icons/system';

const RichTextToolbar = ({
  dataHook,
  className,
  editorState,
  onBold,
  onItalic,
  onUnderline,
  onLink,
  onBulletedList,
  onNumberedList,
}) => {
  const toggleStyle = (event, onClick, toggledStyle) => {
    event.preventDefault();
    onClick(EditorUtilities.toggleStyle(editorState, toggledStyle));
  };

  const toggleBlockType = (event, onClick, toggledBlockType) => {
    event.preventDefault();
    onClick(EditorUtilities.toggleBlockType(editorState, toggledBlockType));
  };

  const toggleEntity = (event, onClick, linkData) => {
    onClick(EditorUtilities.toggleEntity(editorState, linkData));
  };

  const buttons = [
    {
      type: inlineStyleTypes.bold,
      onClick: event => toggleStyle(event, onBold, inlineStyleTypes.bold),
      buttonComponent: RichTextToolbarButton,
      iconComponent: TextAreaBold,
      isActive: () =>
        editorState &&
        EditorUtilities.hasStyle(editorState, inlineStyleTypes.bold),
      tooltipText: 'Bold',
    },
    {
      type: inlineStyleTypes.italic,
      onClick: event => toggleStyle(event, onItalic, inlineStyleTypes.italic),
      buttonComponent: RichTextToolbarButton,
      iconComponent: TextAreaItalic,
      isActive: () =>
        editorState &&
        EditorUtilities.hasStyle(editorState, inlineStyleTypes.italic),
      tooltipText: 'Italic',
    },
    {
      type: inlineStyleTypes.underline,
      onClick: event =>
        toggleStyle(event, onUnderline, inlineStyleTypes.underline),
      buttonComponent: RichTextToolbarButton,
      iconComponent: TextAreaUnderline,
      isActive: () =>
        editorState &&
        EditorUtilities.hasStyle(editorState, inlineStyleTypes.underline),
      tooltipText: 'Underline',
    },
    {
      type: entityTypes.link,
      onClick: (event, linkData) => toggleEntity(event, onLink, linkData),
      buttonComponent: RichTextToolbarLinkButton,
      buttonProps: {
        data: {
          text: editorState && EditorUtilities.getSelectedText(editorState),
        },
      },
      iconComponent: TextAreaLink,
      isActive: () =>
        editorState && EditorUtilities.hasEntity(editorState, entityTypes.link),
      tooltipText: 'Insert link',
    },
    {
      type: blockTypes.bulletedList,
      onClick: event =>
        toggleBlockType(event, onBulletedList, blockTypes.bulletedList),
      buttonComponent: RichTextToolbarButton,
      iconComponent: TextAreaBulletList,
      isActive: () =>
        editorState &&
        EditorUtilities.hasBlockType(editorState, blockTypes.bulletedList),

      tooltipText: 'Bulleted List',
    },
    {
      type: blockTypes.numberedList,
      onClick: event =>
        toggleBlockType(event, onNumberedList, blockTypes.numberedList),
      buttonComponent: RichTextToolbarButton,
      iconComponent: TextAreaNumberedList,
      isActive: () =>
        editorState &&
        EditorUtilities.hasBlockType(editorState, blockTypes.numberedList),
      tooltipText: 'Numbered List',
    },
  ];

  return (
    <div data-hook={dataHook} className={classNames(className, styles.root)}>
      {buttons.map((button, index) => {
        const {
          type,
          onClick,
          buttonComponent: Button,
          iconComponent: Icon,
          isActive,
          tooltipText,
          buttonProps,
        } = button;

        return (
          <Button
            key={`${index}-${type}`}
            dataHook={`richtextarea-button-${type.toLowerCase()}`}
            onClick={onClick}
            isActive={isActive()}
            tooltipText={tooltipText}
            {...buttonProps}
          >
            <Icon />
          </Button>
        );
      })}
    </div>
  );
};

export default RichTextToolbar;
