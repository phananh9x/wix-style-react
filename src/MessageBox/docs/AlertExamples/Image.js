/* eslint-disable react/prop-types */
import React from 'react';
import { MessageBoxFunctionalLayout } from 'wix-style-react/MessageBox';

export default () => (
  <MessageBoxFunctionalLayout
    title="Interuption Message"
    confirmText="Main"
    cancelText="Secondary"
    theme="blue"
    dataHook="alert-image"
    image={<img src="https://picsum.photos/126/126?blur&image=0" />}
  >
    This is a generic message. No harm done, but really needed to interrupt you.
  </MessageBoxFunctionalLayout>
);
