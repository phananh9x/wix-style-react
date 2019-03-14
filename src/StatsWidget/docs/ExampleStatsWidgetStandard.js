import React from 'react';
import StatsWidget from '..';
import styles from './ExampleStatsWidget.scss';
import { Container } from '../../Grid';
import { storySettings } from './storySettings';

const statistics = [
  {
    title: '$10',
    subtitle: 'Revenue',
  },
  {
    title: '2',
    subtitle: 'Products',
  },
  {
    title: '$1',
    subtitle: 'Transactions',
  },
];

export default () => (
  <Container>
    <div data-hook="card-example" className={styles.statsWidgetWrapper}>
      <StatsWidget
        title="Let's see what's going on with your store"
        statistics={statistics}
        dataHook={storySettings.dataHook}
      />
    </div>
  </Container>
);
