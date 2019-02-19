import React from 'react';
import { renderIntoDocument } from 'react-dom/test-utils';

import { sectionHelperTestkitFactory } from '../../testkit';
import SectionHelper, { HELPER_APPEARANCE } from '.';

const createDriver = (props = {}) => {
  const dataHook = 'section-helper';
  const wrapper = document.createElement('div').appendChild(
    renderIntoDocument(
      <div>
        <SectionHelper {...props} dataHook={dataHook} />
      </div>,
    ),
  );
  return sectionHelperTestkitFactory({ wrapper, dataHook });
};

describe('SectionHelper', () => {
  it('should render', () => {
    const driver = createDriver();
    expect(driver.exists()).toBeTruthy();
  });

  it('should render children', () => {
    const driver = createDriver({ children: 'Muffins are the best!' });
    expect(driver.textContent()).toEqual('Muffins are the best!');
  });

  it('should render title', () => {
    const driver = createDriver({ title: 'Muffins are the best!' });
    expect(driver.titleText()).toEqual('Muffins are the best!');
  });

  describe('given `actionText` & `onAction` props', () => {
    it('should render button', () => {
      const driver = createDriver({
        actionText: 'Muffins are the best!',
        onAction: () => null,
      });

      expect(driver.actionText()).toEqual('Muffins are the best!');
    });

    it('should call `onAction` when clicked', () => {
      const onAction = jest.fn();
      const driver = createDriver({ onAction, actionText: 'hello' });
      driver.clickAction();
      expect(onAction).toBeCalled();
    });
  });

  describe('close button', () => {
    it('should call `onClose` when close btn clicked', () => {
      const onClose = jest.fn();
      const driver = createDriver({ onClose });
      driver.clickClose();
      expect(driver.isCloseButtonDisplayed()).toBeTruthy();
      expect(onClose).toBeCalled();
    });

    it('should not display the close button on demand', () => {
      const driver = createDriver({ showCloseButton: false });
      expect(driver.isCloseButtonDisplayed()).toBeFalsy();
    });
  });

  describe('Appearance', () => {
    it('should render `standard` by default', () => {
      const driver = createDriver();
      expect(driver.isWarning()).toBe(true);
    });

    Object.keys(HELPER_APPEARANCE).map(appearance =>
      it(`should support ${appearance} appearance`, () => {
        const driver = createDriver({ appearance });
        expect(
          driver[`is${appearance[0].toUpperCase()}${appearance.slice(1)}`](),
        ).toBe(true);
      }),
    );
  });
});
