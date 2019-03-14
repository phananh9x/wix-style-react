/* eslint-disable react/prop-types */
import React from 'react';
import { MessageBoxFunctionalLayout } from 'wix-style-react/MessageBox';
import Text from 'wix-style-react/Text';
import TextButton from 'wix-style-react/TextButton';

export default () => (
  <MessageBoxFunctionalLayout
    title="Interuption Message"
    confirmText="Main"
    cancelText="Secondary"
    theme="blue"
    dataHook="alert-footnote"
    footerBottomChildren={
      <div>
        <Text size="small">By sending an invite, you agree to the </Text>
        <TextButton size="small">Wix Terms of Use.</TextButton>
      </div>
    }
  >
    This is a generic message. No harm done, but really needed to interrupt you.
  </MessageBoxFunctionalLayout>
);
