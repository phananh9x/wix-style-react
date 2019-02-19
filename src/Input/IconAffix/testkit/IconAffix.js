import React from 'react';
import ReactDOM from 'react-dom';

import IconAffix from '../IconAffix';
import { InputContext } from '../../InputContext';

const iconDriverFactory = ({ element }) => {
  return {
    isEmpty: () => element.children.length === 0,
    hasChild: style => !!element.querySelector(style),
  };
};

const componentFactory = (props = {}, context = {}) => {
  let element;
  const wrapperDiv = document.createElement('div');
  ReactDOM.render(
    <div ref={r => (element = r)}>
      <InputContext.Provider value={context}>
        <IconAffix {...props} />
      </InputContext.Provider>
    </div>,
    wrapperDiv,
  );
  return { element: element.childNodes[0], wrapper: wrapperDiv };
};

const iconTestkitFactory = ({ wrapper, dataHook }) => {
  const element = wrapper.querySelector(`[data-hook='${dataHook}']`);
  return iconDriverFactory({ element, wrapper });
};

export { iconTestkitFactory, componentFactory, iconDriverFactory };
