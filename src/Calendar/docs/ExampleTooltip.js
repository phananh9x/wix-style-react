import React from 'react';
import Calendar from 'wix-style-react/Calendar';
import Tooltip from 'wix-style-react/Tooltip';
import Button from 'wix-style-react/Button';
import DateIcon from 'wix-style-react/new-icons/Date';

export default () => (
  <Tooltip
    popover
    placement="bottom"
    alignment="left"
    showArrow={false}
    hideTrigger="click"
    shouldCloseOnClickOutside
    maxWidth="300px"
    content={<Calendar value={new Date()} onChange={() => {}} />}
  >
    <Button theme="icon-standard">
      <DateIcon />
    </Button>
  </Tooltip>
);
