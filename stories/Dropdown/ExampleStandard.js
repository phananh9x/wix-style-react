import React from 'react';
import Dropdown from 'wix-style-react/Dropdown';
import Input from 'wix-style-react/Input';

const style = {
  display: 'inline-block',
  padding: '0 5px',
  width: '140px',
  lineHeight: '22px',
};

const options = [
  { id: 0, value: 'Option 1' },
  { id: 1, value: 'Option 2' },
  { id: 2, value: 'Option 3' },
  { id: 3, value: 'Option 4' },
  {
    id: 'footer',
    overrideStyle: true,
    value: (
      <div
        style={{ height: '240px', padding: '20px', backgroundColor: '#F0F' }}
      >
        Click <a href="http://www.wix.com">here</a> to go to wix.
      </div>
    ),
  },
];

const rtlOptions = [
  { id: 0, value: 'אופציה 1' },
  { id: 1, value: 'אופציה 2' },
  { id: 2, value: 'אופציה 3' },
  { id: 3, value: 'אופציה 4' },
];

export default () => (
  <div>
    <div>
      <div style={style}>
        <div>Left to right</div>
        <Dropdown initiallySelectedId={1} options={options} />
      </div>
      <div className="rtl" style={style}>
        <div>Right to left</div>
        <Dropdown options={rtlOptions} />
      </div>
      <div style={style}>
        <div>Drop direction up</div>
        <Dropdown options={options} dropDirectionUp />
      </div>
    </div>
    <div>
      <div style={style}>
        <div>Small</div>
        <Dropdown options={options} dropDirectionUp size="small" />
      </div>
      <div style={style}>
        <div>Default</div>
        <Dropdown options={options} dropDirectionUp />
      </div>
      <div style={style}>
        <div>Large</div>
        <Dropdown options={options} dropDirectionUp size="large" />
      </div>
    </div>
    <div>
      <div style={style}>
        <div>With prefix</div>
        <Dropdown
          options={options}
          dropDirectionUp
          prefix={<Input.Unit>$</Input.Unit>}
        />
      </div>
      <div style={style}>
        <div>With suffix</div>
        <Dropdown
          options={options}
          dropDirectionUp
          suffix={<Input.Unit>%</Input.Unit>}
        />
      </div>
      <div className="rtl" style={style}>
        <div>With suffix RTL</div>
        <Dropdown
          options={options}
          dropDirectionUp
          suffix={<Input.Unit>%</Input.Unit>}
        />
      </div>
    </div>
    <div>
      <div style={style}>
        <div>With error</div>
        <Dropdown
          initiallySelectedId={1}
          options={options}
          error
          errorMessage="Somthing is wrong"
        />
      </div>
      <div style={style}>
        <div>Round</div>
        <Dropdown roundInput initiallySelectedId={1} options={options} />
      </div>
    </div>
    <div>
      <div style={style}>
        <div>No left border radius</div>
        <Dropdown
          initiallySelectedId={1}
          options={options}
          noLeftBorderRadius
        />
      </div>
      <div style={style}>
        <div>No right border radius</div>
        <Dropdown
          initiallySelectedId={1}
          options={options}
          noRightBorderRadius
        />
      </div>
    </div>
  </div>
);
