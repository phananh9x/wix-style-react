import React from 'react';
import Card from 'wix-style-react/Card';
import { Layout, Cell } from 'wix-style-react/Layout';
import styles from '../styles.scss';

export default () => (
  <div className={styles.exampleContainer}>
    <Layout>
      <Cell span={4}>{card()}</Cell>
      <Cell span={4}>{card()}</Cell>
      <Cell span={4}>{card()}</Cell>
      <Cell span={4}>{card()}</Cell>
      <Cell span={4}>{card()}</Cell>
    </Layout>
  </div>
);

function card() {
  return (
    <Card>
      <Card.Header title="Card" />
      <Card.Content>
        <div style={{ height: '150px' }} />
      </Card.Content>
    </Card>
  );
}
