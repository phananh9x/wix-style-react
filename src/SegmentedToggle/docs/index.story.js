import React from 'react';
import { storySettings } from './storySettings';
import {
  tab,
  code,
  testkit,
  description,
  importExample,
  api,
} from 'wix-storybook-utils/Sections';
import { getParsedSource } from '../../../stories/autodocsRegistry';

import SegmentedToggle from '..';
import LockLocked from 'wix-style-react/new-icons/LockLocked';
import LockUnlocked from 'wix-style-react/new-icons/LockUnlocked';
import { Layout, Cell } from 'wix-style-react/Layout';

import ToggleButton from '../ToggleButton/ToggleButton';
import ToggleIcon from '../ToggleIcon/ToggleIcon';
import * as examples from './examples';

export default {
  category: storySettings.kind,
  storyName: storySettings.storyName,

  component: SegmentedToggle,
  componentPath: '..',

  componentProps: {
    dataHook: storySettings.dataHook,
    defaultSelected: 'locked',
    children: [
      <SegmentedToggle.Button value="locked" prefixIcon={<LockLocked />}>
        Locked
      </SegmentedToggle.Button>,
      <SegmentedToggle.Button value="unlocked" prefixIcon={<LockUnlocked />}>
        Very long fancy and hardly fitting tab
      </SegmentedToggle.Button>,
    ],
  },

  sections: [
    tab({
      title: 'Description',
      sections: [
        description(
          `🍫 SegmentedToggle is a view group containing typically three or more buttons that can be toggled on and off. These buttons visibly change to indicate whether an option is active or inactive.`,
        ),
        importExample({
          source:
            "import SegmentedToggle from 'wix-style-react/SegmentedToggle';",
        }),

        description({
          title: `Usage`,
          text: `🙋 Component includes compound components: Button and Icon. Make sure to pass prop "value" to compound components to enable selection control.`,
        }),

        description({
          title: `Text & Prefix`,
          text: `Icon accompanied by text make information easier to find and scan.`,
        }),

        code({
          source: examples.textAndIcon,
          components: { SegmentedToggle, LockLocked, Layout, Cell },
        }),

        description({
          title: `Text`,
          text: `Simple usecase where prefix icon is not an option.`,
        }),

        code({
          source: examples.text,
          components: { SegmentedToggle, LockLocked, Layout, Cell },
        }),

        description({
          title: `Icon`,
          text: `Icon only option is mostly used in narrow places. This option provides additional tooltip on hover in order to inform users on icons meaning.`,
        }),

        code({
          source: examples.icon,
          components: {
            SegmentedToggle,
            LockLocked,
            LockUnlocked,
            Layout,
            Cell,
          },
        }),
      ],
    }),

    tab({
      title: 'API',
      sections: [
        api(),
        api({ parsedSource: getParsedSource(ToggleButton) }),
        api({ parsedSource: getParsedSource(ToggleIcon) }),
      ],
    }),

    tab({
      title: 'Testkit',
      sections: [testkit()],
    }),
  ],
};
