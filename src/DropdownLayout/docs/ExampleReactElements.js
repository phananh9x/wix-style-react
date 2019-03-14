import React from 'react';
import DropdownLayout from 'wix-style-react/DropdownLayout';

const style = {
  display: 'inline-block',
  padding: '0 5px',
  width: '200px',
  lineHeight: '22px',
};

const options = [
  { id: 0, value: <span style={{ color: 'red' }}>Option 1</span> },
  { id: 1, value: <span style={{ color: 'green' }}>Option 2</span> },
  { id: 2, value: <span style={{ color: 'blue' }}>Option 3</span> },
  { id: 3, value: <span style={{ color: 'brown' }}>Option 4</span> },
];

export default () => (
  <div>
    <div style={style}>
      React elements
      <DropdownLayout visible selectedId={0} options={options} />
    </div>
  </div>
);
