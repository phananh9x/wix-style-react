/* eslint-disable react/prop-types */
import React from 'react';
import { MessageBoxMarketerialLayout } from 'wix-style-react/MessageBox';
import Text from 'wix-style-react/Text';
import TextButton from 'wix-style-react/TextButton';

export default () => (
  <MessageBoxMarketerialLayout
    title="Looking good! Your site is on Google"
    content="All of your pages are indexed and now come up as separate search results on Google. This is great for your visbility!"
    confirmText="Button"
    imageUrl="https://static.wixstatic.com/media/9ab0d1_8f1d1bd00e6c4bcd8764e1cae938f872~mv1.png"
    theme="blue"
    primaryButtonLabel="Button"
    secondaryButtonLabel="Secondary action"
    dataHook="announcement-footnote"
    footerBottomChildren={
      <div>
        <Text size="small" secondary>
          By sending an invite, you agree to the{' '}
        </Text>
        <TextButton size="small" secondary>
          Wix Terms of Use.
        </TextButton>
      </div>
    }
  />
);
