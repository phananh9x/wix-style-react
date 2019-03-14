import React from 'react';
import InputWithOptions from 'wix-style-react/InputWithOptions';

const style = {
  display: 'inline-block',
  padding: '0 5px 0',
  width: '200px',
  lineHeight: '22px',
};

const options = [
  { id: 0, value: 'First option' },
  { id: 1, value: 'Unselectable option', unselectable: true },
  { id: 2, value: 'Third option' },
  { id: 3, value: <span style={{ color: 'red' }}>Node option</span> },
  { id: 4, value: '-' },
  {
    id: 5,
    value:
      'Very long option text jldlkasj ldk jsalkdjsal kdjaklsjdlkasj dklasj',
  },
];

const rtlOptions = [
  { id: 0, value: 'אפשרות ראשונה' },
  { id: 1, value: 'אפשרות שניה' },
  { id: 2, value: 'אפשרות שלישית' },
  { id: 3, value: '-' },
  { id: 4, value: 'אפשרות רביעית' },
];

export default () => (
  <div>
    <div style={style} className="ltr">
      Left to right
      <InputWithOptions options={options} />
    </div>
    <div style={style} className="rtl">
      Right to left
      <InputWithOptions options={rtlOptions} rtl />
    </div>
  </div>
);
