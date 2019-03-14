import React from 'react';
import PopoverMenu from 'wix-style-react/PopoverMenu';
import PopoverMenuItem from 'wix-style-react/PopoverMenuItem';
import { Edit, Hidden, Delete } from 'wix-ui-icons-common';

export default class PopoverMenuDisabledExample extends React.Component {
  render() {
    return (
      <PopoverMenu>
        <PopoverMenuItem icon={<Edit />} text="Edit" onClick={() => {}} />
        <PopoverMenuItem icon={<Hidden />} text="Hide" onClick={() => {}} />
        <PopoverMenuItem
          disabled
          icon={<Delete />}
          text="Delete"
          onClick={() => {}}
        />
      </PopoverMenu>
    );
  }
}
