/* eslint-disable react/prop-types */
import React from 'react';
import { MessageBoxFunctionalLayout } from 'wix-style-react/MessageBox';
import Checkbox from 'wix-style-react/Checkbox';
import Text from 'wix-style-react/Text';

export default () => (
  <MessageBoxFunctionalLayout
    title="Message With Actions"
    confirmText="Confirm"
    cancelText="Cancel"
    theme="blue"
    dataHook="alert-actions"
    sideActions={
      <Checkbox>
        <Text>{`Please don't show me this again.`}</Text>
      </Checkbox>
    }
  >
    This is a generic message. No harm done, but really needed to interrupt you.
  </MessageBoxFunctionalLayout>
);
