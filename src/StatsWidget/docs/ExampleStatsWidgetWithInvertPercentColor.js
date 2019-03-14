import React from 'react';
import StatsWidget from '..';
import styles from './ExampleStatsWidget.scss';
import { Container } from '../../Grid';

const statistics = [
  {
    title: '0.312',
    subtitle: 'Error Rate',
    percent: 15,
    invertPercentColor: true,
  },
  {
    title: '0.093',
    subtitle: 'Error Rate',
    percent: -15,
    invertPercentColor: true,
  },
];

export default () => (
  <Container>
    <div data-hook="card-example" className={styles.statsWidgetWrapper}>
      <StatsWidget
        title="Let's see what's going on with your app"
        statistics={statistics}
      />
    </div>
  </Container>
);
