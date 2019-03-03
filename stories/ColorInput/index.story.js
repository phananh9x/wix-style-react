import React from 'react';
import { storySettings } from './storySettings';
import {
  tab,
  tabs,
  api,
  playground,
  description,
  divider,
  importExample,
  columns,
  header,
  code as baseLiveCode,
} from 'wix-storybook-utils/Sections';

import testkit from '!raw-loader!./README.TESTKIT.md';
import ColorInput from 'wix-style-react/ColorInput';
import { placements } from 'wix-style-react/Popover';
import { baseScope } from '../utils/Components/LiveCodeExample';

import usage from '!raw-loader!./Usage.md';
import * as examples from './examples';

const liveCode = config => baseLiveCode({ components: baseScope, ...config });

const example = ({ title, text, source }) =>
  columns({
    items: [description({ title, text }), liveCode({ compact: true, source })],
  });

export default {
  category: storySettings.kind,
  storyName: storySettings.storyName,

  component: ColorInput,
  componentPath: '../../src/ColorInput/ColorInput.js',

  componentProps: setState => ({
    value: '',
    placeholder: 'Please choose a color',
    dataHook: storySettings.dataHook,
    onConfirm: value => setState({ value }),
    size: 'medium',
    error: false,
    errorMessage: '',
    popoverPlacement: 'bottom',
    popoverAppendTo: 'parent',
    disabled: false,
  }),

  exampleProps: {
    errorMessage: '',
    size: ['small', 'medium', 'large'],
    popoverPlacement: placements,
    popoverAppendTo: [
      { label: 'window', value: window },
      { label: 'scrollParent', value: 'scrollParent' },
      { label: 'viewport', value: 'viewport' },
      { label: 'parent', value: 'parent' },
      { label: 'null', value: null },
    ],
  },

  sections: [
    header({
      component: (
        <div style={{ width: '50%' }}>
          <ColorInput value="#FF0000" popoverAppendTo="window" />
        </div>
      ),
      sourceUrl:
        'https://github.com/wix/wix-style-react/tree/master/src/ColorInput/ColorInput.js',
      issueUrl: 'https://github.com/wix/wix-style-react/issues/new',
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          description(
            '🎨 ColorInput is an input which allows to write HEX color manually or pick it from color picker.',
          ),

          importExample({
            source: "import ColorInput from 'wix-style-react/ColorInput';",
          }),

          divider(),

          description({
            title: 'Usage',
            text: usage,
          }),

          columns([description('### Examples')]),

          ...[
            {
              title: 'Controlled',
              text: 'The component is used in controlled mode.',
              source: examples.controlledExample,
            },
            {
              title: 'Semi-Controlled',
              text: 'The component returns only valid hex values.',
              source: examples.semiControlledExample,
            },
            {
              title: 'Size',
              text: 'ColorInput supports `small`, `medium` and `large` sizes.',
              source: examples.sizes,
            },

            {
              title: 'Error, Null and Disabled',
              text: 'ColorInput has `error`, `null` and `disabled` states.',
              source: examples.states,
            },
          ].map(example),
        ],
      }),

      ...[
        {
          title: 'API',
          sections: [api()],
        },

        {
          title: 'Testkit',
          sections: [description(testkit)],
        },

        {
          title: 'Playground',
          sections: [playground()],
        },
      ].map(tab),
    ]),
  ],
};
