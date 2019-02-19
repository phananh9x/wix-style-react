import React from 'react';
import PropTypes from 'prop-types';
import { InputContext } from '../InputContext';

export const InputConsumer = props => {
  if (typeof props.children !== 'function') {
    throw new Error(
      `child of ${props.consumerCompName} must be a context consumer function`,
    );
  }
  return (
    <InputContext.Consumer>
      {context => {
        if (!context) {
          throw new Error(
            `${
              props.consumerCompName
            } cannot be rendered outside the Input component`,
          );
        }
        return props.children(context);
      }}
    </InputContext.Consumer>
  );
};

InputConsumer.propTypes = {
  children: PropTypes.any.isRequired,
  consumerCompName: PropTypes.string,
};

InputConsumer.defaultProps = {
  consumerCompName: 'InputConsumer',
};
