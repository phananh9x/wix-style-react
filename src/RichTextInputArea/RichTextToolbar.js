import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { EditorState, RichUtils } from 'draft-js';

import styles from './RichTextToolbar.scss';
import RichTextToolbarButton from './RichTextToolbarButton';
import TextAreaBold from '../new-icons/system/TextAreaBold';
import TextAreaItalic from '../new-icons/system/TextAreaItalic';
import TextAreaUnderline from '../new-icons/system/TextAreaUnderline';
import TextAreaBulletList from '../new-icons/system/TextAreaBulletList';
import TextAreaNumberedList from '../new-icons/system/TextAreaNumberedList';

const inlineStyleTypes = {
  bold: 'BOLD',
  italic: 'ITALIC',
  underline: 'UNDERLINE',
};

const blockTypes = {
  bulletedList: 'unordered-list-item',
  numberedList: 'ordered-list-item',
};

const RichTextToolbar = ({
  className,
  editorState,
  onBold,
  onItalic,
  onUnderline,
  onBulletedList,
  onNumberedList,
}) => {
  const toggleStyle = (event, onClick, toggledStyle) => {
    event.preventDefault();

    onClick(
      RichUtils.toggleInlineStyle(
        EditorState.forceSelection(editorState, editorState.getSelection()),
        toggledStyle,
      ),
    );
  };

  const toggleBlockType = (event, onClick, toggledBlockType) => {
    event.preventDefault();

    onClick(
      RichUtils.toggleBlockType(
        EditorState.forceSelection(editorState, editorState.getSelection()),
        toggledBlockType,
      ),
    );
  };

  const isActive = style => {
    return editorState && editorState.getCurrentInlineStyle().has(style);
  };

  const buttons = [
    {
      type: inlineStyleTypes.bold,
      onClick: event => toggleStyle(event, onBold, inlineStyleTypes.bold),
      icon: TextAreaBold,
      tooltipText: 'Bold',
    },
    {
      type: inlineStyleTypes.italic,
      onClick: event => toggleStyle(event, onItalic, inlineStyleTypes.italic),
      icon: TextAreaItalic,
      tooltipText: 'Italic',
    },
    {
      type: inlineStyleTypes.underline,
      onClick: event =>
        toggleStyle(event, onUnderline, inlineStyleTypes.underline),
      icon: TextAreaUnderline,
      tooltipText: 'Underline',
    },
    {
      type: blockTypes.bulletedList,
      onClick: event =>
        toggleBlockType(event, onBulletedList, blockTypes.bulletedList),
      icon: TextAreaBulletList,
      tooltipText: 'Bulleted List',
    },
    {
      type: blockTypes.numberedList,
      onClick: event =>
        toggleBlockType(event, onNumberedList, blockTypes.numberedList),
      icon: TextAreaNumberedList,
      tooltipText: 'Numbered List',
    },
  ];

  return (
    <div className={classNames(className, styles.root)}>
      {buttons.map((button, index) => {
        const { type, onClick, tooltipText, icon: Icon } = button;

        return (
          <RichTextToolbarButton
            key={`${index}-${type}`}
            onClick={onClick}
            tooltipText={tooltipText}
            isActive={isActive(type)}
          >
            <Icon />
          </RichTextToolbarButton>
        );
      })}
    </div>
  );
};

export default RichTextToolbar;
