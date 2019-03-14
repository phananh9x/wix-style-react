/* eslint-disable react/prop-types */
import React from 'react';
import { MessageBoxFunctionalLayout } from 'wix-style-react/MessageBox';

export default () => (
  <MessageBoxFunctionalLayout
    title="Delete Files?"
    confirmText="Main"
    cancelText="Secondary"
    theme="red"
    dataHook="destructive-alert-secondary"
  >
    Do you really want to delete selected files? Once removed, cannot be undone.
  </MessageBoxFunctionalLayout>
);
