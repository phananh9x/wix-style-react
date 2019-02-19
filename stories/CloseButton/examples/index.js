import React from 'react';

import LiveCodeExample from '../../utils/Components/LiveCodeExample';

import ExamplesSkins from '!raw-loader!./ExamplesSkins';
import ExamplesSizes from '!raw-loader!./ExamplesSizes';
import ExamplesCustomIcons from '!raw-loader!./ExamplesCustomIcons';

import { Layout, Cell } from '../../../src/Layout';
import styles from './ButtonsSpacing.scss';

class CloseButtonStory extends React.Component {
  render() {
    return (
      <Layout>
        <Cell span={4}>
          <LiveCodeExample
            compact
            scope={{ styles }}
            title="CloseButton - skins"
            initialCode={ExamplesSkins}
          />
        </Cell>
        <Cell span={4}>
          <LiveCodeExample
            compact
            scope={{ styles }}
            title="CloseButton - sizes"
            initialCode={ExamplesSizes}
          />
        </Cell>
        <Cell span={4}>
          <LiveCodeExample
            compact
            scope={{ styles }}
            title="CloseButton - custom icons"
            initialCode={ExamplesCustomIcons}
          />
        </Cell>
      </Layout>
    );
  }
}

export default CloseButtonStory;
