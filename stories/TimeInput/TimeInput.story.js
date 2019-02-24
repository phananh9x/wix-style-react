import TimeInput from 'wix-style-react/TimeInput';
import { storySettings } from './storySettings';

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,

  component: TimeInput,
  componentPath: '../../src/TimeInput', // TODO: move folder to TimePicker to align with component name

  exampleImport: `import TimePicker from 'wix-style-react/TimeInput';`,

  componentProps: {
    dashesWhenDisabled: false,
    disabled: false,
  },

  exampleProps: {
    onChange: moment => moment.format('h:mm a'),
  },
};
