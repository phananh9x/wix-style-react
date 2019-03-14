export const generic = `
<FormField label="Your name" required>
  <Input value={yourState.name} onChange={yourHandler}/>
</FormField>
`;

export const withTooltip = `
<FormField label="Your name" infoContent="Tooltip text" required>
  <Input value={yourState.name} onChange={yourHandler}/>
</FormField>
`;

export const withLength = `
<FormField label="Label">
  {({setCharactersLeft}) =>
    <Input onChange={event => setCharactersLeft(100 - event.target.value.length)}/>
  }
</FormField>
`;

export const inlineLabelWithLength = `
<FormField
    label="Label"
    labelPlacement="left">
    {({ setCharactersLeft }) => (
      <Input
        onChange={event => setCharactersLeft(20 - event.target.value.length)}
      />
    )}
  </FormField>
`;

export const ExampleWithinGrid = `
<MessageBoxFunctionalLayout title="User Details" confirmText="Save" width={400} cancelText="Cancel">
  <Container fluid>
    <Row stretchViewsVertically>
      <Col span={3}>
        <FormField dataHook="storybook-formfield-grid" label="User" required />
      </Col>
      <Col span={9}>
        <Input />
      </Col>
    </Row>
    <Row stretchViewsVertically>
      <Col span={3}>
        <FormField label="Email" />
      </Col>
      <Col span={9}>
        <Input />
      </Col>
    </Row>
    <Row stretchViewsVertically>
      <Col span={3}>
        <FormField label="Address" infoContent="I help you to fill info" />
      </Col>
      <Col span={9}>
        <Input />
      </Col>
    </Row>
  </Container>
</MessageBoxFunctionalLayout>;
`;
