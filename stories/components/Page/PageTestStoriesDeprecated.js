import React from 'react';
import * as PropTypes from 'prop-types';
import { storiesOf } from '@storybook/react';

import Page from 'wix-style-react/Page';
import { getTestStoryKind } from '../../storiesHierarchy';

import * as s from './PageTestStoriesDeprecated.scss';
import { header, tail, fixedContent, content } from './PageChildren';
import { storySettings } from './storySettings';
import ExampleEmptyState from './ExampleEmptyState';
import { ExamplePageContainer } from './ExamplePageContainer';

const PageContainer = props => {
  return (
    <div className={s.pageContainer} {...props}>
      {props.children}
    </div>
  );
};
PageContainer.propTypes = {
  children: PropTypes.any,
};

const kind = `${getTestStoryKind(storySettings)}/Deprecated`;
const dataHook = 'story-page';

storiesOf(kind, module).add('Header-Tail-Content: 1. Image', () => (
  <PageContainer>
    <Page
      dataHook={dataHook}
      children={[header(), tail, content(false)]}
      backgroundImageUrl="https://static.wixstatic.com/media/f0548921c53940ec803dfb1c203e96fe.jpg/v1/fill/w_400,h_100/f0548921c53940ec803dfb1c203e96fe.jpg"
    />
  </PageContainer>
));

storiesOf(kind, module).add(
  'Header-Tail-Content: 2. Gradient Cover Tail',
  () => (
    <PageContainer>
      <Page
        dataHook={dataHook}
        children={[header(), tail, content(false)]}
        gradientClassName="background-gradient"
        gradientCoverTail
      />
    </PageContainer>
  ),
);

storiesOf(kind, module).add('1. Image', () => (
  <PageContainer>
    <Page
      dataHook={dataHook}
      children={[header(), content(false)]}
      backgroundImageUrl="https://static.wixstatic.com/media/f0548921c53940ec803dfb1c203e96fe.jpg/v1/fill/w_400,h_100/f0548921c53940ec803dfb1c203e96fe.jpg"
    />
  </PageContainer>
));

storiesOf(kind, module).add('2. Gradient', () => (
  <PageContainer>
    <Page
      dataHook={dataHook}
      children={[header(), content(false)]}
      gradientClassName="background-gradient"
    />
  </PageContainer>
));

storiesOf(kind, module).add('3. FC-Image', () => (
  <PageContainer>
    <Page
      dataHook={dataHook}
      children={[header(), fixedContent, content(false)]}
      backgroundImageUrl="https://static.wixstatic.com/media/f0548921c53940ec803dfb1c203e96fe.jpg/v1/fill/w_400,h_100/f0548921c53940ec803dfb1c203e96fe.jpg"
    />
  </PageContainer>
));

storiesOf(kind, module).add('4. FC-Gradient', () => (
  <PageContainer>
    <Page
      dataHook={dataHook}
      children={[header(), fixedContent, content(false)]}
      gradientClassName="background-gradient"
    />
  </PageContainer>
));

storiesOf(kind, module).add('5. Default [min/max]-width', () => (
  <div>
    <Page
      dataHook={dataHook}
      children={[header(), content(false)]}
      gradientClassName="background-gradient"
    />
  </div>
));

storiesOf(kind, module).add('6. Custom [min/max]-width', () => (
  <div>
    <Page
      dataHook={dataHook}
      children={[header(), content(false)]}
      gradientClassName="background-gradient"
      minWidth={504} // With padding: 504 + 48*2 = 600px
      maxWidth={1304} // With padding: 1304 + 48*2 = 1400px
    />
  </div>
));

const contentPrefix = (
  <div
    style={{
      backgroundColor: 'white',
      paddingBottom: '20px',
      fontSize: '36px',
    }}
  >
    <b>
      This simulates what some consumers are currently doing to implement
      min-width with horizontal scroll. So we can see tat they are not broken.
      They can increase the min-width, bu the can not decrease it, unless they
      use the minWidth prop.
    </b>
  </div>
);
storiesOf(kind, module).add(
  '7. Regression for [min/max]-width (introduced in version 5.25.0)',
  () => (
    <div style={{ overflowX: 'auto' }}>
      <PageContainer style={{ minWidth: '1100px' }}>
        <Page
          dataHook={dataHook}
          children={[header(), content(false, contentPrefix)]}
          gradientClassName="background-gradient"
        />
      </PageContainer>
    </div>
  ),
);

storiesOf(kind, module).add('8. Empty State', () => (
  <PageContainer>
    <ExampleEmptyState />
  </PageContainer>
));

storiesOf(kind, module).add('9. Empty State in BM', () => (
  <ExamplePageContainer>
    <ExampleEmptyState />
  </ExamplePageContainer>
));
