import React from 'react';
import InputArea from 'wix-style-react/InputArea';
import TextButton from 'wix-storybook-utils/TextButton';

class CommandsExample extends React.Component {
  render() {
    const handleClick1 = () => this.refs.inputtest.focus();

    const handleClick2 = () => {
      this.refs.inputtest.focus();
      setTimeout(() => this.refs.inputtest.blur(), 1000);
    };

    const handleClick3 = () => {
      this.refs.inputtest.focus();
      this.refs.inputtest.select();
    };

    return (
      <div>
        <div style={{ width: '400px' }}>
          <InputArea ref="inputtest" />
        </div>
        <TextButton onClick={handleClick1}>Focus</TextButton>
        <TextButton onClick={handleClick2}>
          Focus &amp; blur 1 second later
        </TextButton>
        <TextButton onClick={handleClick3}>Select text</TextButton>
      </div>
    );
  }
}

export default () => (
  <div>
    <CommandsExample />
  </div>
);
