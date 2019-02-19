import React from 'react';
import StatsWidget from '../../src/StatsWidget';
import styles from './ExampleStatsWidget.scss';
import { Container } from '../../src/Grid';
import { storySettings } from './storySettings';
import TextButton from '../../src/TextButton';

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
        suffix={<TextButton>My Buttton</TextButton>}
        statistics={statistics}
        dataHook={storySettings.dataHook}
      />
    </div>
  </Container>
);
