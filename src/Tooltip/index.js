import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TooltipOld from '../Deprecated/Tooltip';
import TooltipNew from './Tooltip';
import deprecationLog from '../utils/deprecationLog';
import { allValidators } from '../utils/propTypes';

// NOTE: This is a class an not an SFC because our Tooltip can NOT accept SFC as children.
class Tooltip extends Component {
  static propTypes = {
    upgrade: allValidators(PropTypes.bool, (props, propName) => {
      if (!props[propName]) {
        deprecationLog(
          `Using "Tooltip" with current API is deprecated. In order to upgrade to the new Tooltip api just use "<Tooltip upgrade/>" and follow "7.1 Tooltip" changed api docs. IMPORTANT! - After upgrading, when you import the react/enzyme "tooltipTestkitFactory", you will get an async testkit (all methods are async).`,
        );
      }
    }),
  };
  render() {
    const { upgrade, ...rest } = this.props;
    return (
      (this.props.upgrade && <TooltipNew {...rest} />) || (
        <TooltipOld {...rest} />
      )
    );
  }
}

Tooltip.displayName = 'Tooltip';

export default Tooltip;
