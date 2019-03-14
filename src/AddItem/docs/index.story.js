import React from 'react';
import CodeExample from 'wix-storybook-utils/CodeExample';

import AddItem from '..';
import Text from '../../Text';

import VerticalExample from './Examples/VerticalExample';
import VerticalExampleRaw from '!raw-loader!./Examples/VerticalExample';

import WithoutActionExample from './Examples/WithoutActionExample';
import WithoutActionExampleRaw from '!raw-loader!./Examples/WithoutActionExample';

import BreakpointsExample from './Examples/BreakpointsExample';
import BreakpointsExampleRaw from '!raw-loader!./Examples/BreakpointsExample';

import WithinExample from './Examples/WithinExample';
import WithinExampleRaw from '!raw-loader!./Examples/WithinExample';

import AddImageExample from './Examples/AddImageExample';
import AddImageExampleRaw from '!raw-loader!./Examples/AddImageExample';
import { Container, Col, Row } from '../../Grid';

import { storySettings } from './storySettings';

const Cards = (
  <Container>
    <Row>
      <Col span={6}>
        <CodeExample
          title="Add item as a vertical card"
          code={VerticalExampleRaw}
        >
          <div
            style={{ width: '400px', padding: '30px', background: '#F0F4F7' }}
          >
            <VerticalExample />
          </div>
        </CodeExample>
      </Col>
      <Col span={6}>
        <CodeExample
          title="Add item without action text"
          code={WithoutActionExampleRaw}
        >
          <div style={{ padding: '30px', background: '#F0F4F7' }}>
            <WithoutActionExample />
          </div>
        </CodeExample>
      </Col>
    </Row>
  </Container>
);

const Breakpoints = (
  <CodeExample title="Breakpoints" code={BreakpointsExampleRaw}>
    <BreakpointsExample />
  </CodeExample>
);

const Within = (
  <Container>
    <Row>
      <Col span={6}>
        <CodeExample title="Add item within a card" code={WithinExampleRaw}>
          <div style={{ padding: '30px', background: '#F0F4F7' }}>
            <WithinExample />
          </div>
        </CodeExample>
      </Col>
      <Col span={6}>
        <CodeExample title="Add image placeholder" code={AddImageExampleRaw}>
          <div style={{ padding: '30px', background: '#F0F4F7' }}>
            <AddImageExample />
          </div>
        </CodeExample>
      </Col>
    </Row>
  </Container>
);

const childrenExamples = [
  {
    label: 'String',
    value: 'Add New Item',
  },
  {
    label: 'Component',
    value: <Text>Add New Item</Text>,
  },
];

export default {
  category: storySettings.kind,
  storyName: storySettings.storyName,
  component: AddItem,
  componentPath: '..',

  componentProps: {
    theme: 'dashes',
    dataHook: storySettings.dataHook,
    children: childrenExamples[0].value,
    alignItems: 'center',
  },

  exampleProps: {
    children: childrenExamples,
  },

  examples: [Cards, Within, Breakpoints],
};
