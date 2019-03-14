import * as React from 'react';
import FloatingHelper from '..';
import Image from 'wix-ui-icons-common/Image';

import { storySettings } from './StorySettings';
import { storySettings as helperStorySettings } from '../FloatingHelperContent/docs/StorySettings';

import CodeExample from 'wix-storybook-utils/CodeExample';

import { SimpleExample } from './SimpleExample';
import SimpleExampleRaw from '!raw-loader!./SimpleExample';

import { FullExample } from './FullExample';
import FullExampleRaw from '!raw-loader!./FullExample';

import { ProgrammaticExample } from './ProgrammaticExample';
import ProgrammaticExampleRaw from '!raw-loader!./ProgrammaticExample';

import { ControlledExample } from './ControlledExample';
import ControlledExampleRaw from '!raw-loader!./ControlledExample';

const exampleWrapperStyle = { marginTop: 100, marginBottom: 100 };

export default {
  category: storySettings.kind,
  storyName: storySettings.story,
  component: FloatingHelper,
  componentPath: '..',

  componentProps: {
    'data-hook': storySettings.dataHook,
    content: (
      <FloatingHelper.Content
        title="Don’t forget to setup payments"
        body="In order to sell your music you need to choose a payment method."
      />
    ),
    target: <span>I am a FloatingHelper target</span>,
    placement: 'right',
    initiallyOpened: true,
  },

  exampleProps: {
    placement: [
      'auto-start',
      'auto',
      'auto-end',
      'top-start',
      'top',
      'top-end',
      'right-start',
      'right',
      'right-end',
      'bottom-end',
      'bottom',
      'bottom-start',
      'left-end',
      'left',
      'left-start',
    ],

    target: [
      { label: 'Simple text', value: 'I am simple text target' },
      { label: 'Simple span', value: <span>I am a span target</span> },
    ],

    content: [
      {
        label: 'with title & body only',
        value: (
          <FloatingHelper.Content
            title="Don’t forget to setup payments"
            body="In order to sell your music you need to choose a payment method."
          />
        ),
      },

      {
        label: 'with all items',
        value: (
          <FloatingHelper.Content
            title="Don’t forget to setup payments"
            body="In order to sell your music you need to choose a payment method."
            actionText="Ok, Take Me There"
            onActionClick={() => null}
            image={<Image width="102" height="102" />}
          />
        ),
      },
    ],
  },

  examples: (
    <div>
      <p style={{ fontSize: 20 }}>
        The content property should receive a {`<FloatingHelper.Content>`}{' '}
        element.
        <br />
        See story:
        <br />
        <p style={{ fontSize: 25, fontWeight: 'bold' }}>
          {helperStorySettings.story}
        </p>
      </p>

      <CodeExample title="Simple Example" code={SimpleExampleRaw}>
        <div style={exampleWrapperStyle}>
          <SimpleExample />
        </div>
      </CodeExample>

      <CodeExample title="Full Example" code={FullExampleRaw}>
        <div style={exampleWrapperStyle}>
          <FullExample />
        </div>
      </CodeExample>

      <CodeExample
        title="Programmatic Open Example"
        code={ProgrammaticExampleRaw}
      >
        <div style={exampleWrapperStyle}>
          <ProgrammaticExample />
        </div>
      </CodeExample>

      <CodeExample title="Controlled Example" code={ControlledExampleRaw}>
        <div style={exampleWrapperStyle}>
          <ControlledExample />
        </div>
      </CodeExample>
    </div>
  ),
};
