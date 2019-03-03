import React from 'react';
import styles from './Hash.st.css';

export const Hash = ({ disabled, size }) => (
  <div data-hook="colorinput-hash" {...styles('root', { disabled, size })}>
    #
  </div>
);
