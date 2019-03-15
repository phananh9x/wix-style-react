import { Category } from '../../../stories/storiesHierarchy';
import Tooltip from '..';

export default {
  category: Category.TOOLTIP_AND_POPOVER,
  storyName: '7.1 Tooltip',

  component: Tooltip,
  componentPath: '../Tooltip.js',

  componentProps: {
    upgrade: true,
    buttonText: undefined,
  },
};
