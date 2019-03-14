import React from 'react';
import { storiesOf } from '@storybook/react';
import InteractiveCodeExample from 'wix-storybook-utils/InteractiveCodeExample';
import Markdown from 'wix-storybook-utils/Markdown';

import Readme from '../README.md';
import ExampleStandard from './ExampleStandard';

storiesOf('3. Inputs', module).add('3.8 + MultiSelectComposite', () => (
  <div>
    <Markdown source={Readme} />

    <InteractiveCodeExample title="Customize a <MultiSelectComposite/>">
      <ExampleStandard />
    </InteractiveCodeExample>
  </div>
));
