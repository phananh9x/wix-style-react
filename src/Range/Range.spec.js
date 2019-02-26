import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import Range from './Range';
import DatePicker from '../DatePicker';
import { rangePolyfill } from '../../testkit/polyfills';

import { rangeTestkitFactory } from '../../testkit';

describe('Range', () => {
  beforeEach(() => {
    rangePolyfill.install();
  });

  afterEach(() => {
    rangePolyfill.uninstall();
  });

  it('should work with datePickers', () => {
    const onChange = jest.fn();
    const div = document.createElement('div');
    const dataHook = 'compHook';
    const wrapper = div.appendChild(
      ReactTestUtils.renderIntoDocument(
        <div>
          <Range dataHook={dataHook}>
            <DatePicker onChange={onChange} />
            <DatePicker onChange={onChange} />
          </Range>
        </div>,
      ),
    );
    const rangeTestkit = rangeTestkitFactory({ wrapper, dataHook });
    expect(rangeTestkit.exists()).toBeTruthy();
  });
});
