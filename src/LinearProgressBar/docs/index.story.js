import LinearProgressBar from '..';

export default {
  category: '1. Foundation',
  storyName: '1.6 LinearProgressBar',

  component: LinearProgressBar,
  componentPath: '..',

  componentProps: {
    errorMessage: 'some error message',
    value: 20,
    light: false,
    error: false,
    showProgressIndication: false,
  },
};
