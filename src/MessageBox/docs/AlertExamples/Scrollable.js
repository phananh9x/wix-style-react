/* eslint-disable react/prop-types */
import React from 'react';
import { MessageBoxFunctionalLayout } from 'wix-style-react/MessageBox';

export default () => (
  <MessageBoxFunctionalLayout
    title="Interuption Message"
    confirmText="Action"
    maxHeight="200px"
    theme="blue"
    dataHook="alert-scrollable"
  >
    <div>
      This is a generic message. No harm done, but really needed to interrupt
      you.
    </div>
    <div>It has multiple lines and limited max height</div>
    <div>and some are rows hidden</div>
    <div>and some are rows hidden</div>
    <div>and some are rows hidden</div>
    <div>and some are rows hidden</div>
    <div>and some are rows hidden</div>
    <div>and some are rows hidden</div>
    <div>and some are rows hidden</div>
  </MessageBoxFunctionalLayout>
);
