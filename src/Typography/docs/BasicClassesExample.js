import React from 'react';
import classNames from 'classnames';
import t from 'wix-style-react/Typography';

export default () => (
  <div>
    <h1 className={t.h1}>This is H1 heading</h1>
    <span
      className={classNames(t.text, t.sizeSmall, t.weightNormal, t.skinError)}
    >
      This is a text with: [size={"'small'"} weight={"'normal'"} skin=
      {"'error'"}]
    </span>
  </div>
);
