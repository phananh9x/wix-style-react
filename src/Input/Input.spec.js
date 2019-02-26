import React from 'react';
import sinon from 'sinon';

import inputDriverFactory from './Input.driver';
import Input from '.';
import { createDriverFactory } from 'wix-ui-test-utils/driver-factory';
import { inputTestkitFactory, tooltipTestkitFactory } from '../../testkit';
import { inputTestkitFactory as enzymeInputTestkitFactory } from '../../testkit/enzyme';
import {
  isTestkitExists,
  isEnzymeTestkitExists,
} from '../../test/utils/testkit-sanity';
import { makeControlled, resolveIn } from '../../test/utils';
import { mount } from 'enzyme';
import {
  createRendererWithDriver,
  cleanup,
  render,
} from '../../test/utils/unit';
import Search from '../new-icons/Search';

describe('Input', () => {
  /* eslint-disable-next-line no-shadow */
  const render = createRendererWithDriver(inputDriverFactory);
  const createDriver = createDriverFactory(inputDriverFactory);
  const ControlledInput = makeControlled(Input);

  afterEach(() => {
    cleanup();
  });

  describe('test tooltip', () => {
    it('should display the error tooltip on hover', () => {
      const driver = createDriver(
        <Input error errorMessage="I'm the error message" />,
      );
      const dataHook = driver.getTooltipDataHook();
      const wrapper = driver.getTooltipElement();
      const tooltipDriver = tooltipTestkitFactory({ wrapper, dataHook });
      tooltipDriver.mouseEnter();

      return resolveIn(500).then(() => {
        expect(tooltipDriver.getContent()).toBe("I'm the error message");
      });
    });

    describe('tooltipPlacement attribute', () => {
      ['top', 'bottom', 'left', 'right'].forEach(placement => {
        it(`should have a tooltip positioned to the ${placement}`, () => {
          const driver = createDriver(
            <Input
              error
              errorMessage="I'm the error message"
              theme="amaterial"
              tooltipPlacement={placement}
            />,
          );
          const dataHook = driver.getTooltipDataHook();
          const wrapper = driver.getTooltipElement();
          const tooltipDriver = tooltipTestkitFactory({ wrapper, dataHook });
          tooltipDriver.mouseEnter();

          return resolveIn(500).then(() => {
            expect(tooltipDriver.getPlacement()).toBe(placement);
          });
        });
      });
    });

    describe('onTooltipShow attribute (only for amaterial theme for now)', () => {
      it('should be called when error tooltip is active', () => {
        const onTooltipShow = sinon.spy();

        const driver = createDriver(
          <Input
            theme="amaterial"
            error
            errorMessage="I'm the error message"
            onTooltipShow={onTooltipShow}
          />,
        );
        const dataHook = driver.getTooltipDataHook();
        const wrapper = driver.getTooltipElement();
        const tooltipDriver = tooltipTestkitFactory({ wrapper, dataHook });
        tooltipDriver.mouseEnter();

        return resolveIn(500).then(() => {
          expect(onTooltipShow.calledOnce).toBeTruthy();
        });
      });

      it('should be called when help tooltip is active (only for amaterial theme for now)', () => {
        const onTooltipShow = sinon.spy();

        const driver = createDriver(
          <Input
            theme="amaterial"
            help
            helpMessage="I'm the help message"
            onTooltipShow={onTooltipShow}
          />,
        );
        const dataHook = driver.getTooltipDataHook();
        const wrapper = driver.getTooltipElement();
        const tooltipDriver = tooltipTestkitFactory({ wrapper, dataHook });
        tooltipDriver.mouseEnter();

        return resolveIn(500).then(() => {
          expect(onTooltipShow.calledOnce).toBeTruthy();
        });
      });
    });
  });

  describe('enterText driver method', () => {
    it('passes the name and value attribute', () => {
      const onChange = jest.fn();
      const props = {
        type: 'text',
        name: 'gal',
        onChange,
      };
      const driver = createDriver(<Input {...props} />);
      driver.enterText('some text');
      expect(onChange).toHaveBeenCalledTimes(1);
      const eventTarget = onChange.mock.calls[0][0].target;
      expect(eventTarget).toEqual({
        name: 'gal',
        type: 'text',
        value: 'some text',
      });
    });
  });

  describe('name attribute', () => {
    it('should pass down to the wrapped input', () => {
      const props = {
        name: 'hello',
      };

      const driver = createDriver(<Input {...props} />);
      expect(driver.getName()).toEqual(props.name);
    });
  });

  describe('type attribute', () => {
    it('should pass down to the wrapped input', () => {
      const props = {
        type: 'number',
      };

      const driver = createDriver(<Input {...props} />);
      expect(driver.getType()).toEqual(props.type);
    });
  });

  describe('value attribute', () => {
    it('should pass down to the wrapped input', () => {
      const props = {
        value: 'hello',
        onChange: () => {},
      };

      const driver = createDriver(<Input {...props} />);
      expect(driver.getValue()).toEqual(props.value);
    });
  });

  describe('required attribute', () => {
    it('should pass down to the wrapped input', () => {
      const driver = createDriver(<Input required />);
      expect(driver.getRequired()).toBeTruthy();
    });
  });

  describe('autocomplete attribute', () => {
    it('should pass down to the wrapped input', () => {
      const driver = createDriver(<Input autocomplete="email" />);
      expect(driver.getAutocomplete()).toBe('email');
    });
  });

  describe('defaultValue attribute', () => {
    it('should pass down to the wrapped input', () => {
      const defaultValue = 'hello';

      const driver = createDriver(<Input defaultValue={defaultValue} />);
      expect(driver.getDefaultValue()).toEqual(defaultValue);
    });
  });

  describe('tabIndex attribute', () => {
    it('should pass down to the wrapped input', () => {
      const tabIndex = 1;

      const driver = createDriver(<Input tabIndex={tabIndex} />);
      expect(driver.getTabIndex()).toEqual(tabIndex);
    });
  });

  describe('readOnly attribute', () => {
    it('should pass down to the wrapped input', () => {
      const driver = createDriver(<Input readOnly />);
      expect(driver.getReadOnly()).toBeTruthy();
    });

    it('should pass down to the wrapped input with default false value', () => {
      const driver = createDriver(<Input />);
      expect(driver.getReadOnly()).toBeFalsy();
    });
  });

  describe('textOverflow attribute', () => {
    it('should pass down to the wrapped input', () => {
      const driver = createDriver(<Input textOverflow="ellipsis" />);
      expect(driver.getTextOverflow()).toBe('ellipsis');
    });

    it('should pass down to the wrapped input with default clip value', () => {
      const driver = createDriver(<Input />);
      expect(driver.getTextOverflow()).toBe('clip');
    });
  });

  describe('`type` prop', () => {
    it('should set type attribute', () => {
      const driver = createDriver(<Input type="number" />);
      expect(driver.getType()).toBe('number');
    });

    describe('when "number"', () => {
      it('should prevent onChange to be called with non numeric values', () => {
        const onChange = jest.fn();
        const driver = createDriver(
          <Input type="number" onChange={onChange} value="2" />,
        );
        driver.trigger('change', { target: { value: 'a' } });
        driver.trigger('keyPress', { target: { key: 'l' } });
        expect(driver.getValue()).toEqual('2');
        expect(onChange).not.toHaveBeenCalled();
      });
    });
  });

  describe('status attribute', () => {
    it('deprecated - should display an error icon if error is true', () => {
      const driver = createDriver(<Input error />);

      expect(driver.hasExclamation()).toBeTruthy();
      expect(driver.hasError()).toBeTruthy();
    });

    it('should display an error icon if status is error', () => {
      const driver = createDriver(<Input status={'error'} />);

      expect(driver.hasExclamation()).toBeTruthy();
      expect(driver.hasError()).toBeTruthy();
    });

    it('should display a loader icon if status is loading', () => {
      const driver = createDriver(<Input status={'loading'} />);

      expect(driver.hasLoader()).toBeTruthy();
    });
  });

  describe('help attribute', () => {
    it('should display an help icon if help is true', () => {
      const driver = createDriver(<Input help />);

      expect(driver.hasHelp()).toBeTruthy();
    });
  });

  describe('unit attribute', () => {
    it('should the unit text if passed', () => {
      const unit = '$';

      const driver = createDriver(<Input unit={unit} />);
      expect(driver.getUnit()).toEqual(unit);
    });

    it('should invoke onInputClicked while click on unit', () => {
      const onInputClicked = jest.fn();
      const driver = createDriver(
        <Input unit="$" onInputClicked={onInputClicked} />,
      );
      driver.clickUnit();
      expect(onInputClicked).toBeCalled();
    });

    it('should not fail while click on unit without passing onInputClicked', () => {
      const driver = createDriver(<Input unit="$" />);
      expect(() => {
        driver.clickUnit();
      }).not.toThrowError(/onInputClicked is not a function/);
    });
  });

  describe('magnifyingGlass attribute', () => {
    it('should display a magnifying glass icon if magnifyingGlass is true', () => {
      const driver = createDriver(<Input magnifyingGlass />);
      expect(driver.hasMagnifyingGlass()).toBeTruthy();
    });

    it('should not display a magnifying glass icon if magnifyingGlass is false', () => {
      const driver = createDriver(<Input magnifyingGlass={false} />);
      expect(driver.hasMagnifyingGlass()).toBeFalsy();
    });

    it('should not display a magnifying glass icon if error is true', () => {
      const driver = createDriver(<Input magnifyingGlass error />);
      expect(driver.hasMagnifyingGlass()).toBeFalsy();
    });

    it('should invoke onInputClicked while click on magnifying glass icon', () => {
      const onInputClicked = jest.fn();
      const driver = createDriver(
        <Input magnifyingGlass onInputClicked={onInputClicked} />,
      );
      driver.clickMagnifyingGlass();
      expect(onInputClicked).toBeCalled();
    });

    it('should not fail while click on magnifying glass icon without passing onInputClicked', () => {
      const driver = createDriver(<Input magnifyingGlass />);
      expect(() => {
        driver.clickMagnifyingGlass();
      }).not.toThrowError(/onInputClicked is not a function/);
    });
  });

  describe('menuArrow attribute', () => {
    it('should display a menu arrow icon if menuArrow is true', () => {
      const driver = createDriver(<Input menuArrow />);
      expect(driver.hasMenuArrow()).toBeTruthy();
    });

    it('should not display a menu arrow icon if menuArrow is false', () => {
      const driver = createDriver(<Input menuArrow={false} />);
      expect(driver.hasMenuArrow()).toBeFalsy();
    });

    it('should display a menu arrow icon if error is true', () => {
      const driver = createDriver(<Input menuArrow error />);
      expect(driver.hasMenuArrow()).toBeTruthy();
    });

    it('should have a narrow error style of arrow is shown', () => {
      const driver = createDriver(<Input menuArrow error />);
      expect(driver.isNarrowError()).toBeTruthy();
      expect(driver.hasExclamation()).toBeTruthy();
    });

    it('should not display a menu arrow icon if magnifyingGlass is true', () => {
      const driver = createDriver(<Input menuArrow magnifyingGlass />);
      expect(driver.hasMenuArrow()).toBeFalsy();
    });

    it('should invoke onInputClicked while click on menu arrow icon', () => {
      const onInputClicked = jest.fn();
      const driver = createDriver(
        <Input menuArrow onInputClicked={onInputClicked} />,
      );
      driver.clickMenuArrow();
      expect(onInputClicked).toBeCalled();
    });

    it('should not fail while click on menu arrow icon without passing onInputClicked', () => {
      const driver = createDriver(<Input menuArrow />);
      expect(() => {
        driver.clickMenuArrow();
      }).not.toThrowError(/onInputClicked is not a function/);
    });
  });

  describe('rtl attribute', () => {
    it('should have rtl if rtl prop is true', () => {
      const driver = createDriver(<Input rtl />);
      expect(driver.isRTL()).toBeTruthy();
    });

    it('should not have rtl if rtl prop is false', () => {
      const driver = createDriver(<Input rtl={false} />);
      expect(driver.isRTL()).toBeFalsy();
    });
  });

  describe('onChange attribute', () => {
    it('should be called when text is entered to the input', () => {
      const onChange = jest.fn();
      const event = { target: { value: 'world' } };

      const driver = createDriver(<Input onChange={onChange} />);

      driver.trigger('change', event);

      expect(onChange).toBeCalled();
    });
  });

  describe('onKeyUp attribute', () => {
    it('should be called after keybord key got pressed and then released', () => {
      const onKeyUp = jest.fn();
      const event = { target: { value: 'world' } };

      const driver = createDriver(<Input onKeyUp={onKeyUp} />);

      driver.trigger('keyUp', event);

      expect(onKeyUp).toBeCalled();
    });
  });

  describe('onFocus attribute', () => {
    it('should be called when the input gets focused', () => {
      const onFocus = jest.fn();
      const driver = createDriver(<Input onFocus={onFocus} />);

      driver.trigger('focus');

      expect(onFocus).toBeCalled();
    });
  });

  describe('onBlur attribute', () => {
    it('should be called when the input gets blured', () => {
      const onBlur = jest.fn();
      const driver = createDriver(<Input onBlur={onBlur} />);

      driver.trigger('blur');

      expect(onBlur).toBeCalled();
    });
  });

  describe('onKeyDown attribute', () => {
    it('should be called when text is entered to the wrapped input', () => {
      const onKeyDown = jest.fn();
      const event = { keyCode: 40 };

      const driver = createDriver(<Input onKeyDown={onKeyDown} />);

      driver.trigger('keyDown', event);

      expect(onKeyDown).toBeCalled();
    });
  });

  describe('onPaste attribute', () => {
    it('should be called when pasting text to the input', () => {
      const onPaste = jest.fn();

      const driver = createDriver(<Input onPaste={onPaste} />);

      driver.trigger('paste');

      expect(onPaste).toBeCalled();
    });
  });

  describe('forceFocus attribute', () => {
    it('should have focus class on input if forceFocus is true', () => {
      const driver = createDriver(<Input forceFocus />);
      expect(driver.isFocusedStyle()).toBeTruthy();
    });
  });

  describe('forceHover attribute', () => {
    it('should have hover class on input if forceHover is true', () => {
      const driver = createDriver(<Input forceHover />);
      expect(driver.isHoveredStyle()).toBeTruthy();
    });

    it('should be hovered if forceFocus is false and forceHover is true', () => {
      const driver = createDriver(<Input forceHover forceFocus={false} />);
      expect(driver.isHoveredStyle()).toBeTruthy();
    });
  });

  describe('disable attribute', () => {
    it('should have disabled class on input if disabled is true', () => {
      const driver = createDriver(<Input disabled />);
      expect(driver.isDisabled()).toBeTruthy();
    });
  });

  describe('autoFocus attribute', () => {
    it('Mounting an input element with autoFocus=false, should give it the focus', () => {
      const { driver, rerender } = render(<Input autoFocus={false} />);
      expect(driver.isFocus()).toBeFalsy();

      rerender(<Input autoFocus />);
      expect(driver.isFocus()).toBeFalsy();
    });

    it('Mounting an input element with autoFocus=true, gives it the focus', () => {
      const driver = createDriver(<Input autoFocus />);
      expect(driver.isFocus()).toBeTruthy();
    });

    describe('with value attribute', () => {
      const value = 'this is a string';

      it('Should focus with cursor located at the end of the value', () => {
        const driver = createDriver(<Input autoFocus value={value} />);
        expect(driver.getCursorLocation()).toEqual(value.length);
      });
    });
  });

  describe('driver.focus', () => {
    it('calling driver.focus (wihtout enzyme) should give focus to the input', () => {
      const driver = createDriver(<Input autoFocus={false} />);
      expect(driver.isFocus()).toBeFalsy();
      driver.focus();
      expect(driver.isFocus()).toBeTruthy();
    });
  });

  describe('Input.focus', () => {
    it('calling driver.focus (with enzyme) with options, should call the Input instance focus method and pass options', () => {
      const wrapper = mount(<Input autoFocus={false} dataHook="test" />);
      const focusMock = jest.fn();
      wrapper.instance().input.focus = focusMock;
      wrapper.instance().focus({ preventScroll: true });
      expect(focusMock).toHaveBeenCalledWith({ preventScroll: true });
    });
  });

  describe('theme attribute', () => {
    it('should set the theme by default to "normal"', () => {
      const driver = createDriver(<Input />);
      expect(driver.isOfStyle('normal')).toBeTruthy();
    });

    it('should allowing setting the theme to "paneltitle"', () => {
      const driver = createDriver(<Input theme="paneltitle" />);
      expect(driver.isOfStyle('paneltitle')).toBeTruthy();
    });

    it('should allow setting the theme to "material"', () => {
      const driver = createDriver(<Input theme="material" />);
      expect(driver.isOfStyle('material')).toBeTruthy();
    });

    it('should allow setting the theme to "flat"', () => {
      const driver = createDriver(<Input theme="flat" />);
      expect(driver.isOfStyle('flat')).toBeTruthy();
    });

    it('should allow setting the theme to "flatdark"', () => {
      const driver = createDriver(<Input theme="flatdark" />);
      expect(driver.isOfStyle('flatdark')).toBeTruthy();
    });
  });

  describe('clearButton attribute', () => {
    it('should be displayed when input text is not empty', () => {
      const driver = createDriver(<Input value="some value" clearButton />);
      expect(driver.hasClearButton()).toBe(true);
    });

    it('should not be displayed when input text is empty', () => {
      const driver = createDriver(<Input value="" clearButton />);
      expect(driver.hasClearButton()).toBe(false);
    });

    it('should clear input and focus it', () => {
      const driver = createDriver(
        <ControlledInput clearButton value="some value" />,
      );
      driver.clickClear();
      expect(driver.getValue()).toBe('');
      expect(driver.isFocus()).toBe(true);
    });

    it('should trigger onChange on clearing as if input just emptied', () => {
      const onChange = jest.fn();
      const driver = createDriver(
        <Input onChange={onChange} value="some value" clearButton />,
      );
      driver.clickClear();
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange.mock.calls[0][0].target.value).toBe('');
    });

    // eslint-disable-next-line jest/no-disabled-tests
    describe.skip('Uncontrolled', () => {
      // TODO
      it('should be displayed when using uncontrolled component with defaultValue', () => {
        const driver = createDriver(
          <Input defaultValue="some value" clearButton />,
        );
        expect(driver.hasClearButton()).toBe(true);
      });

      // TODO
      it('should be displayed after entering text into empty uncontrolled input', () => {
        const driver = createDriver(<Input clearButton />);
        driver.enterText('some value');
        expect(driver.hasClearButton()).toBe(true);
      });

      // TODO
      it('should clear input when using uncontrolled component', () => {
        const driver = createDriver(<Input clearButton />);
        driver.enterText('some value');
        driver.clickClear();
        expect(driver.getValue()).toBe('');
        expect(driver.isFocus()).toBe(true);
      });

      // TODO
      it('should be hidden after default value was overridden with some input', () => {
        const driver = createDriver(
          <Input defaultValue="some default value" clearButton />,
        );
        expect(driver.hasClearButton()).toBe(true);
        driver.clearText();
        driver.enterText('new value');
        expect(driver.hasClearButton()).toBe(false);
      });
    });
  });

  describe('onClear attribute', () => {
    it('should display clear-button when input text is not empty', () => {
      const driver = createDriver(
        <Input value="some value" onClear={() => null} />,
      );
      expect(driver.hasClearButton()).toBe(true);
    });

    it('should invoke callback', () => {
      const onClear = sinon.spy();
      const driver = createDriver(
        <Input onClear={onClear} value="some value" />,
      );
      expect(driver.hasClearButton()).toBe(true);
      driver.clickClear();
      expect(onClear.calledOnce).toBe(true);
    });
  });

  describe('clear method', () => {
    it('should fire onChange one time when onChange implementation fires clear', () => {
      class ControlledInputWithRef extends React.Component {
        state = {
          value: '',
        };
        constructor(props) {
          super(props);
          this.handleChange = this.handleChange.bind(this);
        }

        handleChange(e) {
          this.setState({ value: e.target.value });
          this.input.clear();
        }

        render() {
          return (
            <Input
              ref={comp => (this.input = comp)}
              value={this.state.value}
              onChange={this.handleChange}
              dataHook="my-input"
            />
          );
        }
      }

      const handleChangeSpy = jest.spyOn(
        ControlledInputWithRef.prototype,
        'handleChange',
      );
      const { driver } = render(<ControlledInputWithRef />, 'my-input');

      driver.enterText('foo');
      expect(handleChangeSpy).toHaveBeenCalledTimes(2);
      expect(handleChangeSpy.mock.calls[0][0].target.value).toBe('foo');
      expect(handleChangeSpy.mock.calls[1][0].target.value).toBe('');
    });
  });

  describe('prefix attribute', () => {
    it('should allow adding a custom prefix component', () => {
      const driver = createDriver(
        <Input prefix={<div className="my-button" />} />,
      );
      expect(driver.hasPrefix()).toBeTruthy();
      expect(driver.prefixComponentExists('.my-button')).toBeTruthy();
    });

    it('should add `withPrefix` classname to input', () => {
      const driver = createDriver(<Input prefix="hello" />);
      expect(driver.hasPrefixClass()).toBeTruthy();
    });

    it('should invoke onInputClicked while click on custom affix', () => {
      const onInputClicked = jest.fn();
      const driver = createDriver(
        <Input
          prefix={<Input.Affix>$</Input.Affix>}
          onInputClicked={onInputClicked}
        />,
      );
      driver.clickCustomAffix();
      expect(onInputClicked).toBeCalled();
    });

    it('should not fail while click on custom affix without passing onInputClicked', () => {
      const driver = createDriver(
        <Input prefix={<Input.Affix>$</Input.Affix>} />,
      );
      expect(() => {
        driver.clickCustomAffix();
      }).not.toThrowError(/onInputClicked is not a function/);
    });
    it('should invoke onInputClicked while click on icon affix', () => {
      const onInputClicked = jest.fn();
      const driver = createDriver(
        <Input
          prefix={
            <Input.IconAffix dataHook="icon-affix">
              <Search />
            </Input.IconAffix>
          }
          onInputClicked={onInputClicked}
        />,
      );
      driver.clickIconAffix();
      expect(onInputClicked).toBeCalled();
    });

    it('should not fail while click on icon affix without passing onInputClicked', () => {
      const driver = createDriver(
        <Input
          prefix={
            <Input.IconAffix dataHook="icon-affix">
              <Search />
            </Input.IconAffix>
          }
        />,
      );
      expect(() => {
        driver.clickIconAffix();
      }).not.toThrowError(/onInputClicked is not a function/);
    });
  });

  describe('suffix attribute', () => {
    it('should allow adding a custom suffix component', () => {
      const driver = createDriver(
        <Input suffix={<div className="my-button" />} />,
      );
      expect(driver.hasSuffix()).toBeTruthy();
      expect(driver.suffixComponentExists('.my-button')).toBeTruthy();
    });

    it('should add `withSuffix` classname to input', () => {
      const driver = createDriver(<Input suffix="hello" />);
      expect(driver.hasSuffixClass()).toBeTruthy();
    });

    it('should add `withSuffixes` classname to input when more than 1 suffix applied', () => {
      const driver = createDriver(<Input suffix="hello" magnifyingGlass />);
      expect(driver.hasSuffixesClass()).toBeTruthy();
    });

    it('should render menu arrow as the last suffix', () => {
      const driver = createDriver(<Input suffix="hello" menuArrow />);
      expect(driver.isMenuArrowLast()).toBeTruthy();
    });

    it('should invoke onInputClicked while click on custom affix', () => {
      const onInputClicked = jest.fn();
      const driver = createDriver(
        <Input
          suffix={<Input.Affix>$</Input.Affix>}
          onInputClicked={onInputClicked}
        />,
      );
      driver.clickCustomAffix();
      expect(onInputClicked).toBeCalled();
    });

    it('should not fail while click on custom affix without passing onInputClicked', () => {
      const driver = createDriver(
        <Input suffix={<Input.Affix>$</Input.Affix>} />,
      );
      expect(() => {
        driver.clickCustomAffix();
      }).not.toThrowError(/onInputClicked is not a function/);
    });

    it('should invoke onInputClicked while click on icon affix', () => {
      const onInputClicked = jest.fn();
      const driver = createDriver(
        <Input
          suffix={
            <Input.IconAffix dataHook="icon-affix">
              <Search />
            </Input.IconAffix>
          }
          onInputClicked={onInputClicked}
        />,
      );
      driver.clickIconAffix();
      expect(onInputClicked).toBeCalled();
    });

    it('should not fail while click on icon affix without passing onInputClicked', () => {
      const driver = createDriver(
        <Input
          suffix={
            <Input.IconAffix dataHook="icon-affix">
              <Search />
            </Input.IconAffix>
          }
        />,
      );
      expect(() => {
        driver.clickIconAffix();
      }).not.toThrowError(/onInputClicked is not a function/);
    });
  });

  describe('aria attributes', () => {
    it('should allow adding a custom aria-label', () => {
      const driver = createDriver(<Input ariaLabel="hello" />);
      expect(driver.getAriaLabel()).toBe('hello');
    });

    it('should not have any aria label buy default', () => {
      const driver = createDriver(<Input />);
      expect(driver.getAriaLabel()).toBeNull;
    });

    it('should allow adding aria-controls', () => {
      const driver = createDriver(<Input ariaControls="id" />);
      expect(driver.getAriaControls()).toBe('id');
    });

    it('should not have any aria controls by default', () => {
      const driver = createDriver(<Input />);
      expect(driver.getAriaControls()).toBeNull;
    });

    it('should allow adding aria-describeby', () => {
      const driver = createDriver(<Input ariaDescribedby="blabla" />);
      expect(driver.getAriaDescribedby()).toBe('blabla');
    });

    it('should not have any aria-describeby buy default', () => {
      const driver = createDriver(<Input />);
      expect(driver.getAriaDescribedby()).toBeNull;
    });
  });

  describe('className prop', () => {
    it('should set className on root element', () => {
      const className = 'foo';
      const driver = createDriver(<Input className={className} />);
      expect(driver.getRootElementClasses()).toContain(className);
    });

    it('should NOT affect the native input classes when className passed', () => {
      const className = 'foo';
      const driver = createDriver(
        <Input className={className} suffix={<div className="my-button" />} />,
      );
      expect(driver.getInputElementClasses()).not.toContain(className);
      expect(driver.suffixComponentExists('.my-button')).toBeTruthy();
    });
  });
});

