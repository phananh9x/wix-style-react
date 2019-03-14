import React from 'react';
import CodeExample from 'wix-storybook-utils/CodeExample';
import Markdown from 'wix-storybook-utils/Markdown';
import { storySettings } from './storySettings';

import Popover, { placements } from '..';
import Button from '../../Button';
import Dropdown from '../../Dropdown';
import Calendar from '../../Calendar';
import FormField from '../../FormField';

import ExampleAppendTo from './examples/ExampleAppendTo';
import ExampleInteractive from './examples/ExampleInteractive';
import ExampleFlip from './examples/ExampleFlip';
import ExampleFixed from './examples/ExampleFixed';

import ExamplePositioning from './examples/ExamplePositioning';
import ExamplePositioningRaw from '!raw-loader!./examples/ExamplePositioning';

const Example = ({ title, children }) => (
  <div>
    <Markdown source={`### ${title}`} />
    {children}
  </div>
);

const children = [
  {
    label: 'Content without padding',
    value: [
      <Popover.Element key="1">This is the Popover.Element</Popover.Element>,
      <Popover.Content key="2">Content without padding</Popover.Content>,
    ],
  },
  {
    label: 'Content with padding',
    value: [
      <Popover.Element key="1">This is the Popover.Element</Popover.Element>,
      <Popover.Content key="2">
        <div style={{ padding: '12px 24px', textAlign: 'center' }}>
          Content with padding
        </div>
      </Popover.Content>,
    ],
  },
  {
    label: 'A button',
    value: [
      <Popover.Element key="1">This is the Popover.Element</Popover.Element>,
      <Popover.Content key="2">
        <div style={{ padding: '12px 24px', textAlign: 'center', width: 250 }}>
          <Button>I am a useless button!</Button>
        </div>
      </Popover.Content>,
    ],
  },
  {
    label: 'A Dropdown',
    value: [
      <Popover.Element key="1">This is the Popover.Element</Popover.Element>,
      <Popover.Content key="2">
        <div style={{ padding: '12px 24px', textAlign: 'center' }}>
          <FormField label="This is the FormField label">
            <Dropdown
              options={[
                { id: 0, value: 'Option 1' },
                { id: 1, value: 'Option 2' },
                { value: '-' },
                { id: 2, value: 'Option 3' },
                { id: 3, value: 'Option 4' },
              ]}
              placeholder="This is a placeholder"
            />
          </FormField>
        </div>
      </Popover.Content>,
    ],
  },
  {
    label: 'A Calendar',
    value: [
      <Popover.Element key="1">This is the Popover.Element</Popover.Element>,
      <Popover.Content key="2">
        <div style={{ padding: '12px 24px' }}>
          <Calendar onChange={() => {}} autoFocusSelectedDay />
        </div>
      </Popover.Content>,
    ],
  },
];

export default {
  category: storySettings.kind,
  storyName: storySettings.storyName,

  component: Popover,
  componentPath: '..',

  componentProps: (setProps, getProps) => ({
    dataHook: storySettings.dataHook,

    children: children[1].value,
    showArrow: true,
    animate: true,
    shown: false,
    flip: true,
    placement: 'top',
    appendTo: 'window',

    onClick: () => setProps({ shown: !getProps().shown }),
  }),

  exampleProps: {
    children,

    appendTo: [
      { label: 'window', value: window },
      { label: 'scrollParent', value: 'scrollParent' },
      { label: 'viewport', value: 'viewport' },
      { label: 'parent', value: 'parent' },
      { label: 'null', value: null },
    ],

    hideDelay: null,
    showDelay: null,

    placement: placements,
  },

  examples: (
    <div>
      <Example title="`appendTo` prop">
        <ExampleAppendTo />
      </Example>

      <CodeExample title="Positioning" code={ExamplePositioningRaw}>
        <ExamplePositioning />
      </CodeExample>

      <Example title="Interactive">
        <ExampleInteractive />
      </Example>

      <Example title="Flip behaviour">
        <ExampleFlip />
      </Example>

      <Example title="Fixed behaviour">
        <ExampleFixed />
      </Example>
    </div>
  ),
};
