/* eslint-disable react/prop-types */
import React from 'react';
import { storiesOf } from '@storybook/react';

import { getTestStoryKind } from '../../../stories/storiesHierarchy';
import { storySettings, testStories } from './storySettings';

import Button from '..';
import { Layout, Cell } from '../../Layout';
import AddChannel from 'wix-style-react/new-icons/AddChannel';

const kind = getTestStoryKind(storySettings);
const dataHook = 'story-button-test';

const TestContainer = ({ children }) => (
  <div
    dataHook={dataHook}
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      backgroundColor: '#f0f4f7',
    }}
  >
    {children}
  </div>
);

const skins = [
  'standard',
  'inverted',
  'destructive',
  'premium',
  'dark',
  'light',
  'transparent',
];

const ButtonBlock = values => {
  const { title, ...rest } = values;
  return (
    <Layout>
      <Cell>
        <h1 style={{ fontSize: '30px', margin: '15px 5px' }}>{title}</h1>
      </Cell>
      <Cell span={6}>
        {skins.map(skin => (
          <div style={{ margin: '5px 0' }}>
            <Button {...rest} skin={skin}>
              Click me
            </Button>
          </div>
        ))}
      </Cell>
      <Cell span={6}>
        {skins.map(skin => (
          <div style={{ margin: '5px 0' }}>
            <Button {...rest} skin={skin} disabled>
              Click me
            </Button>
          </div>
        ))}
      </Cell>
    </Layout>
  );
};

storiesOf(kind, module).add(testStories.BUTTON_SKINS, () => (
  <TestContainer>
    <div style={{ marginLeft: '10px' }}>
      <Layout>
        <ButtonBlock priority="primary" title="Primary" />
        <ButtonBlock priority="secondary" title="Secondary" />
      </Layout>
    </div>
  </TestContainer>
));

storiesOf(kind, module).add(testStories.BUTTON_SIZES, () => (
  <TestContainer>
    <div style={{ marginLeft: '10px' }}>
      <Layout>
        <ButtonBlock size="large" title="Large" />
        <ButtonBlock size="medium" title="Medium" />
      </Layout>
      <Layout>
        <ButtonBlock size="small" title="Small" />
      </Layout>
    </div>
  </TestContainer>
));

storiesOf(kind, module).add(testStories.BUTTON_AFFIXES, () => (
  <TestContainer>
    <div style={{ marginLeft: '10px' }}>
      <Layout>
        <ButtonBlock
          priority="primary"
          size="small"
          title="Affixes (small)"
          suffixIcon={<AddChannel />}
          prefixIcon={<AddChannel />}
        />
        <ButtonBlock
          priority="primary"
          size="medium"
          title="Affixes (medium)"
          suffixIcon={<AddChannel />}
          prefixIcon={<AddChannel />}
        />
      </Layout>
      <Layout>
        <Cell span={5}>
          <ButtonBlock
            priority="primary"
            size="large"
            title="Affixes (large)"
            suffixIcon={<AddChannel />}
            prefixIcon={<AddChannel />}
          />
        </Cell>
      </Layout>
    </div>
  </TestContainer>
));

storiesOf(kind, module).add(testStories.BUTTON_AS, () => (
  <TestContainer>
    <div style={{ marginLeft: '10px' }}>
      <Layout>
        <ButtonBlock as="a" priority="primary" title="as Anchor (primary)" />
        <ButtonBlock
          as="a"
          priority="secondary"
          title="as Anchor (secondary)"
        />
      </Layout>
    </div>
  </TestContainer>
));
