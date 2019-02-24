import React from 'react';

import * as wsrScope from '../../../src';
import { Layout, Cell } from '../../../src/Layout';
import LiveCodeExample from '../../utils/Components/LiveCodeExample';
import { Section } from '../../UXStoryTemplate';

const Example = `
class SearchPredicate extends React.Component {
  
  constructor() {
    this.state = {
      options: [
        { id: 1, value: <div>😇</div>, metadata: { keywords: ['good', 'angel', 'holy', 'emoji'] }},
        { id: 2, value: <div>🤓</div>, metadata: { keywords: ['nerd', 'glasses', 'smart', 'emoji'] }},
        { id: 3, value: <div>🤠</div>, metadata: { keywords: ['cowboy', 'hat', 'ranch', 'emoji'] }},
      ],
      value: '',
    };
  }

  render() {
    const predicate = option => option.metadata.keywords.includes(this.state.value);
    const onChange = e => this.setState({ value: e.target.value })
    return (
      <Search
        value={this.state.value}
        onChange={onChange}
        predicate={predicate}
        options={this.state.options}
      />
    );
  }
}`;

export default () => {
  return (
    <Section title="Predicate">
      <Layout>
        <Cell span={6}>
          <h3>
            You may add data (e.g metadata key) to your options items, helpful
            for searching using a custom predicate function
          </h3>
          <LiveCodeExample
            scope={wsrScope}
            compact
            title="Using custom predicate function for filtering"
            initialCode={Example}
          />
          <p>Try searching 'good', 'cowboy', 'emoji' and see what happens</p>
        </Cell>
      </Layout>
    </Section>
  );
};
