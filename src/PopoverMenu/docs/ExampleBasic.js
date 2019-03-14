import React from 'react';
import PopoverMenu from 'wix-style-react/PopoverMenu';
import PopoverMenuItem from 'wix-style-react/PopoverMenuItem';
import { Edit, Hidden, Delete } from 'wix-ui-icons-common';

export default class PopoverMenuBasicExample extends React.Component {
  render() {
    return (
      <PopoverMenu>
        <PopoverMenuItem icon={<Edit />} text="Edit" onClick={() => {}} />
        <PopoverMenuItem icon={<Hidden />} text="Hide" onClick={() => {}} />
        <PopoverMenuItem icon={<Delete />} text="Delete" onClick={() => {}} />
      </PopoverMenu>
    );
  }
}
