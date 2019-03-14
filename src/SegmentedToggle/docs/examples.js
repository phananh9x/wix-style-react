export const textAndIcon = `
<Layout>
  <Cell span={6}>
    <SegmentedToggle defaultSelected="option">
      <SegmentedToggle.Button prefixIcon={<LockLocked />} value="option">
        Option
      </SegmentedToggle.Button>
      <SegmentedToggle.Button prefixIcon={<LockLocked />} value="option2">
        Option
      </SegmentedToggle.Button>
    </SegmentedToggle>
    </Cell>
</Layout>
`;

export const text = `
<Layout>
  <Cell span={6}>
    <SegmentedToggle defaultSelected="option">
      <SegmentedToggle.Button value="option">
        Option
      </SegmentedToggle.Button>
      <SegmentedToggle.Button value="option2">
        Option
      </SegmentedToggle.Button>
    </SegmentedToggle>
  </Cell>
</Layout>
`;

export const icon = `
<Layout>
  <Cell span={3}>
    <SegmentedToggle defaultSelected="option">
      <SegmentedToggle.Icon value="option" tooltipText="Locked">
        <LockLocked />
      </SegmentedToggle.Icon>
      <SegmentedToggle.Icon value="option2" tooltipText="Unlocked">
        <LockUnlocked />
      </SegmentedToggle.Icon>
    </SegmentedToggle>
 </Cell>
</Layout>
`;
