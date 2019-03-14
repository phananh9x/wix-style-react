export default {
  children: {
    description: `
### 👨‍👦‍👦 Children

The component is basically a **wrapper** for other components, native HTML elements or just plain text - thus it must receive at least one child.
Note that it could wrap multiple children as well.
    `,
    example: `
<Box>
  <Button
    as="button"
    onClick={() => "Clicked!"}
    priority="primary"
    size="medium"
    skin="standard"
    upgrade
  >
    Button
  </Button>
</Box>
    `,
  },
  alignment: {
    description: `
### 📏 Alignment

The component is a container which implements the one-dimensional layout model -
that means, enables to insert children in a particular **direction**, and align them horizontally and vertically.
  `,
    example: `
<Box 
  align="center" 
  verticalAlign="middle"
>
  <Button
    as="button"
    onClick={() => "Clicked!"}
    priority="primary"
    size="medium"
    skin="standard"
    upgrade
  >
    Button
  </Button>
</Box>
      `,
  },
  spacing: {
    description: `
### 👌 Spacing

The component extends the values for \`padding\` and \`margin\`, by accepting the following:

1. A numeric value - multiplied by the defined spacing unit according to the design system, which is \`6px\`.
2. A predefined spacing value with a semantic name (tiny, small, medium and large).
3. Space-separated values that are represented by a string (for example: "3px 3px").

Note that the \`padding\` and \`margin\` area properties (\`paddingLeft\`, \`marginTop\`, etc.) support the values specified above.  
    `,
    example: `
<Box 
  align="center" 
  verticalAlign="middle"
  padding="medium"
  margin={2}
>
  <Button
    as="button"
    onClick={() => "Clicked!"}
    priority="primary"
    size="medium"
    skin="standard"
    upgrade
  >
    Button
  </Button>
</Box>
      `,
  },
  sizing: {
    description: `
### ✂️ Sizing

The component supports numeric (or string) values for \`width\` and \`height\`, including minimum and maximum for both.
A numeric value is measured in pixels by default.
    `,
    example: `
<Box 
  align="center" 
  verticalAlign="middle"
  padding="medium"
  margin={2}
  minHeight={100}
>
  <Button
    as="button"
    onClick={() => "Clicked!"}
    priority="primary"
    size="medium"
    skin="standard"
    upgrade
  >
    Button
  </Button>
</Box>
      `,
  },
  styling: {
    description: `
### 🎨 Styling

The component extends the values for \`color\`, \`backgroundColor\` and \`borderColor\` (including border colors from the sides), 
by accepting the color palette keys - which are defined in the design system (beside the natively supported color values: Hex, RGB, etc.).

Moreover, any **valid** CSS property is exposed as \`prop\` (excepts \`flexDirection\`, \`justifyContent\` and \`alignItems\` which are wrapped specifically with appropriate \`props\`).  
    `,
    example: `
<Box 
  align="center" 
  verticalAlign="middle"
  padding="medium"
  margin={2}
  minHeight={100}
  backgroundColor="D70"
  border="1px solid"
  borderColor="D50"
  borderRadius={5}
>
  <Button
    as="button"
    onClick={() => "Clicked!"}
    priority="primary"
    size="medium"
    skin="standard"
    upgrade
  >
    Button
  </Button>
</Box>
      `,
  },
};