describe('testkit exists', () => {
  afterEach(() => cleanup());

  it('should NOT exist', () => {
    const dataHook1 = 'hook1';
    const dataHook2 = 'hook2';
    const value = 'hello';
    const onChange = () => {};

    const { container } = render(
      <Input value={value} onChange={onChange} dataHook={dataHook1} />,
    );

    const driver = inputTestkitFactory({
      wrapper: container,
      dataHook: dataHook2,
    });

    expect(driver.exists()).toBeFalsy();
  });
});

describe('testkit', () => {
  it('should exist', () => {
    const value = 'hello';
    const onChange = () => {};
    expect(
      isTestkitExists(
        <Input value={value} onChange={onChange} />,
        inputTestkitFactory,
      ),
    ).toBe(true);
  });

  it('should NOT exist', () => {
    const value = 'hello';
    const onChange = () => {};
    expect(
      isTestkitExists(
        <Input value={value} onChange={onChange} />,
        inputTestkitFactory,
      ),
    ).toBe(true);
  });
});

describe('enzyme testkit', () => {
  it('should exist', () => {
    const value = 'hello';
    const onChange = () => {};
    expect(
      isEnzymeTestkitExists(
        <Input value={value} onChange={onChange} />,
        enzymeInputTestkitFactory,
        mount,
      ),
    ).toBe(true);
  });
});
