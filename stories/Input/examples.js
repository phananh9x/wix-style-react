export const standard = `
<Layout>
  <Cell>
    <Input />
  </Cell>
  <Cell>
    <Input forceHover />
  </Cell>
  <Cell>
    <Input forceFocus />
  </Cell>
</Layout>
`;

export const error = `
<Layout>
  <Cell>
    <Input status={'error'}/>
  </Cell>
  <Cell>
    <Input status={'error'} forceHover />
  </Cell>
  <Cell>
    <Input status={'error'} forceFocus />
  </Cell>
</Layout>
`;

export const loader = `
<Layout>
  <Cell>
    <Input status="loading" />
  </Cell>
  <Cell>
    <Input status="loading" statusMessage="Loading some data..." />
  </Cell>
</Layout>
`;

export const affix = `
<Layout>
  <Cell>
    <Input prefix={<Input.Affix>https://</Input.Affix>} />
  </Cell>
  <Cell>
    <Input suffix={<Input.Affix>$</Input.Affix>} />
  </Cell>
  <Cell>
    <Input
      prefix={<Input.Affix>https://</Input.Affix>}
      suffix={<Input.Affix>.com</Input.Affix>}
    />
  </Cell>
  <Cell>
    <Input
      prefix={<Input.Affix>@</Input.Affix>}
      suffix={<Input.Affix>$</Input.Affix>}
      status="error"
    />
  </Cell>
</Layout>
`;

export const iconAffix = `
<Layout>
  <Cell>
    <Input
      prefix={
        <Input.IconAffix>
          <Date />
        </Input.IconAffix>
      }
    />
  </Cell>
  <Cell>
    <Input
      suffix={
        <Input.IconAffix>
          <Search />
        </Input.IconAffix>
      }
    />
  </Cell>
  <Cell>
    <Input
      prefix={
        <Input.IconAffix>
          <Date />
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
    <Input
      prefix={
        <Input.IconAffix>
          <Date />
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
    <Input
      size="small"
      placeholder="They did not know it was impossible, so they did it!"
    />
  </Cell>
  <Cell>
    <Input
      size="normal"
      placeholder="They did not know it was impossible, so they did it!"
    />
  </Cell>
  <Cell>
    <Input
      size="large"
      placeholder="They did not know it was impossible, so they did it!"
    />
  </Cell>
</Layout>
`;

export const rounded = `
<Layout>
  <Cell>
    <Input
      size="small"
      placeholder="They did not know it was impossible, so they did it!"
      roundInput />
  </Cell>
  <Cell>
    <Input
      size="normal"
      placeholder="They did not know it was impossible, so they did it!"
      roundInput
    />
  </Cell>
  <Cell>
    <Input
      size="large"
      placeholder="They did not know it was impossible, so they did it!"
      roundInput
    />
  </Cell>
</Layout>`;
