export const primary = `
<Layout cols={4} gap="10px">  
  <Button>default</Button>
  <Button skin="destructive">destructive</Button>
  <Button skin="premium">premium</Button>
  <Button skin="dark">dark</Button>
  <Button skin="light">light</Button>
  <Button skin="transparent">transparent</Button>
  <Button skin="premium-light">premiumlight</Button>
</Layout>
`;

export const secondary = `
<Layout cols={4} gap="10px">  
  <Button priority="secondary">default</Button>
  <Button priority="secondary" skin="premium">premium</Button>
  <Button priority="secondary" skin="dark">dark</Button>
  <Button priority="secondary" skin="light">light</Button>
  <Button priority="secondary" skin="transparent">transparent</Button>
</Layout>
`;

export const sizes = `
<Layout cols={4} gap="10px"> 
  <Button size="large">large</Button>
  <Button size="medium">medium</Button> 
  <Button size="small">small</Button>
  <Button size="tiny">tiny</Button>  
</Layout>
`;

export const affixes = `
<Layout cols={4} gap="10px"> 
  <Button size="large" prefixIcon={<Add />}>large</Button>
  <Button size="medium" prefixIcon={<Add />}>medium</Button>
  <Button size="small" prefixIcon={<Add />}>small</Button>
  <Button size="tiny" prefixIcon={<Add />}>tiny</Button>
  <Button size="large" suffixIcon={<Add />}>large</Button>
  <Button size="medium" suffixIcon={<Add />}>medium</Button>
  <Button size="small" suffixIcon={<Add />}>small</Button>
  <Button size="tiny" suffixIcon={<Add />}>tiny</Button>
</Layout>
`;

export const loading = `
<Layout cols={4} gap="10px">
  <Button><Loader size="tiny" /></Button>
</Layout>
`;

export const custom = `
<Layout cols={3} gap="10px">
  <Button as="a">HTML a</Button>
  <Button skin="premium" as={Link}>React Router</Button>
</Layout>
`;
