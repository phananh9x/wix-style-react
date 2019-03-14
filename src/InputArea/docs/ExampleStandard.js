import React from 'react';
import InputArea from 'wix-style-react/InputArea';

const style = {
  display: 'inline-block',
  padding: '0 5px',
  width: '200px',
  lineHeight: '22px',
};

export default () => (
  <div style={{ display: 'flex' }}>
    <div style={style}>
      InputArea
      <br />
      <InputArea resizable />
    </div>
    <div style={style}>
      Focus
      <br />
      <InputArea forceFocus resizable />
    </div>
    <div style={style}>
      Hover
      <br />
      <InputArea forceHover resizable />
    </div>
    <div style={style}>
      With placeholder
      <br />
      <InputArea placeholder="duyg" resizable />
    </div>
    <div style={style}>
      Disabled
      <br />
      <InputArea disabled value="Text which is disabled" />
    </div>
  </div>
);
