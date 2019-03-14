import Highlighter from '..';

export default {
  category: '12. Other',
  storyName: 'Highlighter',

  component: Highlighter,
  componentPath: '..',

  componentProps: () => ({
    children:
      'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto consequuntur earum eius eum fugiat',
    dataHook: 'story-highlighter',
  }),
};
