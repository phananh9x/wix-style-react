import { storySettings } from './storySettings';

import CalendarPanelFooter, { defaultDateToStringOptions } from '..';

export default {
  category: storySettings.kind,
  storyName: storySettings.storyName,

  component: CalendarPanelFooter,
  componentPath: '..',

  componentProps: {
    dataHook: storySettings.dataHook,
    primaryActionDisabled: false,
    primaryActionOnClick: () => null,
    secondaryActionOnClick: () => null,
    dateToString: date =>
      date.toLocaleDateString('en-US', defaultDateToStringOptions),
    selectedDays: {
      from: new Date('2019-05-27T21:00:00.000Z'),
      to: new Date('2019-05-27T21:00:00.000Z'),
    },
    primaryActionLabel: 'submit',
    secondaryActionLabel: 'cancel',
  },
};
