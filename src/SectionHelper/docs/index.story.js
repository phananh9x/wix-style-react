import SectionHelper from '..';
import { storySettings } from './storySettings';

const titleExamples = [
  { label: 'short text', value: 'Look at this important message!' },

  {
    label: 'long text',
    value:
      'Look at this really long and important message that could in some cases contain many lengthy words like psychophysicotherapeutics!',
  },
];

const childrenExamples = [
  {
    label: 'short text',
    value: 'This is a very important message',
  },
  {
    label: 'long text',
    value:
      'This is the content of very important message which actully has a lot of detailed explanation about various things. It may even have multiple sentences but they do not need to be those boring "Lorem Ipsum"',
  },
];

export default {
  category: storySettings.category,
  storyName: storySettings.storyName,

  component: SectionHelper,
  componentPath: '..',

  componentProps: {
    dataHook: 'storybook-sectionhelper',
    actionText: 'I understand the consequences',
    appearance: 'standard',
    title: titleExamples[0].value,
    children: childrenExamples[0].value,
    showCloseButton: true,
  },

  exampleProps: {
    title: titleExamples,
    children: childrenExamples,

    onAction: () => 'onAction',
    onClose: () => 'onClose',
  },
};
