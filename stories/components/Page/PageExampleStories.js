import React from 'react';
import { storiesOf } from '@storybook/react';
import { Category } from '../../storiesHierarchy';

import ExampleStandAlone from './ExampleStandAlone';
import ExampleWithAppStructure from './ExampleWithAppStructure';
import ExampleStretchTable from './ExampleStretchTable';

const PageExampleStories = storiesOf(
  `${Category.COMPONENTS}/Page Examples`,
  module,
);

PageExampleStories.add('1. StandAlone', () => <ExampleStandAlone />);
PageExampleStories.add('2. With App Structure', () => (
  <ExampleWithAppStructure />
));
PageExampleStories.add('3. Stretched Table In Page', () => (
  <ExampleStretchTable />
));
