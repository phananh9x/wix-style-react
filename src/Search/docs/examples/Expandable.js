import React from 'react';
import * as wsrScope from '../../..';
import { Layout, Cell } from '../../../Layout';
import LiveCodeExample from '../../../../stories/utils/LiveCodeExample';
import { Section } from '../../../../stories/UXStoryTemplate';

export default () => {
  return (
    <Section title="Expandable">
      <Layout>
        <Cell span={6}>
          <LiveCodeExample
            scope={wsrScope}
            compact
            title="Click on the icon to expand search"
            initialCode={'<Search expandable />'}
          />
        </Cell>
      </Layout>
    </Section>
  );
};
