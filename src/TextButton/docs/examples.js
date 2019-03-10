export const skins = `
<Layout cols={4} gap={0} justifyItems="center">
  <TextButton >standard</TextButton>
  <Box backgroundColor="D10">
    <TextButton skin="light">light</TextButton>
  </Box>
  <TextButton skin="premium">premium</TextButton>
  <Box backgroundColor="Y30">
    <TextButton skin="dark">dark</TextButton>
  </Box>
</Layout>`;

export const underline = `
<Layout cols={3} gap={0} justifyItems="center">
  <TextButton>none</TextButton>
  <TextButton underline="onHover">on hover</TextButton>
  <TextButton underline="always">always</TextButton>
</Layout>
`;

export const affixes = `
<Layout cols={2} gap={0} justifyItems="center">
  <TextButton prefixIcon={<ChevronDown />}>prefix</TextButton>
  <TextButton suffixIcon={<ChevronDown />}>suffix</TextButton>
</Layout>
`;

export const size = `
<Layout cols={2} gap={0} justifyItems="center" alignItems="center">
  <TextButton size="small">
    small
  </TextButton>
  <TextButton size="medium">
    medium
  </TextButton>
</Layout>`;

export const custom = `
<Layout cols={2} gap={0} justifyItems="center">
  <TextButton as="a">
      HTML a
  </TextButton>
  <TextButton as={Link} skin="premium">
      React Router Link
  </TextButton>
</Layout>
`;
