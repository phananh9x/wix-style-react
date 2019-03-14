import React from 'react';
import { storiesOf } from '@storybook/react';

import { getTestStoryKind } from '../../../stories/storiesHierarchy';

import Input from 'wix-style-react/Input';
import NumberInput from 'wix-style-react/NumberInput';
import { testStories, storySettings } from './storySettings';

const defaultProps = {
  value: '12345',
};

const kind = getTestStoryKind(storySettings);

storiesOf(kind, module).add(testStories.numberInputVariations, () => {
  return (
    <div>
      <br />
      <h2>Default Input</h2>
      <NumberInput {...defaultProps} />
      <br />
      <h2>Small Input</h2>
      <NumberInput size="small" {...defaultProps} />
      <br />
      <h2>Large Input</h2>
      <NumberInput size="large" {...defaultProps} />
      <br />
      <h2>With Prefix</h2>
      <NumberInput {...defaultProps} prefix={<Input.Affix>#</Input.Affix>} />
      <br />
      <h2>With Suffix</h2>
      <NumberInput {...defaultProps} suffix={<Input.Affix>#</Input.Affix>} />
      <br />
      <h2>With Error</h2>
      <NumberInput
        {...defaultProps}
        prefix={<Input.Affix>#</Input.Affix>}
        status="error"
        suffix={<Input.Affix>$</Input.Affix>}
      />
      <br />
      <h2>Disabled (With Error)</h2>
      <NumberInput
        {...defaultProps}
        prefix={<Input.Affix>#</Input.Affix>}
        disabled
        status="error"
        suffix={<Input.Affix>$</Input.Affix>}
      />
    </div>
  );
});
