import React from 'react';

import LiveCodeExample from '../../../../stories/utils/LiveCodeExample';

import ExamplesAffixes from '!raw-loader!./ExamplesAffixes';
import ExamplesNone from '!raw-loader!./ExamplesNone';
import ExamplesOnHover from '!raw-loader!./ExamplesOnHover';
import ExamplesSizes from '!raw-loader!./ExamplesSizes';
import ExamplesUnderline from '!raw-loader!./ExamplesUnderline';
import ExamplesWeight from '!raw-loader!./ExamplesWeight';
import ExamplesRouter from '!raw-loader!./ExamplesRouter';
import ExamplesAnchor from '!raw-loader!./ExamplesAnchor';

import { Layout, Cell } from '../../../Layout';
import styles from './ButtonsSpacing.scss';

const Link = ({ children, ...rest }) => <a {...rest}>{children}</a>;

class TextButtonStory extends React.Component {
  render() {
    return (
      <Layout>
        <Cell span={6}>
          <LiveCodeExample
            compact
            scope={{ styles }}
            title="TextButton - underline:none (default)"
            initialCode={ExamplesNone}
          />
        </Cell>
        <Cell span={6}>
          <LiveCodeExample
            compact
            scope={{ styles }}
            title="TextButton - underline:onHover"
            initialCode={ExamplesOnHover}
          />
        </Cell>
        <Cell span={6}>
          <LiveCodeExample
            compact
            scope={{ styles }}
            title="TextButton - underline:always"
            initialCode={ExamplesUnderline}
          />
        </Cell>
        <Cell span={6}>
          <LiveCodeExample
            compact
            scope={{ styles }}
            title="TextButton - prefixIcon & suffixIcon"
            initialCode={ExamplesAffixes}
          />
        </Cell>
        <Cell span={6}>
          <LiveCodeExample
            compact
            scope={{ styles }}
            title=" TextButton - size"
            initialCode={ExamplesSizes}
          />
        </Cell>
        <Cell span={6}>
          <LiveCodeExample
            compact
            scope={{ styles }}
            title="TextButton - weight"
            initialCode={ExamplesWeight}
          />
        </Cell>
        <Cell span={6}>
          <LiveCodeExample
            compact
            scope={{ Link }}
            title="TextButton - render as React Router Link"
            initialCode={ExamplesRouter}
          />
        </Cell>
        <Cell span={6}>
          <LiveCodeExample
            compact
            scope={{ Link }}
            title="TextButton - render as html anchor"
            initialCode={ExamplesAnchor}
          />
        </Cell>
      </Layout>
    );
  }
}

export default TextButtonStory;
