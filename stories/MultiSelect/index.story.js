import { storySettings } from './storySettings';
import MultiSelect from '../../src/MultiSelect';

import playgroundStoryConfig from './MultiSelectPlaygroundConfig';

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,
  component: MultiSelect,
  componentPath: '../../src/MultiSelect',
  ...playgroundStoryConfig,
};
