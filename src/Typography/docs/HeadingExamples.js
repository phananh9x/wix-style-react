import React from 'react';
import Heading from 'wix-style-react/Heading';

import { ExampleWrapper } from './utils';

const darkHeadingsColumn = () => (
  <div style={{ padding: '24px' }}>
    <ExampleWrapper label="H1.Dark">
      <Heading appearance="H1">Page Title</Heading>
    </ExampleWrapper>
    <ExampleWrapper label="H2.Dark">
      <Heading appearance="H2">Page Section Title</Heading>
    </ExampleWrapper>
    <ExampleWrapper label="H3.Dark">
      <Heading appearance="H3">Card Title</Heading>
    </ExampleWrapper>
    <ExampleWrapper label="H4.Dark">
      <Heading appearance="H4">Card Content Title</Heading>
    </ExampleWrapper>
    <ExampleWrapper label="H5.Dark">
      <Heading appearance="H5">Card Section Title</Heading>
    </ExampleWrapper>
    <ExampleWrapper label="H6.Dark">
      <Heading appearance="H6">Card Section Title</Heading>
    </ExampleWrapper>
  </div>
);

const lightHeadingsColumn = () => (
  <div style={{ backgroundColor: '#162d3d', padding: '24px' }}>
    <ExampleWrapper label="H1.Light">
      <Heading appearance="H1" light>
        Page Title
      </Heading>
    </ExampleWrapper>
    <ExampleWrapper label="H2.Light">
      <Heading appearance="H2" light>
        Page Section Title
      </Heading>
    </ExampleWrapper>
    <ExampleWrapper label="H3.Light">
      <Heading appearance="H3" light>
        Card Title
      </Heading>
    </ExampleWrapper>
    <ExampleWrapper label="H4.Light">
      <Heading appearance="H4" light>
        Card Content Title
      </Heading>
    </ExampleWrapper>
    <ExampleWrapper label="H5.Light">
      <Heading appearance="H5" light>
        Card Section Title
      </Heading>
    </ExampleWrapper>
    <ExampleWrapper label="H6.Light">
      <Heading appearance="H6" light>
        Card Section Title
      </Heading>
    </ExampleWrapper>
  </div>
);

export default () => (
  <div style={{ display: 'flex' }}>
    {darkHeadingsColumn()}
    <div style={{ width: '20px' }} />
    {lightHeadingsColumn()}
  </div>
);
