import React from 'react';
import * as PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';

import { storySettings } from './storySettings';
import PageHeader from 'wix-style-react/PageHeader';
import { getTestStoryKind } from '../storiesHierarchy';
import Button from 'wix-style-react/Button';
import Dropdown from 'wix-style-react/Dropdown';
import { RTLWrapper } from '../utils';

const PageHeaderContainer = props => {
  return (
    <div style={{ width: '700px', border: '1px solid' }}>
      <RTLWrapper>{props.children}</RTLWrapper>
    </div>
  );
};
PageHeaderContainer.propTypes = {
  children: PropTypes.any,
};

const kind = getTestStoryKind(storySettings);
const dataHook = 'story-page-header';

const defaultProps = {
  dataHook,
  title: 'PageHeader Title',
  subtitle: 'PageHeader Subtitle',
  actionsBar: <Button>Action</Button>,
  showBackButton: true,
  onBackClicked: () => null,
};

storiesOf(kind, module).add('1. Standard', () => (
  <PageHeaderContainer>
    <PageHeader {...defaultProps} />
  </PageHeaderContainer>
));

storiesOf(kind, module).add('2. Long Title and Subtitle', () => (
  <PageHeaderContainer>
    <PageHeader
      {...defaultProps}
      title="PageHeader title - very very long very very long very very long very very long very very long"
      subtitle="PageHeader subtitle - very very long very very long very very long very very long very very long very very long very very long"
    />
  </PageHeaderContainer>
));

storiesOf(kind, module).add('3. Title with Dropdown', () => (
  <PageHeaderContainer>
    <PageHeader
      {...defaultProps}
      title={
        <Dropdown
          dataHook="title-dropdown"
          options={[
            { id: '1', value: 'option 1' },
            { id: '2', value: 'option 2' },
            { id: '3', value: 'option 3' },
          ]}
        />
      }
    />
  </PageHeaderContainer>
));

storiesOf(kind, module).add('4. Subtitle with Dropdown', () => (
  <PageHeaderContainer>
    <PageHeader
      {...defaultProps}
      subtitle={
        <Dropdown
          dataHook="subtitle-dropdown"
          options={[
            { id: '1', value: 'option 1' },
            { id: '2', value: 'option 2' },
            { id: '3', value: 'option 3' },
          ]}
        />
      }
    />
  </PageHeaderContainer>
));
