/* eslint-disable react/prop-types */
import React from 'react';
import { MessageBoxFunctionalLayout } from 'wix-style-react/MessageBox';

export default () => (
  <MessageBoxFunctionalLayout
    title="Leaving Already?"
    confirmText="Leave this page"
    cancelText="Cancel"
    theme="blue"
    dataHook="alert-secondary"
  >
    This is a generic message. No harm done, but really needed to interrupt you.
  </MessageBoxFunctionalLayout>
);
