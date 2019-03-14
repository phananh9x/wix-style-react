/* eslint-disable react/prop-types */
import React from 'react';
import { MessageBoxFunctionalLayout } from 'wix-style-react/MessageBox';

export default () => (
  <MessageBoxFunctionalLayout
    title="System Crashed!"
    confirmText="Action"
    theme="red"
    dataHook="destructive-alert-standard"
  >
    Something terribly bad happened, that cannot be undone.
  </MessageBoxFunctionalLayout>
);
