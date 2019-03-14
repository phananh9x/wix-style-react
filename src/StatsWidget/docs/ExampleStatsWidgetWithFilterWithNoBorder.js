import React from 'react';
import StatsWidget from '..';
import styles from './ExampleStatsWidget.scss';
import { Container } from '../../Grid';

const statistics = [
  {
    title: `$420`,
    subtitle: 'Revenue',
  },
  {
    title: `1`,
    subtitle: 'Products',
  },
  {
    title: `33`,
    subtitle: 'Transactions',
  },
  {
    title: `+$365`,
    subtitle: 'Profit',
  },
];

const dropdownOption = [
  { id: 1, value: 'Last week' },
  { id: 2, value: 'This week' },
];

export default () => (
  <Container>
    <div data-hook="card-example" className={styles.statsWidgetWrapper}>
      <StatsWidget
        title="Let's see what's going on with your store"
        statistics={statistics}
      >
        <StatsWidget.FilterButton
          dataHook="StatsWidgetFilter"
          initialSelectedId={1}
          options={dropdownOption}
        />
      </StatsWidget>
    </div>
  </Container>
);
