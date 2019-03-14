import React from 'react';

import { Layout, Cell } from 'wix-style-react/Layout';
import Text from 'wix-style-react/Text';

export default () => (
  <div>
    {'<Layout>'}
    <Layout>
      <Cell>{text('<Cell>Header</Cell>')}</Cell>

      <Cell>
        {'<Layout>'}
        <Layout>
          <Cell span={1}>
            {text(
              '<Cell span={1}><div style={width: 400}>Left width=400</div></Cell>',
              { width: 400 },
            )}
          </Cell>
          <Cell span={10}>
            {text('<Cell span={10}>Middle fluid width</Cell>')}
          </Cell>
          <Cell span={1}>
            {text('<Cell span={1}><div style={width: 300}>Right</div></Cell>', {
              width: 300,
            })}
          </Cell>
        </Layout>
        {'</Layout>'}
      </Cell>

      <Cell>{text('<Cell>Footer</Cell>')}</Cell>
    </Layout>
    {'</Layout>'}
  </div>
);

function text(children, style) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100px',
        background: '#F0F4F7',
        ...style,
      }}
    >
      <Text>{children}</Text>
    </div>
  );
}
