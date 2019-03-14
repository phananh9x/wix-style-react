import React from 'react';
import PopoverMenu from 'wix-style-react/PopoverMenu';
import PopoverMenuItem from 'wix-style-react/PopoverMenuItem';
import { storySettings } from './storySettings';

export default class PopoverMenuWithDividerExample extends React.Component {
  render() {
    return (
      <PopoverMenu dataHook={storySettings.dataHookDivider}>
        <PopoverMenuItem text="Edit" onClick={() => {}} />
        <PopoverMenuItem text="Hide" onClick={() => {}} />
        <PopoverMenuItem dataHook={storySettings.itemDataHookDivider} divider />
        <PopoverMenuItem text="Remove" onClick={() => {}} />
      </PopoverMenu>
    );
  }
}
