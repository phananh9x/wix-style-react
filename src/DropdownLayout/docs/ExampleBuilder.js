import React from 'react';
import DropdownLayout from 'wix-style-react/DropdownLayout';

const style = {
  display: 'inline-block',
  padding: '0 5px',
  width: '240px',
  lineHeight: '22px',
};

const builder = id => `builder option ${id}`;

const options = [
  { id: 0, value: builder(0) },
  { id: 1, value: builder(1) },
  { id: 2, value: builder(2) },
  { id: 3, value: builder(3) },
  {
    id: 'footer',
    overrideStyle: true,
    value: (
      <div
        style={{
          height: '240px',
          padding: '20px',
          fontSize: '20',
          backgroundColor: '#F0F',
        }}
      >
        Click <a href="http://www.wix.com">here</a> to go to wix.
      </div>
    ),
  },
];

export default () => (
  <div>
    <div style={style}>
      builder function
      <br />
      <DropdownLayout visible options={options} />
    </div>
  </div>
);
