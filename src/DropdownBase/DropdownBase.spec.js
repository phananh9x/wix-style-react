import React from 'react';
import { mount } from 'enzyme';
import { createUniDriverFactory } from 'wix-ui-test-utils/uni-driver-factory';
import { enzymeUniTestkitFactoryCreator } from 'wix-ui-test-utils/enzyme';

import DropdownBase from './DropdownBase';
import { dropdownBasePrivateDriverFactory } from './DropdownBase.private.driver';

describe('DropdownBase', () => {
  const createDriver = createUniDriverFactory(dropdownBasePrivateDriverFactory);

  const dropdownBaseEnzymeDriver = enzymeUniTestkitFactoryCreator(
    dropdownBasePrivateDriverFactory,
  );

  const defaultProps = {
    options: [
      { id: 0, value: 'First option' },
      { id: 1, value: 'Second option' },
      { id: 2, value: 'Third option' },
      { id: 3, value: 'Fourth option' },
    ],
  };

  const createUncontrolledDriver = (renderProp, initialProps) => {
    let args;

    const driver = createDriver(
      <DropdownBase {...defaultProps} {...initialProps}>
        {_args => {
          args = _args;
          return renderProp ? renderProp(_args) : <div>Hello again</div>;
        }}
      </DropdownBase>,
    );

    return {
      args,
      driver,
    };
  };

  const createControlledDriver = (renderProp, initialProps) => {
    let args;

    const dataHook = 'dropdown-base-0';
    const wrapper = mount(
      <DropdownBase
        {...defaultProps}
        dataHook={dataHook}
        open={false}
        {...initialProps}
      >
        {_args => {
          args = _args;
          return renderProp ? renderProp(_args) : <div>Hello again</div>;
        }}
      </DropdownBase>,
    );

    const driver = dropdownBaseEnzymeDriver({
      wrapper,
      dataHook,
    });

    return {
      args,
      driver,
      wrapper,
    };
  };

  it('should accept a node as a children', async () => {
    const driver = createDriver(
      <DropdownBase {...defaultProps}>
        <div>Hello</div>
      </DropdownBase>,
    );

    const targetElement = await driver.getTargetElement();
    expect(targetElement.innerHTML).toContain('Hello');
  });

  it('should accept a function as a children and pass it the required arguments', async () => {
    const driver = createDriver(
      <DropdownBase {...defaultProps}>
        {({ open, close, toggle, delegateKeyDown, selectedOption }) => {
          expect(typeof open).toBe('function');
          expect(typeof close).toBe('function');
          expect(typeof toggle).toBe('function');
          expect(typeof delegateKeyDown).toBe('function');

          expect(selectedOption).toEqual(undefined);

          return <div>Hello again</div>;
        }}
      </DropdownBase>,
    );

    const targetElement = await driver.getTargetElement();
    expect(targetElement.innerHTML).toContain('Hello again');
  });

  it('should call onSelect when an option was selected', async () => {
    const onSelectFn = jest.fn();

    const driver = createDriver(
      <DropdownBase {...defaultProps} open onSelect={onSelectFn}>
        <div>Hello</div>
      </DropdownBase>,
    );

    await driver.selectOption(0);

    expect(onSelectFn).toHaveBeenCalledWith({ id: 0, value: 'First option' });
  });

  it('should call onClickOutside', async () => {
    const onClickOutsideFn = jest.fn();

    const driver = createDriver(
      <DropdownBase {...defaultProps} onClickOutside={onClickOutsideFn}>
        <div>Hello</div>
      </DropdownBase>,
    );

    await driver.clickOutside();
    expect(onClickOutsideFn).toHaveBeenCalledTimes(1);
  });

  it('should call onMouseEnter', async () => {
    const onMouseEnterFn = jest.fn();

    const driver = createDriver(
      <DropdownBase {...defaultProps} onMouseEnter={onMouseEnterFn}>
        <div>Hello</div>
      </DropdownBase>,
    );

    await driver.mouseEnter();
    expect(onMouseEnterFn).toHaveBeenCalledTimes(1);
  });

  it('should call onMouseLeave', async () => {
    const onMouseLeaveFn = jest.fn();

    const driver = createDriver(
      <DropdownBase {...defaultProps} onMouseLeave={onMouseLeaveFn}>
        <div>Hello</div>
      </DropdownBase>,
    );

    await driver.mouseLeave();
    expect(onMouseLeaveFn).toHaveBeenCalledTimes(1);
  });

  describe('uncontrolled open behaviour', () => {
    it('should allow controlling the behaviour using a render prop', async () => {
      const { args, driver } = createUncontrolledDriver();

      args.open();
      expect(await driver.isDropdownShown()).toBeTruthy();

      args.close();
      expect(await driver.isDropdownShown()).toBeFalsy();

      args.toggle();
      expect(await driver.isDropdownShown()).toBeTruthy();

      args.toggle();
      expect(await driver.isDropdownShown()).toBeFalsy();
    });

    it('should close on click outside', async () => {
      const { args, driver } = createUncontrolledDriver();

      args.open();
      expect(await driver.isDropdownShown()).toBeTruthy();

      await driver.clickOutside();
      expect(await driver.isDropdownShown()).toBeFalsy();
    });

    it('should close when selecting an option', async () => {
      const { args, driver } = createUncontrolledDriver();

      args.open();
      expect(await driver.isDropdownShown()).toBeTruthy();

      await driver.selectOption(0);
      expect(await driver.isDropdownShown()).toBeFalsy();
    });

    describe('keyDown handling', () => {
      it('should delegate the event to the DropdownLayout', async () => {
        const { args, driver } = createUncontrolledDriver();

        // We'll press the ArrowDown key to highlight the next option, and then select it with the
        // Enter key.

        args.open();

        await driver.keyDown('ArrowDown');
        expect(await driver.isOptionHovered(0)).toBeTruthy();

        await driver.keyDown('Enter');
        args.open();
        expect(await driver.isOptionSelected(0)).toBeTruthy();
      });

      it.each([['Enter', 'Spacebar', 'ArrowDown']])(
        'should open the DropdownLayout when the %s key is pressed',
        async expectedKey => {
          const { driver } = createUncontrolledDriver();

          expect(await driver.isDropdownShown()).toBeFalsy();

          await driver.keyDown(expectedKey);
          expect(await driver.isDropdownShown()).toBeTruthy();
        },
      );
    });

    describe('mouseLeave handling', () => {
      it('should not close the popover when leaving the target element', async () => {
        // This test handles a special case when the `close` function triggers directly on the
        // `mouseleave` event of the target element. Normally, The `mouseleave` event will trigger
        // when the user moves the cursor from the target element to the DropdownLayout, thus the
        // DropdownLayout will be closed.
        // This is not the desired behaviour. As a result, the DropdownBase handle this specific
        // case.

        // We'll use a custom render function
        const { driver } = createUncontrolledDriver(({ open, close }) => {
          return (
            <div onMouseEnter={open} onMouseLeave={close}>
              Hover me!
            </div>
          );
        });

        await driver.mouseEnterTarget();
        expect(await driver.isDropdownShown()).toBeTruthy();

        // Dropdown should still be shown when a mouseLeave happens on the target
        await driver.mouseLeaveTarget();
        expect(await driver.isDropdownShown()).toBeTruthy();

        // Dropdown should be hidden when a mouseLeave happens on the DropdownLayout
        await driver.mouseLeave();
        expect(await driver.isDropdownShown()).toBeFalsy();
      });
    });
  });

  describe('controlled open behaviour', () => {
    it('should allow controlling the behaviour using the `open` prop', async () => {
      const { driver, wrapper } = createControlledDriver();

      wrapper.setProps({ open: true });
      expect(await driver.isDropdownShown()).toBeTruthy();

      wrapper.setProps({ open: false });
      expect(await driver.isDropdownShown()).toBeFalsy();
    });

    it('should not allow controlling the behaviour using a render prop', async () => {
      const { args, driver } = createControlledDriver();

      args.open();
      expect(await driver.isDropdownShown()).toBeFalsy();

      args.close();
      expect(await driver.isDropdownShown()).toBeFalsy();

      args.toggle();
      expect(await driver.isDropdownShown()).toBeFalsy();
    });

    it('should not close on click outside', async () => {
      const { driver, wrapper } = createControlledDriver();

      wrapper.setProps({ open: true });
      expect(await driver.isDropdownShown()).toBeTruthy();

      await driver.clickOutside();
      expect(await driver.isDropdownShown()).toBeTruthy();
    });

    it('should not close when selecting an option', async () => {
      const { driver, wrapper } = createControlledDriver();

      wrapper.setProps({ open: true });
      expect(await driver.isDropdownShown()).toBeTruthy();

      await driver.selectOption(0);
      expect(await driver.isDropdownShown()).toBeTruthy();
    });

    describe('keyDown handling', () => {
      it('should not delegate the event to the DropdownLayout by default', async () => {
        const { driver, wrapper } = createControlledDriver();

        wrapper.setProps({ open: true });

        await driver.keyDown('ArrowDown');
        expect(await driver.isOptionHovered(0)).toBeFalsy();

        await driver.keyDown('Enter');
        expect(await driver.isDropdownShown()).toBeTruthy();
      });
    });
  });

  describe('uncontrolled selection behaviour', () => {
    it('should accept an initialSelectedId and use it', async () => {
      const driver = createDriver(
        <DropdownBase {...defaultProps} open initialSelectedId={2}>
          <div>Hello</div>
        </DropdownBase>,
      );

      expect(await driver.isOptionSelected(2)).toBeTruthy();
    });

    it('should store the selection after user interaction', async () => {
      const driver = createDriver(
        <DropdownBase {...defaultProps} open>
          <div>Hello</div>
        </DropdownBase>,
      );

      await driver.selectOption(0);
      expect(await driver.isOptionSelected(0)).toBeTruthy();

      await driver.selectOption(2);
      expect(await driver.isOptionSelected(2)).toBeTruthy();
    });
  });

  describe('controlled selection behaviour', () => {
    it('should accept an initialSelectedId and use it', async () => {
      const { driver } = createControlledDriver(null, {
        open: true,
        onSelect: jest.fn(),
        selectedId: 0,
        initialSelectedId: 2,
      });

      expect(await driver.isOptionSelected(2)).toBeTruthy();
    });

    it('should update according to the selectedId', async () => {
      const { driver, wrapper } = createControlledDriver(null, {
        open: true,
        onSelect: jest.fn(),
        selectedId: 1,
      });

      expect(await driver.isOptionSelected(1)).toBeTruthy();

      wrapper.setProps({ selectedId: 2 });
      expect(await driver.isOptionSelected(2)).toBeTruthy();
    });

    it('should not store the selection after user interaction', async () => {
      const { driver } = createControlledDriver(null, {
        open: true,
        onSelect: jest.fn(),
        selectedId: 1,
      });

      await driver.selectOption(0);
      expect(await driver.isOptionSelected(0)).toBeFalsy();
      expect(await driver.isOptionSelected(1)).toBeTruthy();

      await driver.selectOption(2);
      expect(await driver.isOptionSelected(2)).toBeFalsy();
      expect(await driver.isOptionSelected(1)).toBeTruthy();
    });
  });
});
