export const underlineNone = `
<Layout cols={4} gap={0}>
  <TextButton>standard</TextButton>
  <TextButton skin="light">light</TextButton>
  <TextButton skin="premium">premium</TextButton>
  <TextButton skin="dark">dark</TextButton>
</Layout>
`;

export const underlineOnHover = `
<Layout cols={4} gap={0}>
  <TextButton underline="onHover">standard</TextButton>
  <TextButton skin="light" underline="onHover">
    light
  </TextButton>
  <TextButton skin="premium" underline="onHover">
    premium
  </TextButton>
  <TextButton skin="dark" underline="onHover">
    dark
  </TextButton>
</Layout>
`;

export const underlineAlways = `
<Layout cols={4} gap={0}>
  <TextButton underline="always">standard</TextButton>
  <TextButton skin="light" underline="always">
    light
  </TextButton>
  <TextButton skin="premium" underline="always">
    premium
  </TextButton>
  <TextButton skin="dark" underline="always">
    dark
  </TextButton>
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
