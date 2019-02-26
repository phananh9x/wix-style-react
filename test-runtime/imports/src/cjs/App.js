const React = require('react');
const Text = require('../../../../Text');

class App extends React.Component {
  render() {
    return (
      <div data-name="App">
        <Text.default data-name="CJS-Text">Works!</Text.default>
      </div>
    );
  }
}

module.exports = App;
