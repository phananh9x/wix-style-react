import React from 'react';
import ReactDOM from 'react-dom';

import Custom from '../Affix';
import { InputContext } from '../../InputContext';

const customDriverFactory = ({ element }) => {
  return {
    isEmpty: () => element.children.length === 0,
    hasChild: style => !!element.querySelector(style),
    getValue: () => element.textContent,
  };
};

const componentFactory = (props = {}, context = {}) => {
  let element;
  const wrapperDiv = document.createElement('div');
  ReactDOM.render(
    <div ref={r => (element = r)}>
      <InputContext.Provider value={context}>
        <Custom {...props} />
      </InputContext.Provider>
    </div>,
    wrapperDiv,
  );
  return { element: element.childNodes[0], wrapper: wrapperDiv };
};

const customTestkitFactory = ({ wrapper, dataHook }) => {
  const element = wrapper.querySelector(`[data-hook='${dataHook}']`);
  return customDriverFactory({ element, wrapper });
};

export { customTestkitFactory, componentFactory, customDriverFactory };
