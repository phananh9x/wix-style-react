import React from 'react';
import { func } from 'prop-types';

import IconButton from '../IconButton';
import X from '../new-icons/X';
import Check from '../new-icons/Check';

import css from './ColorPickerActions.scss';

const ColorPickerActions = ({ onCancel, onConfirm, disabled }) => (
  <div className={css.root}>
    <IconButton
      dataHook="color-picker-cancel-button"
      size="medium"
      priority="secondary"
      onClick={onCancel}
    >
      <X />
    </IconButton>
    <IconButton
      dataHook="color-picker-confirm-button"
      size="medium"
      disabled={disabled}
      onClick={onConfirm}
    >
      <Check />
    </IconButton>
  </div>
);

ColorPickerActions.propTypes = {
  onCancel: func.isRequired,
  onConfirm: func.isRequired,
};

export default ColorPickerActions;
