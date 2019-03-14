export const skins = `
<Layout cols={5} gap={0} justifyItems="center">
  <CloseButton />
  <CloseButton skin="standardFilled" />
  <Box backgroundColor="D10">
    <CloseButton skin="light" />
  </Box>
  <Box backgroundColor="B20">
    <CloseButton skin="lightFilled" />
  </Box>
  <Box backgroundColor="Y30">
    <CloseButton skin="dark" />
  </Box>
</Layout>
`;

export const custom = `
<Layout cols={5} gap={0} justifyItems="center">
  <CloseButton><Help /></CloseButton>
</Layout>
`;

export const sizes = `
<Layout cols={4} gap={0} justifyItems="center">
  <CloseButton />
  <CloseButton size="medium" />
</Layout>
`;
