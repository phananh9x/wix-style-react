import React from 'react';
import styles from './MoreLessButton.scss';
import Button from '../../Button';
import ChevronDown from '../../new-icons/ChevronDown';
import ChevronUp from '../../new-icons/ChevronUp';
import classNames from 'classnames';
import TextButton from '../../TextButton';

export default ({
  dataHook,
  isOpen,
  handleClick,
  expandLabel,
  collapseLabel,
  hover,
}) => {
  const toggleStyle = classNames(styles.toggleButtons, {
    [styles.open]: isOpen,
  });

  const buttonStyle = classNames(styles.button, {
    [styles.active]: isOpen,
  });
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
      {hover && !isOpen && (
        <Button
          dataHook="toggle-accordion-button"
          className={buttonStyle}
          priority={isOpen ? 'secondary' : 'primary'}
          size="small"
        >
          {expandLabel}
        </Button>
      )}
      {isOpen && (
        <TextButton suffixIcon={<ChevronUp />} className={buttonStyle}>
          {collapseLabel}
        </TextButton>
      )}
    </div>
  );
};
