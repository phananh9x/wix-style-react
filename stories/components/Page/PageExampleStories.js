import React from 'react';
import { storiesOf } from '@storybook/react';
import { Category } from '../../storiesHierarchy';

import ExampleStandAlone from './ExampleStandAlone';
import ExampleWithAppStructure from './ExampleWithAppStructure';
import ExampleStretchGrid from './ExampleStretchGrid';
import ExampleStretchTable from './ExampleStretchTable';
import ExampleStickyTableWithGap from './ExampleStickyTableWithGap';

const PageExampleStories = storiesOf(
  `${Category.COMPONENTS}/Page Examples`,
  module,
);

PageExampleStories.add('1. StandAlone', () => <ExampleStandAlone />);
PageExampleStories.add('2. With App Structure', () => (
  <ExampleWithAppStructure />
));
PageExampleStories.add('3. Stretched Grid', () => <ExampleStretchGrid />);
PageExampleStories.add('4. Stretched Table In Page', () => (
  <ExampleStretchTable />
));
PageExampleStories.add('5. Sticky Table With Gap', () => (
  <ExampleStickyTableWithGap />
));
