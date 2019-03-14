import React from 'react';
import { Simulate, renderIntoDocument } from 'react-dom/test-utils';

import Ticker from '..';

import styles from '../Ticker.scss';
import { InputContext } from '../../InputContext';

export const tickerDriverFactory = component => {
  const handlers = {
    getUp: () => component.querySelector(`.${styles.up}`),
    getDown: () => component.querySelector(`.${styles.down}`),
    clickUp: () => Simulate.click(handlers.getUp()),
    clickDown: () => Simulate.click(handlers.getDown()),
    isUpDisabled: () => handlers.getUp().classList.contains(styles.disabled),
    isDownDisabled: () =>
      handlers.getDown().classList.contains(styles.disabled),
    exists: () => !!component,
  };
  return handlers;
};

export const componentFactory = (props = {}, context = {}) =>
  renderIntoDocument(
    <div>
      <InputContext.Provider value={context}>
        <Ticker dataHook="ticker" {...props} />
      </InputContext.Provider>
    </div>,
  ).childNodes[0];

export const tickerTestkitFactory = ({ wrapper }) =>
  tickerDriverFactory(wrapper.querySelector('[data-hook=ticker]'));
