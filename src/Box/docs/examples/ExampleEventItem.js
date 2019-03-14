/* eslint-disable */

<Box minHeight={200} dataHook="storybook-multiple-boxes-within-box">
  <Box align="center" verticalAlign="middle" width={230} backgroundColor="B40">
    <Box padding={2} color="B25" backgroundColor="B50" borderRadius="50%">
      <Image />
    </Box>
  </Box>
  <Box
    direction="vertical"
    verticalAlign="space-between"
    padding="24px 29px 27px"
    backgroundColor="D80"
    flexGrow={1}
  >
    <Box direction="vertical">
      <Text weight="bold">FED for BED (3)</Text>
      <Text size="tiny" weight="thin" secondary light>
        Jan 20, 2019, 10:00 AM, Location will be announced later
      </Text>
    </Box>
    <Box align="space-between">
      <Box verticalAlign="middle" color="D10">
        <Hint />
        <Box marginLeft={1}>Event location is TBD</Box>
      </Box>
      <Box align="space-between" verticalAlign="middle" minWidth={115}>
        <IconButton priority="secondary" size="small">
          <More />
        </IconButton>
        <Button upgrade priority="secondary" size="small">
          Edit
        </Button>
      </Box>
    </Box>
  </Box>
</Box>;
