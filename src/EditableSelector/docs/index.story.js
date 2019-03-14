import React from 'react';

import { tab, description, api, testkit } from 'wix-storybook-utils/Sections';
import CodeExample from 'wix-storybook-utils/CodeExample';

import EditableSelector from '..';

import CardWithEditableSelectorExample from './CardWithEditableSelector';
import CardWithEditableSelectorExampleRaw from '!raw-loader!./CardWithEditableSelector';

import PopoverWithEditableSelectorExample from './PopoverWithEditableSelector';
import PopoverhEditableSelectorExampleRaw from '!raw-loader!./PopoverWithEditableSelector';

export default {
  category: '11. Pickers and Selectors',
  storyName: '11.2 EditableSelector',

  component: EditableSelector,
  componentPath: '..',

  sections: [
    tab({
      title: 'Examples',
      sections: [
        description({
          text: (
            <div>
              <CodeExample
                title="Card With Editable Selector"
                code={CardWithEditableSelectorExampleRaw}
              >
                <CardWithEditableSelectorExample />
              </CodeExample>

              <CodeExample
                title="Popover With Editable Selector"
                code={PopoverhEditableSelectorExampleRaw}
              >
                <PopoverWithEditableSelectorExample />
              </CodeExample>
            </div>
          ),
        }),
      ],
    }),

    tab({
      title: 'API',
      sections: [api()],
    }),

    tab({
      title: 'Testkit',
      sections: [testkit()],
    }),
  ],
};
