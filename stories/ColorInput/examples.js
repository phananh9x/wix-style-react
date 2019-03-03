export const controlledExample = `
class ColorInputWithState extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '#FF0000',
    };
    this.change = this.change.bind(this);
  }

  change(value) { this.setState({ value }) }

  render() {
    const { value } = this.state;
    return (
      <Layout>
        <Cell>
          <ColorInput value={value} onChange={this.change} />
        </Cell>
      </Layout>
    );
  }
}
`;

export const semiControlledExample = `
class ColorInputWithState extends React.Component {
  constructor() {
    super();
    this.state = {
      value: '#FF0000',
    };
    this.confirm = this.confirm.bind(this);
  }

  confirm(value) { this.setState({ value }) }

  render() {
    const { value } = this.state;
    return (
      <Layout>
        <Cell>
          <ColorInput value={value} onConfirm={this.confirm} />
        </Cell>
      </Layout>
    );
  }
}
`;

export const sizes = `
<Layout>
  <Cell>
    <ColorInput value="#FF0000" size="small" />
  </Cell>
  <Cell>
    <ColorInput value="#FF0000" size="medium" />
  </Cell>
  <Cell>
    <ColorInput value="#FF0000" size="large" />
  </Cell>
</Layout>
`;

export const states = `
<Layout>
  <Cell>
    <ColorInput value="#FF0000" error errorMessage="message" />
  </Cell>
  <Cell>
    <ColorInput value="" />
  </Cell>
  <Cell>
    <ColorInput value="#FF0000" disabled />
  </Cell>
</Layout>
`;
