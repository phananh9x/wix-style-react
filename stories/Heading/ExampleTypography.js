import React from 'react';
import Heading from 'wix-style-react/Heading';
import s from './styles.scss';

export default () => (
  <div className={s.styleList}>
    <ul className={`ltr ${s.root}`}>
      <li>
        <span className={s.comp}>{'<Heading appearance="H1"/>'}</span>
        <span className={s.fonts}>
          <Heading>Helvetica_65 / 36px / 48px</Heading>
        </span>
      </li>
    </ul>
    <ul>
      <li>
        <span className={s.comp}>{'<Heading appearance="H2"/>'}</span>
        <span className={s.fonts}>
          <Heading appearance="H2">Helvetica_65 / 28px / 36px</Heading>
        </span>
      </li>
    </ul>
    <ul>
      <li>
        <span className={s.comp}>{'<Heading appearance="H3"/>'}</span>
        <span className={s.fonts}>
          <Heading appearance="H3">Helvetica_55 / 20px / 24px</Heading>
        </span>
      </li>
    </ul>
    <ul>
      <li>
        <span className={s.comp}>{'<Heading appearance="H4"/>'}</span>
        <span className={s.fonts}>
          <Heading appearance="H4">Helvetica_55 / 18px / 24px</Heading>
        </span>
      </li>
    </ul>
    <ul>
      <li>
        <span className={s.comp}>{'<Heading appearance="H5"/>'}</span>
        <span className={s.fonts}>
          <Heading appearance="H5">Helvetica_65 / 12px / 24px</Heading>
        </span>
      </li>
    </ul>
    <ul>
      <li>
        <span className={s.comp}>{'<Heading appearance="H6"/>'}</span>
        <span className={s.fonts}>
          <Heading appearance="H6">Helvetica_65 / 10px / 18px</Heading>
        </span>
      </li>
    </ul>
  </div>
);
