/* eslint-disable react/prop-types */
import React from 'react';
import { storiesOf } from '@storybook/react';

import { getTestStoryKind } from '../../../stories/storiesHierarchy';
import { storySettings, testStories } from './storySettings';

import { Layout, Cell } from 'wix-style-react/Layout';
import Slider from 'wix-style-react/Slider';

class ControlledSlider extends React.Component {
  constructor({ value }) {
    super();
    this.state = { value };
  }

  render() {
    const onChange = value => this.setState({ value });
    return (
      <Slider {...this.props} value={this.state.value} onChange={onChange} />
    );
  }
}

const kind = getTestStoryKind(storySettings);

storiesOf(kind, module).add(testStories.slider, () => (
  <div style={{ margin: '30px' }}>
    <Layout gap={'60px'}>
      <Cell>
        Single handle
        <ControlledSlider
          dataHook={storySettings.dataHook}
          value={3}
          min={1}
          max={10}
        />
      </Cell>
      <Cell>
        Multiple handles
        <ControlledSlider
          dataHook={`${storySettings.dataHook}-multiple`}
          value={[2, 6, 8]}
          min={1}
          max={10}
        />
      </Cell>
      <Cell>
        Disabled
        <ControlledSlider value={3} min={1} max={10} disabled />
      </Cell>
    </Layout>
  </div>
));
