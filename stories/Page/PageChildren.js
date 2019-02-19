import React from 'react';

import Page from 'wix-style-react/Page';
import Button from 'wix-style-react/Button';
import SomeContentComponent from './SomeContentComponent';
import SomeTailComponent from './SomeTailComponent';
import Breadcrumbs from './Breadcrumbs';

const ActionBar = props => {
  const { minimized, hasBackgroundImage, children } = props;
  return typeof children === 'function'
    ? children({ minimized, hasBackgroundImage })
    : children;
};

export const header = props => (
  <Page.Header
    title="Page Title"
    subtitle="Page subtitle"
    showBackButton
    onBackClicked={() => {}}
    actionsBar={
      <ActionBar>
        <Button>Action</Button>
      </ActionBar>
    }
    breadcrumbs={Breadcrumbs}
    {...props}
  />
);

export const content = props => (
  <Page.Content>
    <SomeContentComponent {...props} />
  </Page.Content>
);

export const tail = (
  <Page.Tail>
    <SomeTailComponent />
  </Page.Tail>
);

export const fixedContent = (
  <Page.FixedContent>
    <div
      style={{
        padding: '10px 0px',
        background: 'blue',
      }}
    >
      This is a fixedContent
    </div>
  </Page.FixedContent>
);
