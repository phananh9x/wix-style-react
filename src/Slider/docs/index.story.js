import React from 'react';
import {
  tabs,
  tab,
  description,
  api,
  testkit,
  importExample,
  header,
  columns,
  title,
  divider,
  playground,
  code as baseLiveCode,
} from 'wix-storybook-utils/Sections';
import { baseScope } from '../../../stories/utils/LiveCodeExample';
import * as examples from './examples';

import Slider from '..';

const liveCode = config =>
  baseLiveCode({
    compact: true,
    components: baseScope,
    ...config,
  });

const example = ({ source, ...rest }) =>
  columns([description({ ...rest }), liveCode({ source })]);

class SlideWithState extends React.Component {
  state = {
    value: 4,
  };

  change = value => this.setState({ value });

  render() {
    return (
      <div style={{ width: '50%', padding: '10px' }}>
        <Slider
          onChange={this.change}
          value={this.state.value}
          displayMarks={false}
          displayTooltip={false}
        />
      </div>
    );
  }
}
export default {
  category: '4. Selection',
  storyName: '4.7 Slider',

  component: Slider,

  componentPath: '..',

  componentProps: setProps => ({
    onChange: value => setProps({ value }),
  }),

  sections: [
    header({
      component: <SlideWithState />,
      issueUrl: 'https://github.com/wix/wix-style-react/issues/new',
      sourceUrl:
        'https://github.com/wix/wix-style-react/tree/master/src/Slider/Slider.js',
    }),

    tabs([
      tab({
        title: 'Description',
        sections: [
          description(
            `🐍 Sliders allow users to make selections from a range of values.`,
          ),

          importExample({
            source: "import Slider from 'wix-style-react/Slider';",
          }),

          description({
            title: 'Usage',
            text: `Slider is controlled component. User needs to control Slider's state.`,
          }),

          divider(),

          title('Examples'),

          ...[
            {
              title: 'Single Value',
              text: 'Single value slider.',
              source: examples.plainExample,
            },
            {
              title: 'Marks under',
              text: 'Slider supports showing marking values under the slider.',
              source: examples.plainSliderMarks,
            },
            {
              title: 'Multi Value',
              text: 'Usually used for user to select the range.',
              source: examples.rangeSlider,
            },
            {
              title: 'Pushable Handlers',
              text:
                'Allow pushing of surrounding handles when moving a handle.',
              source: examples.rangeSliderPushable,
            },
            {
              title: 'States',
              text: 'Slider supports `disabled` state.',
              source: examples.states,
            },
          ].map(example),
        ],
      }),

      tab({
        title: 'API',
        sections: [api()],
      }),

      tab({
        title: 'Testkit',
        sections: [testkit()],
      }),

      tab({
        title: 'Playground',
        sections: [playground()],
      }),
    ]),
  ],
};
