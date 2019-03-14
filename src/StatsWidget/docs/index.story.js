import React from 'react';

import { tab, description, api, testkit } from 'wix-storybook-utils/Sections';

import CodeExample from 'wix-storybook-utils/CodeExample';

import StatsWidget from '..';

import ExampleStatsWidgetStandard from './ExampleStatsWidgetStandard';
import ExampleStatsWidgetStandardRaw from '!raw-loader!./ExampleStatsWidgetStandard';

import ExampleStatsWidgetWithSuffix from './ExampleStatsWidgetWithSuffix';
import ExampleStatsWidgetWithSuffixRaw from '!raw-loader!./ExampleStatsWidgetWithSuffix';

import ExampleStatsWidgetWithPercents from './ExampleStatsWidgetWithPercents';
import ExampleStatsWidgetWithPercentsRaw from '!raw-loader!./ExampleStatsWidgetWithPercents';

import ExampleStatsWidgetWithInvertPercentColor from './ExampleStatsWidgetWithInvertPercentColor';
import ExampleStatsWidgetWithInvertPercentColorRaw from '!raw-loader!./ExampleStatsWidgetWithInvertPercentColor';

import ExampleStatsWidgetWithFilters from './ExampleStatsWidgetWithFilters';
import ExampleStatsWidgetWithFiltersRaw from '!raw-loader!./ExampleStatsWidgetWithFilters';

import ExampleStatsWidgetEmptyState from './ExampleStatsWidgetEmptyState';
import ExampleStatsWidgetEmptyStateRaw from '!raw-loader!./ExampleStatsWidgetEmptyState';

import ExampleStatsWidgetWithFilterWithNoBorder from './ExampleStatsWidgetWithFilterWithNoBorder';
import ExampleStatsWidgetWithFilterWithNoBorderRaw from '!raw-loader!./ExampleStatsWidgetWithFilterWithNoBorder';

export default {
  category: '2. Layout',
  storyName: '2.7 StatsWidget',

  component: StatsWidget,
  componentPath: '..',

  sections: [
    tab({
      title: 'Examples',
      sections: [
        description({
          text: (
            <div>
              <CodeExample
                title="Stats widget"
                code={ExampleStatsWidgetStandardRaw}
              >
                <ExampleStatsWidgetStandard />
              </CodeExample>
              <CodeExample
                title="Stats widget with TextButton suffix"
                code={ExampleStatsWidgetWithSuffixRaw}
              >
                <ExampleStatsWidgetWithSuffix />
              </CodeExample>
              <CodeExample
                title="Stats widget example with percents"
                code={ExampleStatsWidgetWithPercentsRaw}
              >
                <ExampleStatsWidgetWithPercents />
              </CodeExample>
              <CodeExample
                title="Stats widget example with invert percent color"
                code={ExampleStatsWidgetWithInvertPercentColorRaw}
              >
                <ExampleStatsWidgetWithInvertPercentColor />
              </CodeExample>
              <CodeExample
                title="Stats widget example with filter"
                code={ExampleStatsWidgetWithFilterWithNoBorderRaw}
              >
                <ExampleStatsWidgetWithFilterWithNoBorder />
              </CodeExample>
              <CodeExample
                title="Stats widget example with multiple filters"
                code={ExampleStatsWidgetWithFiltersRaw}
              >
                <ExampleStatsWidgetWithFilters />
              </CodeExample>
              <CodeExample
                title="Stats widget example with empty state"
                code={ExampleStatsWidgetEmptyStateRaw}
              >
                <ExampleStatsWidgetEmptyState />
              </CodeExample>
            </div>
          ),
        }),
      ],
    }),

    tab({
      title: 'API',
      sections: [api()],
    }),

    tab({
      title: 'Testkit',
      sections: [testkit()],
    }),
  ],
};
