import React from 'react';
import Collapse from '..';

import FormField from '../../FormField';
import Input from '../../Input';

const exampleChildren = [
  { label: 'Simple text', value: 'Lorem perferendis sapiente quas facilis!' },
  {
    label: 'FormField with Input',
    value: (
      <FormField label="Enter your name">
        <Input />
      </FormField>
    ),
  },
];

export default {
  category: 'Components',
  storyName: 'Collapse',
  component: Collapse,
  componentPath: '..',

  componentProps: { children: exampleChildren[0].value, open: true },
  exampleProps: { children: exampleChildren },
};
