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
  {
    id: 4,
    value:
      'Very long option text jldlkasj ldk jsalkdjsal kdjaklsjdlkasj dklasj',
  },
];

export default () => (
  <div>
    <div style={style}>
      Bigger width
      <InputWithOptions dropdownWidth="500px" options={options} />
    </div>
    <div style={style}>
      With offset
      <InputWithOptions
        dropdownWidth="500px"
        dropdownOffsetLeft="-150px"
        options={options}
      />
    </div>
  </div>
);
