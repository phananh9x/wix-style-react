// We can add here constants for the Storybook category names

export const RTL_QUERY_PARAM_NAME = 'rtl';

// Root Level
export const TESTS_PREFIX = 'Tests';

export const getTestStoryKind = ({ category, storyName }) =>
  `${TESTS_PREFIX}/${category}/${storyName}`;

export const Category = {
  FOUNDATION: '1. Foundation',
  LAYOUT: '2. Layout',
  BUTTONS: '5. Buttons',
  INPUTS: '3. Inputs',
  SELECTION: '4. Selection',
  TOOLTIP_AND_POPOVER: '7. Tooltip and Popover',
  PICKERS_AND_SELECTORS: '11. Pickers and Selectors',
  OTHER: '12. Other',
  COMPONENTS: 'Components',
  STYLING: 'Styling',
  WIP: 'WIP',
};
