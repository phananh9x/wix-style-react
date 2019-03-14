/* eslint-disable react/prop-types */
import React from 'react';
import { storiesOf } from '@storybook/react';

import { getTestStoryKind } from '../../../stories/storiesHierarchy';
import { storySettings, testStories } from './storySettings';

import IconButton from '..';
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

const skins = ['standard', 'inverted', 'light'];

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
            <IconButton {...rest} skin={skin}>
              <AddChannel />
            </IconButton>
          </div>
        ))}
      </Cell>
      <Cell span={6}>
        {skins.map(skin => (
          <div style={{ margin: '5px 0' }}>
            <IconButton {...rest} skin={skin} disabled>
              <AddChannel />
            </IconButton>
          </div>
        ))}
      </Cell>
    </Layout>
  );
};

storiesOf(kind, module).add(testStories.ICONBUTTON_SKINS, () => (
  <TestContainer>
    <div style={{ marginLeft: '10px' }}>
      <Layout>
        <ButtonBlock title="Primary" />
        <ButtonBlock priority="secondary" title="Secondary" />
      </Layout>
    </div>
  </TestContainer>
));

storiesOf(kind, module).add(testStories.ICONBUTTON_SIZES, () => (
  <TestContainer>
    <div style={{ marginLeft: '10px' }}>
      <Layout>
        <ButtonBlock size="small" title="Small" />
        <ButtonBlock title="Medium" />
      </Layout>
    </div>
  </TestContainer>
));

storiesOf(kind, module).add(testStories.ICONBUTTON_AS, () => (
  <TestContainer>
    <div style={{ marginLeft: '10px' }}>
      <Layout>
        <ButtonBlock as="a" title="as Anchor (primary)" />
        <ButtonBlock
          as="a"
          priority="secondary"
          title="as Anchor (secondary)"
        />
      </Layout>
    </div>
  </TestContainer>
));
