/* eslint-disable react/prop-types */
import React from 'react';
import { storiesOf } from '@storybook/react';
import Help from 'wix-ui-icons-common/Help';

import { getTestStoryKind } from '../storiesHierarchy';
import { storySettings, testStories } from './storySettings';

import CloseButton from '../../src/CloseButton';
import { Layout, Cell } from '../../src/Layout';

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

const skins = ['standard', 'standardFilled', 'light', 'lightFilled', 'dark'];

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
            <CloseButton {...rest} skin={skin} />
          </div>
        ))}
      </Cell>
      <Cell span={6}>
        {skins.map(skin => (
          <div style={{ margin: '5px 0' }}>
            <CloseButton {...rest} skin={skin} disabled />
          </div>
        ))}
      </Cell>
    </Layout>
  );
};

storiesOf(kind, module).add(testStories.CLOSEBUTTON_SKINS, () => (
  <TestContainer>
    <div style={{ marginLeft: '10px' }}>
      <Layout>
        <ButtonBlock title="Skins (small)" />
        <ButtonBlock size="medium" title="Skins (medium)" />
      </Layout>
    </div>
  </TestContainer>
));

storiesOf(kind, module).add(testStories.CLOSEBUTTON_AS, () => (
  <TestContainer>
    <div style={{ marginLeft: '10px' }}>
      <Layout>
        <ButtonBlock as="a" title="as Anchor" />
      </Layout>
    </div>
  </TestContainer>
));

storiesOf(kind, module).add(testStories.CLOSEBUTTON_CUSTOM_ICON, () => (
  <TestContainer>
    <div style={{ marginLeft: '10px' }}>
      <Layout>
        <ButtonBlock title="Custom Icon (small)">
          <Help />
        </ButtonBlock>
        <ButtonBlock size="medium" title="Custom Icon (medium)">
          <Help />
        </ButtonBlock>
      </Layout>
    </div>
  </TestContainer>
));
