import React from 'react';
import DropdownLayout from 'wix-style-react/DropdownLayout';
import { badgeSelectItemBuilder } from 'wix-style-react/BadgeSelectItemBuilder';

const style = {
  display: 'inline-block',
  padding: '0 5px',
  width: '240px',
  lineHeight: '22px',
};

const options = [
  badgeSelectItemBuilder({ id: 0, text: 'Badge 1', skin: 'general' }),
  badgeSelectItemBuilder({ id: 1, text: 'Badge 2', skin: 'standard' }),
  badgeSelectItemBuilder({ id: 2, text: 'Badge 3', skin: 'success' }),
  badgeSelectItemBuilder({ id: 3, text: 'Badge 4', skin: 'warning' }),
];

export default () => (
  <div style={style}>
    <DropdownLayout visible selectedId={0} options={options} />
  </div>
);
