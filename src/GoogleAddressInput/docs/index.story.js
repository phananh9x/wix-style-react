import React from 'react';
import { storySettings } from './storySettings';
import GoogleAddressInput from '..';

import clients from '../../clients';
import GoogleAPILoader from '../../../stories/utils/GoogleAPILoader';
import LiveCodeExample from '../../../stories/utils/LiveCodeExample';

const InFormExample = `
class ExampleWithFormField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    }
  }

  render() {
    return (
      <FormField label="GoogleAddressInput component">
        <GoogleAddressInput
          value={this.state.value}
          onChange={e => this.setState({value: e.target.value})}
          onSet={e => this.setState({value: e.originValue})}
          Client={clients.GoogleMapsClient}
        />
      </FormField>
    )
  }
}
render(<ExampleWithFormField/>);
`;

export default {
  category: storySettings.kind,
  storyName: storySettings.storyName,

  component: GoogleAddressInput,
  componentPath: '..',

  componentWrapper: ({ component }) => (
    <GoogleAPILoader>{component}</GoogleAPILoader>
  ),
  componentProps: setProps => ({
    dataHook: storySettings.dataHook,
    Client: clients.GoogleMapsClient,
    value: '',
    onChange: e => setProps({ value: e.target.value }),
    onSet: e => setProps({ value: e.originValue }),
    placeholder: 'Enter Address...',
  }),

  examples: (
    <GoogleAPILoader>
      <LiveCodeExample
        title="Usage in forms (with FormField)"
        initialCode={InFormExample}
        autoRender={false}
      />
    </GoogleAPILoader>
  ),
};
