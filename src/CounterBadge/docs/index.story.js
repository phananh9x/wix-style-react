import React from 'react';

import { SKIN } from 'wix-ui-backoffice/dist/src/components/StylableCounterBadge/constants';
import { Email } from 'wix-ui-icons-common';

import { storySettings } from './storySettings';
import { CounterBadge, Layout, Cell } from '../..';
import LiveCodeExample, {
  createPropsArray,
} from '../../../stories/utils/LiveCodeExample';

const createCounterWithBadge = props => `
<CounterBadge ${createPropsArray(props).join('\n       ')}>${
  props.value
}</CounterBadge>`;

const counterBadgeSkinExample = `
<div>
  ${Object.keys(SKIN)
    .map(skin => {
      return `
      <div style={{ 
        display: 'flex',
         padding: '5px 5px',
        }}>${createCounterWithBadge({
          skin,
          value: 1,
        })} - ${skin}
      </div>`;
    })
    .join('\n       ')}
</div>
`;

const exampleValues = [
  { label: 'Single digit', value: 1 },
  { label: '2 digits', value: 56 },
  { label: 'Icon', value: '<Hint />' },
];

const iconValuesExample = `
    <div>
    ${exampleValues
      .map(example => {
        return `
        <div style={{ 
          display: 'flex',
           padding: '5px 5px',
          }}>${createCounterWithBadge({
            value: example.value,
          })} - ${example.label}
        </div>`;
      })
      .join('\n       ')}
    </div>
`;

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,
  component: CounterBadge,
  componentPath: '..',

  componentProps: {
    children: '1',
    skin: SKIN.general,
  },
  exampleProps: {
    children: [
      { label: '12', value: '12' },
      { label: '1', value: '1' },
      { label: 'Icon (Email)', value: <Email /> },
    ],
    skin: Object.keys(SKIN).map(value => ({ label: value, value })),
  },
  hiddenProps: ['dataHook'],
  examples: (
    <div>
      <Layout>
        <Cell span={3}>
          <LiveCodeExample
            compact
            title="Skins"
            initialCode={counterBadgeSkinExample}
          />
        </Cell>
        <Cell span={3}>
          <LiveCodeExample
            compact
            title="Content"
            initialCode={iconValuesExample}
          />
        </Cell>
      </Layout>
    </div>
  ),
};
