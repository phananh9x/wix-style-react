import Loader from '..';

export default {
  category: '1. Foundation',
  storyName: '1.5 Loader',

  component: Loader,
  componentPath: '..',

  componentProps: {
    dataHook: 'storybook-loader',
    status: 'loading',
    statusMessage: 'some message here',
    text: '',
  },
};
