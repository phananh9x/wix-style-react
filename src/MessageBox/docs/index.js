import React from 'react';
import { storiesOf } from '@storybook/react';
import Alert from './Alert';
import DestructiveAlert from './DestructiveAlert';
import Announcement from './Announcement';
import CustomModal from './CustomModal';
import { storySettings } from './storySettings';

storiesOf('9. Modals', module)
  .add(storySettings.alert.story, () => <Alert />)
  .add(storySettings.destructive.story, () => <DestructiveAlert />)
  .add(storySettings.custom.story, () => <CustomModal />)
  .add(storySettings.announcement.story, () => <Announcement />);
