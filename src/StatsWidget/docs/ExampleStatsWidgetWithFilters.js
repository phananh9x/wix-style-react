import React from 'react';
import StatsWidget from '..';
import styles from './ExampleStatsWidget.scss';
import { Container } from '../../Grid';

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
    title: '1',
    subtitle: 'Transactions',
  },
  {
    title: '$5',
    subtitle: 'Profit',
  },
];

const dropdownOption = [
  { id: 0, value: 'This month' },
  { id: 1, value: 'This week' },
];

const onFilterChange = () => {
  alert('hi');
};

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
          onSelect={onFilterChange}
        />

        <StatsWidget.FilterButton
          dataHook="StatsWidgetFilter"
          initialSelectedId={1}
          options={dropdownOption}
          onSelect={onFilterChange}
        />
      </StatsWidget>
    </div>
  </Container>
);
