export const skins = `
<Layout cols={4} gap={0}>
  <TextButton >standard</TextButton>
  <TextButton skin="light">light</TextButton>
  <TextButton skin="premium">premium</TextButton>
  <TextButton skin="dark">dark</TextButton>
</Layout>`;

export const underline = `
<Layout cols={4} gap={0}>
  <TextButton>none</TextButton>
  <TextButton underline="onHover">on hover</TextButton>
  <TextButton underline="always">always</TextButton>
</Layout>
`;

export const affixes = `
<Layout cols={4} gap={0}>
  <TextButton prefixIcon={<ChevronDown />}>prefix</TextButton>
  <TextButton suffixIcon={<ChevronDown />}>suffix</TextButton>
</Layout>
`;

export const size = `
<Layout cols={4} gap={0}>
  <TextButton size="small">
    small
  </TextButton>
  <TextButton size="medium">
    medium
  </TextButton>
</Layout>`;

export const custom = `
<Layout cols={4} gap={0}>
  <TextButton as="a">
      HTML a
  </TextButton>
  <TextButton as={Link} skin="premium">
      React Router Link
  </TextButton>
</Layout>
`;
