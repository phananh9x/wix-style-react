import React from 'react';
import { storySettings } from './storySettings';
import { baseScope } from '../utils/Components/LiveCodeExample';
import * as examples from './examples';
import {
  header,
  divider,
  columns,
  tabs,
  tab,
  api,
  code as baseCode,
  importExample,
  description,
  playground,
  testkit,
} from 'wix-storybook-utils/Sections';

import FormField from 'wix-style-react/FormField';
import Input from 'wix-style-react/Input';
import InputArea from 'wix-style-react/InputArea';
import RichTextArea from 'wix-style-react/RichTextArea';
import DatePicker from 'wix-style-react/DatePicker';
import Dropdown from 'wix-style-react/Dropdown';
import Checkbox from 'wix-style-react/Checkbox';
import ToggleSwitch from 'wix-style-react/ToggleSwitch';

const ID = 'formFieldId';
const placeholder = 'Default text goes here...';
const childrenExamples = [
  { label: 'Input', value: <Input placeholder={placeholder} id={ID} /> },
  {
    label: 'Input with char counter',
    value: ({ setCharactersLeft }) => (
      <Input
        placeholder={placeholder}
        onChange={e => setCharactersLeft(50 - e.target.value.length)}
        id={ID}
      />
    ),
  },
  {
    label: 'InputArea',
    value: <InputArea placeholder={placeholder} id={ID} />,
  },
  {
    label: 'InputArea with char counter',
    value: ({ setCharactersLeft }) => (
      <InputArea
        placeholder={placeholder}
        id={ID}
        onChange={e => setCharactersLeft(50 - e.target.value.length)}
      />
    ),
  },

  { label: 'RichTextArea', value: <RichTextArea placeholder={placeholder} /> },

  { label: 'DatePicker', value: <DatePicker value={new Date()} /> },

  {
    label: 'Dropdown',
    value: (
      <Dropdown
        placeholder="Select dominant hand"
        options={[
          { id: 0, value: 'Left' },
          { id: 1, value: 'Right' },
          { id: 2, value: 'Ambidextrous' },
        ]}
      />
    ),
  },

  { label: 'Checkbox', value: <Checkbox /> },

  { label: 'ToggleSwitch', value: <ToggleSwitch /> },
];

const code = config =>
  baseCode({
    components: baseScope,
    ...config,
  });

export default {
  category: storySettings.kind,
  storyName: storySettings.storyName,
  component: FormField,
  componentPath: '../../src/FormField/FormField.js',

  componentProps: {
    dataHook: 'storybook-formfield',
    children: childrenExamples[0].value,
    label: 'This is an input:',
    labelPlacement: 'top',
    required: true,
    infoContent: 'I help you to fill info',
    stretchContent: true,
    id: 'formFieldId',
  },

  exampleProps: {
    children: childrenExamples,
    infoTooltipProps: [
      { label: 'placement left', value: { placement: 'left' } },
      { label: 'placement right', value: { placement: 'right' } },
      { label: 'placement top', value: { placement: 'top' } },
      { label: 'placement bottom', value: { placement: 'bottom' } },
    ],
  },

  sections: [
    header({
      issueUrl: 'https://github.com/wix/wix-style-react/issues/new',
      sourceUrl:
        'https://github.com/wix/wix-style-react/tree/master/src/FormField',
      component: (
        <div style={{ width: '50%' }}>
          <FormField label="Label" infoContent="Tooltip with Information">
            <div
              style={{
                width: '100%',
                height: 30,
                border: '1px dashed #4eb7f5 ',
                borderRadius: 6,
              }}
            />
          </FormField>
        </div>
      ),
    }),

    tabs({
      tabs: [
        tab({
          title: 'Usage',
          sections: [
            columns({
              items: [
                importExample({
                  source: "import FormField from 'wix-style-react/FormField';",
                }),
              ],
            }),

            divider(),

            description({ text: '## Examples' }),

            code({
              title: 'Generic component to help build forms',
              source: examples.generic,
              interactive: false,
            }),

            code({
              title: 'With tooltip',
              source: examples.withTooltip,
              interactive: false,
            }),

            description({
              title: 'With length count',
              text:
                'When children is function (a.k.a. render prop), it receives setCharactersLeft which can be called with number',
            }),

            code({
              source: examples.withLength,
            }),
            code({
              title: 'Inline Label With Length Count',
              source: examples.inlineLabelWithLength,
            }),
            code({
              title: 'Within Grid',
              source: examples.ExampleWithinGrid,
            }),
          ],
        }),

        ...[
          { title: 'API', sections: [api()] },
          { title: 'TestKit', sections: [testkit()] },
          { title: 'Playground', sections: [playground()] },
        ].map(tab),
      ],
    }),
  ],
};
