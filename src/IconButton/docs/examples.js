export const skins = `
<Layout cols={3} gap={0} justifyItems="center" alignItems="center">
  <Box padding={1} backgroundColor="D80">
    <IconButton>
      <More />
    </IconButton>
  </Box>
  <IconButton skin="inverted">
    <More />
  </IconButton>
  <Box padding={1} backgroundColor="D10">
    <IconButton skin="light">
      <More />
    </IconButton>
  </Box>
</Layout>
`;

export const priority = `
<Layout cols={3} gap={0} justifyItems="center">
  <Box padding={1} backgroundColor="D80">
    <IconButton priority="secondary">
      <X />
    </IconButton>
    <IconButton priority="primary">
      <Check />
    </IconButton>
  </Box>
  <Box padding={1}>
    <IconButton priority="secondary" skin="inverted">
      <X />
    </IconButton>
    <IconButton priority="primary" >
      <Check />
    </IconButton>
  </Box>
  <Box padding={1} backgroundColor="D10">
    <IconButton priority="secondary" skin="light">
      <X />
    </IconButton>
    <IconButton priority="primary" skin="light">
      <Check />
    </IconButton>
  </Box>
</Layout>
`;

export const size = `
<Layout cols={2} gap={0} justifyItems="center">
  <IconButton>
    <More />
  </IconButton>
  <IconButton size="small">
    <More />
  </IconButton>
</Layout>
`;

export const disabled = `
<Layout cols={2} gap={0} justifyItems="center">
  <IconButton>
    <More />
  </IconButton>
  <IconButton disabled>
    <More />
  </IconButton>
</Layout>
`;

export const custom = `
<Layout cols={2} gap={0} justifyItems="center">
  <IconButton as="a">
    <More />
  </IconButton>
  <IconButton as={Link}  to="/wix">
    <More />
  </IconButton>
</Layout>
`;
