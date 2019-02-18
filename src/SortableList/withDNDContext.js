import React from 'react';

import DragDropContextProvider from '../DragDropContextProvider';

export default Component => (props) => (
  <DragDropContextProvider>
    <Component {...props}/>
  </DragDropContextProvider>
);