import React from 'react';
import { storiesOf } from '@storybook/react';

import { getTestStoryKind } from '../../../stories/storiesHierarchy';

import Input from 'wix-style-react/Input';
import DateInput from 'wix-style-react/DateInput';
import { testStories, storySettings } from './storySettings';

const defaultProps = {
  value: new Date(0),
};
const kind = getTestStoryKind({
  category: storySettings.category,
  storyName: storySettings.storyName,
});

storiesOf(kind, module).add(testStories.dateInputVariations, () => {
  return (
    <div>
      <br />
      <h2>Default DateInput</h2>
      <DateInput dataHook={storySettings.dataHook} {...defaultProps} />
      <br />
      <h2>DD/MM/YY Format</h2>
      <DateInput
        dateFormat="DD/MM/YY"
        dataHook={storySettings.dataHook}
        {...defaultProps}
      />
      <br />
      <h2>HH:mm:SS Format</h2>
      <DateInput
        dateFormat="HH:mm:SS"
        dataHook={storySettings.dataHook}
        {...defaultProps}
      />
      <br />
      <h2>Function Format (date.toISOString)</h2>
      <DateInput
        dateFormat={date => date.toISOString()}
        dataHook={storySettings.dataHook}
        {...defaultProps}
      />
      <br />
      <h2>With prefix</h2>
      <DateInput
        dataHook={storySettings.dataHook}
        {...defaultProps}
        prefix={<Input.Affix>#</Input.Affix>}
      />
      <br />
      <h2>Disabled</h2>
      <DateInput dataHook={storySettings.dataHook} {...defaultProps} disabled />
    </div>
  );
});
