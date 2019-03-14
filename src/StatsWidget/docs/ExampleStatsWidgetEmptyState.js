import React from 'react';
import StatsWidget from '..';
import styles from './ExampleStatsWidget.scss';
import { Container } from '../../Grid';
import Text from '../../Text';

const emptyState = (
  <div style={{ textAlign: 'center' }}>
    <Text secondary>
      No tickets sold yet. Check back later to see your sales
    </Text>
  </div>
);

export default () => (
  <Container>
    <div data-hook="card-example" className={styles.statsWidgetWrapper}>
      <StatsWidget title="Your Ticket Sales" emptyState={emptyState} />
    </div>
  </Container>
);
