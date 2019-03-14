import Skeleton from '..';
import { Category } from '../../../stories/storiesHierarchy';

const exampleContent = [
  {
    label: 'small/large/medium',
    value: [
      {
        size: 'small',
        type: 'line',
      },
      {
        size: 'large',
        type: 'line',
      },
      {
        size: 'medium',
        type: 'line',
      },
    ],
  },
  {
    label: 'small/medium/full',
    value: [
      {
        size: 'small',
        type: 'line',
      },
      {
        size: 'medium',
        type: 'line',
      },
      {
        size: 'full',
        type: 'line',
      },
    ],
  },
];

export default {
  category: Category.COMPONENTS,
  storyName: 'Skeleton',
  component: Skeleton,
  componentPath: '..',

  componentProps: {
    content: exampleContent[0].value,
    dataHook: 'storybook-skeleton',
  },

  exampleProps: {
    content: exampleContent,
  },
};
