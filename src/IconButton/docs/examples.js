export const primary = `
<Layout cols={3} gap={0} justifyItems="center">
  <IconButton>
    <Adjust />
  </IconButton>
  <IconButton skin="inverted">
    <Adjust />
  </IconButton>
  <IconButton skin="light">
    <Adjust />
  </IconButton>
</Layout>
`;

export const secondary = `
<Layout cols={2} gap={0} justifyItems="center">
  <IconButton priority="secondary">
    <Adjust />
  </IconButton>
  <Box backgroundColor="D10">
    <IconButton skin="light" priority="secondary">
      <Adjust />
    </IconButton>
  </Box>
</Layout>
`;

export const size = `
<Layout cols={2} gap={0} justifyItems="center">
  <IconButton size="small">
    <Adjust />
  </IconButton>
  <IconButton>
    <Adjust />
  </IconButton>
</Layout>
`;

export const custom = `
<Layout cols={2} gap={0} justifyItems="center">
  <IconButton as="a">
    <Adjust />
  </IconButton>
  <IconButton as={Link}  to="/wix">
    <Adjust />
  </IconButton>
</Layout>
`;
