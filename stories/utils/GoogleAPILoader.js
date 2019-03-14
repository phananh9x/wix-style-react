import React from 'react';
import PropTypes from 'prop-types';

import Loader from 'wix-style-react/Loader';

const STATUS = {
  success: 'success',
  loading: 'loading',
  error: 'error',
};

export default class GoogleMapsLoader extends React.Component {
  state = {
    dependencyStatus: STATUS.loading,
  };

  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  componentWillMount() {
    if (!window.google) {
      const googleScript = document.createElement('script');
      googleScript.src =
        '//maps.googleapis.com/maps/api/js?key=AIzaSyCZodLeNCWC7pnp6-5CoRfW2MjcyM7sijY&libraries=places&language=iwp';
      googleScript.onload = () =>
        this.setState({ dependencyStatus: STATUS.success });
      googleScript.onerror = () =>
        this.setState({ dependencyStatus: STATUS.error });
      document.head.appendChild(googleScript);
    } else {
      this.setState({ dependencyStatus: STATUS.success });
    }
  }

  errorView = () => (
    <div style={{ textAlign: 'center' }}>
      <h1>Error :(</h1>
      <div>
        Excuse me, unable to load required Google Maps API for this component
      </div>
      <div>Please try again later</div>
    </div>
  );

  successView = () => <div>{this.props.children}</div>;
  loadingView = () => (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <Loader text="Loading Google Maps API..." />
    </div>
  );

  views = {
    error: this.errorView,
    undefined: this.errorView,
    success: this.successView,
    loading: this.loadingView,
  };

  render() {
    return this.views[this.state.dependencyStatus]();
  }
}
