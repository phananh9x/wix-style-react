import Label from '..';

const SIZES = ['small', 'medium'];

export default {
  category: '1. Foundation',
  storyName: '1.2 + Label',

  component: Label,
  componentPath: '..',

  componentProps: {
    children: 'Some label',
    size: 'medium',
    dataHook: 'storybook-label',
  },

  exampleProps: {
    size: SIZES,
  },
};
