export const standard = `
<Layout>
  <Cell>
    <NumberInput />
  </Cell>
</Layout>
`;

export const error = `
<Layout>
  <Cell>
    <NumberInput status={'error'}
                 statusMessage="I'm an error message..."/>
  </Cell>
</Layout>
`;

export const affix = `
<Layout>
  <Cell>
    <NumberInput prefix={<Input.Affix>#</Input.Affix>} />
  </Cell>
  <Cell>
    <NumberInput suffix={<Input.Affix>$</Input.Affix>} />
  </Cell>
  <Cell>
    <NumberInput
      prefix={<Input.Affix>Items:</Input.Affix>}
      suffix={<Input.Affix>#</Input.Affix>}
    />
  </Cell>
  <Cell>
    <NumberInput
      prefix={<Input.Affix>Items:</Input.Affix>}
      suffix={<Input.Affix>#</Input.Affix>}
      status="error"
    />
  </Cell>
</Layout>
`;

export const iconAffix = `
<Layout>
  <Cell>
    <NumberInput
      prefix={
        <Input.IconAffix>
          <Contrast />
        </Input.IconAffix>
      }
    />
  </Cell>
  <Cell>
    <NumberInput
      suffix={
        <Input.IconAffix>
          <Search />
        </Input.IconAffix>
      }
    />
  </Cell>
  <Cell>
    <NumberInput
      prefix={
        <Input.IconAffix>
          <Contrast />
        </Input.IconAffix>
      }
      suffix={
        <Input.IconAffix>
          <Search />
        </Input.IconAffix>
      }
    />
  </Cell>
  <Cell>
    <NumberInput
      prefix={
        <Input.IconAffix>
          <Contrast />
        </Input.IconAffix>
      }
      suffix={
        <Input.IconAffix>
          <Search />
        </Input.IconAffix>
      }
      status="error"
    />
  </Cell>
</Layout>
`;

export const sizes = `
<Layout>
  <Cell>
    <NumberInput
      size="small"
      placeholder="They did not know it was impossible, so they did it!"
    />
  </Cell>
  <Cell>
    <NumberInput
      size="normal"
      placeholder="They did not know it was impossible, so they did it!"
    />
  </Cell>
  <Cell>
    <NumberInput
      size="large"
      placeholder="They did not know it was impossible, so they did it!"
    />
  </Cell>
</Layout>
`;

export const rounded = `
<Layout>
  <Cell>
    <NumberInput
      size="small"
      placeholder="They did not know it was impossible, so they did it!"
      roundInput />
  </Cell>
  <Cell>
    <NumberInput
      size="normal"
      placeholder="They did not know it was impossible, so they did it!"
      roundInput
    />
  </Cell>
  <Cell>
    <NumberInput
      size="large"
      placeholder="They did not know it was impossible, so they did it!"
      roundInput
    />
  </Cell>
</Layout>`;

export const controlled = `
class ControlledNumberInput extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
  }

  render () {
    return <NumberInput onChange={value => this.setState({value})} value={this.state.value} />;
  }
}
render(<ControlledNumberInput />);
`;
