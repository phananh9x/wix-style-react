import React from 'react';

import LiveCodeExample from '../../../../stories/utils/LiveCodeExample';

import ExamplesSizes from '!raw-loader!./ExamplesSizes';
import ExamplesPrimary from '!raw-loader!./ExamplesPrimary';
import ExamplesSecondary from '!raw-loader!./ExamplesSecondary';
import ExamplesRouter from '!raw-loader!./ExamplesRouter';
import ExamplesAnchor from '!raw-loader!./ExamplesAnchor';

import { Layout, Cell } from '../../../Layout';
import styles from './ButtonsSpacing.scss';

const Link = ({ children, ...rest }) => <a {...rest}>{children}</a>;

class IconButtonStory extends React.Component {
  render() {
    return (
      <Layout>
        <Cell span={6}>
          <LiveCodeExample
            compact
            scope={{ styles }}
            title="IconButton - priority: primary"
            initialCode={ExamplesPrimary}
          />
        </Cell>
        <Cell span={6}>
          <LiveCodeExample
            compact
            scope={{ styles }}
            title="IconButton - priority: secondary"
            initialCode={ExamplesSecondary}
          />
        </Cell>
        <Cell span={6}>
          <LiveCodeExample
            compact
            scope={{ styles }}
            title="IconButton - size"
            initialCode={ExamplesSizes}
          />
        </Cell>
        <Cell span={6}>
          <LiveCodeExample
            compact
            scope={{ styles, Link }}
            title="IconButton - render as React Router Link"
            initialCode={ExamplesRouter}
          />
        </Cell>
        <Cell span={6}>
          <LiveCodeExample
            compact
            title="IconButton - render as html anchor"
            initialCode={ExamplesAnchor}
          />
        </Cell>
      </Layout>
    );
  }
}

export default IconButtonStory;
