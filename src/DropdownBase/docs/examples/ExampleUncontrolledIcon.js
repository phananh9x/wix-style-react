/* eslint-disable */

<div style={{ textAlign: 'center' }}>
  <DropdownBase
    data-hook="story-dropdown-base-uncontrolled-icon"
    showArrow
    options={[
      { id: 0, value: 'Today' },
      { id: 1, value: 'Yesterday' },
      { id: 2, value: 'Last 7 days' },
      { id: 3, value: 'Next 7 days' },
      { id: 4, value: 'A month ago' },
    ]}
  >
    {({ open, close }) => {
      return (
        <IconButton skin="inverted" onMouseEnter={open} onMouseLeave={close}>
          <Date />
        </IconButton>
      );
    }}
  </DropdownBase>
</div>
