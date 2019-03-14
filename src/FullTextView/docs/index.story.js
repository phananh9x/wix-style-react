import FullTextView from '..';

export default {
  category: '12. Other',
  storyName: '12.4 FullTextView',
  component: FullTextView,
  componentPath: '..',

  componentProps: {
    children: 'Very long fancy and hardly fitting tab',
    maxWidth: '172px',
  },

  exampleProps: {
    onChange: ev => ev.hex(),
    onCancel: () => 'Cancelled',
    onConfirm: () => 'Confirmed',
  },
};
