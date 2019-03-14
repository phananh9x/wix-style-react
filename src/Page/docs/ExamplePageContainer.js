import React from 'react';
import s from './ExamplePageContainer.scss';

/* This layout try to immitate the current BusinessManager's layout and styles. */

export const ExamplePageContainer = ({ children }) => (
  <div className={s.root}>
    <div className={s.header} />
    <div className={s.body}>
      <div className={s.sideBar}>
        <div className={s.sideBarContent}>SideBar Which is 220px wide</div>
      </div>
      <div className={s.rightSide}>
        <div className={s.mainContentContainer}>
          <div className={s.mainContent}>
            <div className={s.withLoadingIndicatorWrapper}>
              <div className={s.withLoadingIndicatorContainer}>{children}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
