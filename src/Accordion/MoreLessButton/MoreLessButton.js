import React from 'react';
import styles from './MoreLessButton.scss';
import Button from '../../Button';
import ChevronDown from '../../new-icons/ChevronDown';
import ChevronUp from '../../new-icons/ChevronUp';
import classNames from 'classnames';
import TextButton from '../../TextButton';
import { BUTTON_TYPES } from '../constants';

export default ({
  dataHook,
  isOpen,
  handleClick,
  expandLabel,
  collapseLabel,
  hover,
  buttonType,
}) => {
  const toggleStyle = classNames(styles.toggleButtons, {
    [styles.open]: isOpen,
  });

  const buttonStyle = classNames(styles.button, {
    [styles.active]: isOpen,
  });

  const shouldRenderButton =
    hover && !isOpen && buttonType === BUTTON_TYPES.BUTTON;
  const shouldRenderTextButton =
    hover && !isOpen && buttonType === BUTTON_TYPES.TEXT_BUTTON;
  return (
    <div
      data-hook={dataHook}
      className={toggleStyle}
      onClick={e => {
        e.stopPropagation();
        handleClick();
      }}
    >
      {!hover && !isOpen && (
        <ChevronDown className={styles.expandCollapseArrow} size="24px" />
      )}
      {shouldRenderButton && (
        <Button
          dataHook="toggle-accordion-button"
          className={buttonStyle}
          priority={isOpen ? 'secondary' : 'primary'}
          size="small"
        >
          {expandLabel}
        </Button>
      )}
      {shouldRenderTextButton && (
        <TextButton
          dataHook="toggle-accordion-button"
          suffixIcon={<ChevronDown />}
          className={buttonStyle}
        >
          {expandLabel}
        </TextButton>
      )}
      {isOpen && (
        <TextButton
          dataHook="toggle-accordion-button"
          suffixIcon={<ChevronUp />}
          className={buttonStyle}
        >
          {collapseLabel}
        </TextButton>
      )}
    </div>
  );
};
