import React from 'react';
import { storiesOf } from '@storybook/react';
import InteractiveCodeExample from 'wix-storybook-utils/InteractiveCodeExample';
import Markdown from 'wix-storybook-utils/Markdown';
import Readme from '../README.md';
import ExampleStandard from './ExampleStandard';
import storySettings from './storySettings';
import RangeTemplate from './RangeTemplate';

// Use fixed date for DatePicker in order for eyes comparisons not to fail.
const ARBITRARY_FIXED_DATE = new Date('2018/01/01');

storiesOf(storySettings.kind, module).add(storySettings.storyName, () => (
  <div>
    <Markdown source={Readme} />
    <InteractiveCodeExample title="Customize a <Range/>">
      <ExampleStandard dataHook={storySettings.dataHookInput} />
    </InteractiveCodeExample>
    <br />
    <h2>Range with DatePicker</h2>
    <RangeTemplate
      dataHook={storySettings.dataHookDatePicker}
      rangeType="DateRange"
      onChange={() => {}}
      firstDate={{ value: ARBITRARY_FIXED_DATE }}
      lastDate={{ value: ARBITRARY_FIXED_DATE }}
    />
  </div>
));
