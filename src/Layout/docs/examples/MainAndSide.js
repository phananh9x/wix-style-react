import React from 'react';
import PropTypes from 'prop-types';

import { Layout, Cell } from 'wix-style-react/Layout';
import Card from 'wix-style-react/Card';

import styles from '../styles.scss';

export default () => (
  <div className={styles.exampleContainer}>
    <Layout>
      <Cell span={8}>
        <Section title="Main Content" height="450px" />
      </Cell>

      <Cell span={4}>
        <Layout>
          <Cell>
            <Section title="Sidebar card" height="200px" />
          </Cell>

          <Cell>
            <Section title="Sidebar card 2" height="300px" />
          </Cell>
        </Layout>
      </Cell>
    </Layout>
  </div>
);

function Section({ title, height }) {
  return (
    <Card>
      <Card.Header title={title} />
      <Card.Content>
        <div style={{ height }} />
      </Card.Content>
    </Card>
  );
}

Section.propTypes = {
  title: PropTypes.string,
  height: PropTypes.string,
};
