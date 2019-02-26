import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import multiSelectDriverFactory from './MultiSelect.driver';
import MultiSelect from './MultiSelect';
import { multiSelectTestkitFactory } from '../../testkit';
import { multiSelectTestkitFactory as enzymeMultiSelectTestkitFactory } from '../../testkit/enzyme';
import { mount } from 'enzyme';
import { createRendererWithDriver, cleanup } from '../../test/utils/unit';

describe('MultiSelect', () => {
  const render = createRendererWithDriver(multiSelectDriverFactory);
  const createDriver = jsx => render(jsx).driver;
  const expectEventTargetValue = value =>
    expect.objectContaining({
      target: expect.objectContaining({ value }),
    });

  const options = [
    { value: 'Alabama', id: 'Alabama' },
    { value: 'Alaska', id: 'Alaska' },
    { value: 'Arkansas', id: 'Arkansas' },
    { value: 'Arkansas', id: 'Arkansas' },
    { value: 'California', id: 'California' },
    { value: 'Two words', id: 'Two words' },
  ];
  const FIRST_OPTION = options[0];
  const FIRST_OPTION_ID = options[0].id;

  afterEach(() => {
    cleanup();
  });

  class ControlledMultiSelect extends React.Component {
    state = { inputValue: this.props.value || '' };

    componentWillReceiveProps(nextProps) {
      this.setState({ inputValue: nextProps.value });
    }

    render() {
      return (
        <MultiSelect
          {...this.props}
          onChange={e => {
            this.setState({ inputValue: e.target.value });
          }}
          value={this.state.inputValue}
        />
      );
    }
  }

  it('should NOT show dropdown when autofocus is on', () => {
    const { inputDriver, dropdownLayoutDriver } = createDriver(
      <MultiSelect options={options} autoFocus />,
    );
    expect(inputDriver.isFocus()).toBeTruthy();
    expect(dropdownLayoutDriver.isShown()).toBeFalsy();
  });

  it('should remove options that were selected and became tags', () => {
    const tags = [{ id: 'Alabama', label: 'Alabama' }];

    const { driver: multiSelectDriver, rerender } = render(
      <MultiSelect options={options} autoFocus />,
    );
    const { dropdownLayoutDriver } = multiSelectDriver;
    expect(dropdownLayoutDriver.optionsLength()).toBe(options.length);
    expect(dropdownLayoutDriver.isOptionExists('Alabama')).toBeTruthy();

    rerender(<MultiSelect options={options} tags={tags} autoFocus />);
    expect(dropdownLayoutDriver.optionsLength()).toBe(
      options.length - tags.length,
    );
    expect(dropdownLayoutDriver.isOptionExists('Alabama')).toBeFalsy();
  });

  it('should not filter anything without predicate function', () => {
    const onSelect = jest.fn();
    const { driver, dropdownLayoutDriver } = createDriver(
      <MultiSelect options={options} onSelect={onSelect} />,
    );
    driver.focus();
    expect(dropdownLayoutDriver.optionsLength()).toBe(options.length);
  });

  describe('click-outside', () => {
    it('should clear input when clicked-out-side given input is non-empty', () => {
      const onChange = jest.fn();
      const { driver, inputDriver } = createDriver(
        <MultiSelect value={''} onChange={onChange} />,
      );
      inputDriver.focus('ArrowDown');
      inputDriver.enterText('foo');
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toBeCalledWith(expectEventTargetValue('foo'));
      onChange.mockReset();

      driver.outsideClick();
      expect(onChange).toHaveBeenCalledTimes(1);
      expect(onChange).toBeCalledWith(expectEventTargetValue(''));
    });

    it('should NOT select option when clicked-out-side given option is marked', () => {
      const onSelect = jest.fn();

      const { driver, dropdownLayoutDriver } = createDriver(
        <ControlledMultiSelect options={options} onSelect={onSelect} />,
      );
      driver.pressKey('ArrowDown');
      driver.pressKey('ArrowDown');
      expect(dropdownLayoutDriver.isOptionHovered(0)).toBeTruthy();
      driver.outsideClick();
      expect(onSelect).toHaveBeenCalledTimes(0);
    });
  });

  describe('Tag Input', () => {
    it('should render readonly input on select mode', () => {
      const { inputDriver } = createDriver(
        <MultiSelect options={options} mode="select" />,
      );
      expect(inputDriver.getReadOnly()).toBeTruthy();
    });

    it('should render arrow on select mode', () => {
      const { inputDriver } = createDriver(
        <MultiSelect options={options} mode="select" />,
      );
      expect(inputDriver.hasMenuArrow()).toBeTruthy();
    });

    it('should render input wrapper with error', () => {
      const { driver } = createDriver(<MultiSelect error options={options} />);
      expect(driver.inputWrapperHasError()).toBeTruthy();
    });

    describe('Placeholder', () => {
      it('should display a placeholder if there are no tags', () => {
        const placeholder = 'myPlaceholder';
        const { inputDriver } = createDriver(
          <MultiSelect options={options} placeholder={placeholder} />,
        );
        expect(inputDriver.getPlaceholder()).toBe(placeholder);
      });

      it('should not display a placeholder if there are any tags', () => {
        const tags = [{ id: 'Alabama', label: 'Alabama' }];
        const placeholder = 'myPlaceholder';
        const { inputDriver } = createDriver(
          <MultiSelect
            options={options}
            tags={tags}
            placeholder={placeholder}
          />,
        );
        expect(inputDriver.getPlaceholder()).toBe('');
      });
    });

    it('should focus the input when clicking on the input wrapper', () => {
      const { driver, inputDriver } = createDriver(
        <MultiSelect options={options} />,
      );
      expect(inputDriver.isFocus()).toBeFalsy();
      driver.clickOnInputWrapper();
      expect(inputDriver.isFocus()).toBeTruthy();
    });

    it('should check that wrapper has focus when the input element does', () => {
      const { driver, inputDriver } = createDriver(
        <MultiSelect options={options} />,
      );
      driver.clickOnInputWrapper();
      expect(inputDriver.isFocus()).toBeTruthy();
      expect(driver.inputWrapperHasFocus()).toBeTruthy();
    });

    it('should contain specific tags', () => {
      const tags = [
        { id: 'Alabama', label: 'Alabama' },
        { id: 'Alaska', label: 'Alaska' },
      ];

      const { driver } = createDriver(
        <MultiSelect options={options} tags={tags} />,
      );
      expect(driver.numberOfTags()).toBe(tags.length);
      expect(driver.getTagLabelAt(0)).toBe('Alabama');
      expect(driver.getTagLabelAt(1)).toBe('Alaska');
    });

    describe('Submit (Add Tag)', () => {
      describe('input is empty', () => {
        it('should NOT submit when Enter is pressed', () => {
          const onManuallyInput = jest.fn();
          const { driver } = createDriver(
            <ControlledMultiSelect
              options={options}
              onManuallyInput={onManuallyInput}
            />,
          );

          driver.focus();
          driver.pressKey('Enter');

          expect(onManuallyInput).toHaveBeenCalledTimes(0);
        });
      });

      describe('input is not empty', () => {
        function testCase({
          props,
          keyPressed,
          enteredText,
          Component = MultiSelect,
          expectSubmit,
        }) {
          const onSelect = jest.fn();
          const onManuallyInput = jest.fn();
          const { driver, inputDriver } = createDriver(
            <Component
              onManuallyInput={onManuallyInput}
              onSelect={onSelect}
              {...props}
            />,
          );

          driver.focus();
          inputDriver.enterText(enteredText);
          driver.pressKey(keyPressed);

          expect(onSelect).toHaveBeenCalledTimes(0);
          expect(onManuallyInput).toHaveBeenCalledTimes(expectSubmit ? 1 : 0);
          expectSubmit && expect(onManuallyInput).toBeCalledWith([enteredText]);
        }

        describe('Controlled', () => {
          it('should submit when text entered and Enter is pressed', () => {
            testCase({
              Component: ControlledMultiSelect,
              props: { options },
              enteredText: 'custom value',
              keyPressed: 'Enter',
              expectSubmit: true,
            });
          });

          it('should submit when Enter pressed given initial value', () => {
            const onSelect = jest.fn();
            const onManuallyInput = jest.fn();
            const { driver } = createDriver(
              <ControlledMultiSelect
                onManuallyInput={onManuallyInput}
                onSelect={onSelect}
                value="foo"
              />,
            );

            driver.focus();
            driver.pressKey('Enter');

            expect(onSelect).toHaveBeenCalledTimes(0);
            expect(onManuallyInput).toHaveBeenCalledTimes(1);
            expect(onManuallyInput).toBeCalledWith(['foo']);
          });

          it('should submit when Enter pressed given value updated', () => {
            const onSelect = jest.fn();
            const onManuallyInput = jest.fn();
            const { driver: _driver, rerender } = render(
              <ControlledMultiSelect
                onManuallyInput={onManuallyInput}
                onSelect={onSelect}
                value="foo"
              />,
            );
            const { driver } = _driver;
            rerender(
              <ControlledMultiSelect
                onManuallyInput={onManuallyInput}
                onSelect={onSelect}
                value="foo2"
              />,
            );
            driver.focus();
            driver.pressKey('Enter');

            expect(onSelect).toHaveBeenCalledTimes(0);
            expect(onManuallyInput).toHaveBeenCalledTimes(1);
            expect(onManuallyInput).toBeCalledWith(['foo2']);
          });
        });

        describe('Uncontrolled', () => {
          it('should submit when text entered and Enter is pressed', () => {
            testCase({
              props: { options },
              enteredText: 'custom value',
              keyPressed: 'Enter',
              expectSubmit: true,
            });
          });

          it('should submit when text entered and delimiter is pressed', () => {
            testCase({
              props: { options },
              enteredText: 'custom value',
              keyPressed: ',',
              expectSubmit: true,
            });
          });

          it('should NOT submit when spaces-only text is entered and Enter pressed', () => {
            testCase({
              props: { options },
              enteredText: '   ',
              keyPressed: 'Enter',
              expectSubmit: false,
            });
          });

          it('should NOT submit when delimited-spaces text is entered and Enter pressed', () => {
            testCase({
              props: { options },
              enteredText: ' ,  ',
              keyPressed: 'Enter',
              expectSubmit: false,
            });
          });
        });
      });
    });

    describe('Paste', () => {
      function testCase({ props, pasteValue, expectedonManuallyInputArg }) {
        const onSelect = jest.fn();
        const onManuallyInput = jest.fn();
        const { driver, inputDriver } = createDriver(
          <MultiSelect
            options={options}
            onSelect={onSelect}
            onManuallyInput={onManuallyInput}
            {...props}
          />,
        );
        driver.focus();
        inputDriver.trigger('paste');
        inputDriver.enterText(pasteValue);

        expect(onSelect).toHaveBeenCalledTimes(0);
        expect(onManuallyInput).toHaveBeenCalledTimes(1);
        expect(onManuallyInput).toBeCalledWith(expectedonManuallyInputArg);
      }

      it('should submit with single value when pasting a single custom value', () => {
        testCase({
          pasteValue: 'custom value',
          expectedonManuallyInputArg: ['custom value'],
        });
      });

      it('should submit with multiple values with pasting comma-delimited value (default delimiter)', () => {
        testCase({
          pasteValue: 'value1,value2',
          expectedonManuallyInputArg: ['value1', 'value2'],
        });
      });

      it('should submit with multiple values with pasting colon-delimited value (custom delimiter)', () => {
        testCase({
          props: { delimiters: [':'] },
          pasteValue: 'value1:value2',
          expectedonManuallyInputArg: ['value1', 'value2'],
        });
      });

      it('should submit with multiple values with pasting mixed delimited value (custom delimiters)', () => {
        testCase({
          props: { delimiters: [':', ';'] },
          pasteValue: 'value1:value2;value3',
          expectedonManuallyInputArg: ['value1', 'value2', 'value3'],
        });
      });

      it('should submit with trimmed values', () => {
        testCase({
          pasteValue: ' value1 , value2 ',
          expectedonManuallyInputArg: ['value1', 'value2'],
        });
      });
    });

    it('should call onRemoveTag when removing a tag', () => {
      const tagId = 'SweetHome';
      const tags = [{ id: tagId, label: 'Alabama' }];
      const onRemoveTag = jest.fn();
      const { driver } = createDriver(
        <MultiSelect autoFocus tags={tags} onRemoveTag={onRemoveTag} />,
      );

      const tagDriver = driver.getTagDriverByTagId(tagId);
      tagDriver.removeTag();

      expect(onRemoveTag).toHaveBeenCalledWith(tagId);
    });
  });

  describe('Select Option', () => {
    it('should call onSelect when option clicked', () => {
      const onSelect = jest.fn();

      const { driver } = createDriver(
        <MultiSelect options={options} onSelect={onSelect} />,
      );
      driver.selectOptionById(FIRST_OPTION_ID);

      expect(onSelect).toHaveBeenCalledTimes(1);
    });

    it('should call onSelect with selected option given highlight enabled', () => {
      // This is a regression test for old bug , when highlight enabled the value would be a <Highlight> element
      const onSelect = jest.fn();
      const { driver } = createDriver(
        <MultiSelect options={options} onSelect={onSelect} />,
      );
      driver.selectOptionById(FIRST_OPTION_ID);

      expect(onSelect).toHaveBeenCalledTimes(1);
      expect(onSelect).toBeCalledWith(FIRST_OPTION);
    });

    it('should call onSelect with selected option given highlight disabled', () => {
      const onSelect = jest.fn();
      const { driver } = createDriver(
        <MultiSelect options={options} onSelect={onSelect} highlight={false} />,
      );
      driver.selectOptionById(FIRST_OPTION_ID);
      expect(onSelect).toHaveBeenCalledTimes(1);
      expect(onSelect).toBeCalledWith(FIRST_OPTION);
    });

    it('should call onSelect with selected option when selected by keyboard', () => {
      const onSelect = jest.fn();

      const { driver } = createDriver(
        <MultiSelect options={options} onSelect={onSelect} />,
      );
      driver.pressKey('ArrowDown');
      driver.pressKey('ArrowDown');
      driver.pressKey('Enter');

      expect(onSelect).toHaveBeenCalledTimes(1);
      expect(onSelect).toBeCalledWith(options[0]);
    });

    // TODO: Disabled since in order to support this in new API, we better add ability for Dropdownlayout to accept custom "select" keys.
    // We can also consider removing this feature (Ben?)
    /* eslint-disable-next-line jest/no-disabled-tests */
    xdescribe('Select with delimiter', () => {
      it('should select option when comma press', () => {
        const onSelect = jest.fn();
        const onChange = jest.fn();
        const { driver, inputDriver, dropdownLayoutDriver } = createDriver(
          <MultiSelect
            value={options[0].value}
            options={options}
            delimiters={[',']}
            onSelect={onSelect}
            onChange={onChange}
          />,
        );
        driver.pressKey('ArrowDown');
        inputDriver.trigger('keyDown', { key: ',' });
        expect(onSelect).toHaveBeenCalledTimes(1);
        expect(onChange).toBeCalledWith({ target: { value: '' } });
        expect(dropdownLayoutDriver.isShown()).toBeTruthy();
        expect(inputDriver.isFocus()).toBeTruthy();
      });

      it('should select option when custom delimiters pressed', () => {
        const onSelect = jest.fn();
        const onChange = jest.fn();
        const { driver, inputDriver, dropdownLayoutDriver } = createDriver(
          <MultiSelect
            value={options[0].value}
            options={options}
            delimiters={[';']}
            onSelect={onSelect}
            onChange={onChange}
          />,
        );
        driver.pressKey('ArrowDown');
        inputDriver.trigger('keyDown', { key: ';' });
        expect(onSelect).toHaveBeenCalledTimes(1);
        expect(onSelect).toBeCalledWith(options[0]);
        expect(onChange).toBeCalledWith({ target: { value: '' } });
        expect(dropdownLayoutDriver.isShown()).toBeTruthy();
        expect(inputDriver.isFocus()).toBeTruthy();
      });
    });

    describe('Keep Options Open', () => {
      it('should not lose Focus or close the options when options selected by mouse click', () => {
        const { driver, inputDriver, dropdownLayoutDriver } = createDriver(
          <MultiSelect options={options} />,
        );
        driver.selectOptionById(FIRST_OPTION_ID);
        expect(dropdownLayoutDriver.isShown()).toBeTruthy();
        expect(inputDriver.isFocus());
      });

      it('should not lose Focus or close the options when options selected by pressing Enter', () => {
        const { driver, inputDriver, dropdownLayoutDriver } = createDriver(
          <MultiSelect options={options} />,
        );
        driver.focus();
        driver.pressKey('ArrowDown');
        driver.pressKey('Enter');
        expect(dropdownLayoutDriver.isShown()).toBeTruthy();
        expect(inputDriver.isFocus()).toBeTruthy();
      });

      it('should not lose Focus or close the options when options selected by pressing Tab', () => {
        const onSelect = jest.fn();
        const { driver, inputDriver, dropdownLayoutDriver } = createDriver(
          <MultiSelect options={options} onSelect={onSelect} />,
        );
        driver.pressKey('ArrowDown');
        driver.pressKey('ArrowDown');
        driver.pressKey('Tab');
        expect(onSelect).toHaveBeenCalledTimes(1);
        expect(dropdownLayoutDriver.isShown()).toBeTruthy();
        expect(inputDriver.isFocus()).toBeTruthy();
      });
    });
  });

  describe('onKeyDown', () => {
    it('should call onKeyDown once when character key pressed', () => {
      const onKeyDown = jest.fn();
      const { driver, inputDriver } = createDriver(
        <MultiSelect options={options} onKeyDown={onKeyDown} />,
      );

      driver.focus();
      inputDriver.keyDown('a');
      expect(onKeyDown.mock.calls).toHaveLength(1);
    });
  });

  describe('maxHeight', () => {
    it('should set maxHeight to initial when no height limit introduced', () => {
      const { driver } = createDriver(<MultiSelect options={options} />);

      expect(driver.getMaxHeight()).toBe('initial');
    });

    it('should set maxHeight when maxNumRows defined', () => {
      const { driver } = createDriver(
        <MultiSelect maxNumRows={2} options={options} />,
      );

      expect(driver.getMaxHeight()).toBe('70px');
    });

    it('should set maxHeight when maxNumRows defined (large tags)', () => {
      const _options = [
        { value: 'Alaska', id: 'Alaska', label: 'Alaska', size: 'large' },
      ];

      const { driver } = createDriver(
        <MultiSelect maxNumRows={2} tags={_options} options={_options} />,
      );

      expect(driver.getMaxHeight()).toBe('94px');
    });
  });

  // TODO: dnd testkit is missing - once it's available, this test has to be completed and run
  // eslint-disable-next-line jest/no-disabled-tests
  xdescribe('Drag & Drop', () => {
    it('should allow reordering the tags', () => {
      const tags = [
        { label: 'Alabama', id: 'Alabama' },
        { label: 'California2', id: 'California2' },
        { label: 'California3', id: 'California3' },
        { label: 'California4', id: 'California4' },
      ];
      const onReorder = jest.fn();
      const {
        driver: { getTagLabelAt, getTagDriverByTagId },
      } = createDriver(
        <MultiSelect
          draggable
          options={options}
          tags={tags}
          onReorder={onReorder}
          autoFocus
        />,
      );
      getTagDriverByTagId('Alabama').dragTo(
        getTagDriverByTagId('California3').element,
      );
      expect(onReorder).toBeCalledWith({ removedIndex: 0, addedIndex: 2 });

      expect(getTagLabelAt(0)).toBe('California3');
      expect(getTagLabelAt(2)).toBe('Alabama');
    });
  });

  describe('testkit', () => {
    it('should exist', () => {
      const div = document.createElement('div');
      const dataHook = 'myDataHook';
      const tags = [{ id: 'Alabama', label: 'Alabama' }];
      const wrapper = div.appendChild(
        ReactTestUtils.renderIntoDocument(
          <div>
            <MultiSelect dataHook={dataHook} tags={tags} />
          </div>,
        ),
      );
      const multiSelectTestkit = multiSelectTestkitFactory({
        wrapper,
        dataHook,
      });
      expect(multiSelectTestkit.driver.exists()).toBeTruthy();
      expect(multiSelectTestkit.inputDriver.exists()).toBeTruthy();
      expect(multiSelectTestkit.dropdownLayoutDriver.exists()).toBeTruthy();
      expect(
        multiSelectTestkit.driver.getTagDriverByTagId('Alabama').exists(),
      ).toBeTruthy();
    });
  });

  describe('enzyme testkit', () => {
    it('should exist', () => {
      const dataHook = 'myDataHook';
      const tags = [{ id: 'Alabama', label: 'Alabama' }];
      const wrapper = mount(<MultiSelect dataHook={dataHook} tags={tags} />);
      const multiSelectTestkit = enzymeMultiSelectTestkitFactory({
        wrapper,
        dataHook,
      });
      expect(multiSelectTestkit.driver.exists()).toBeTruthy();
      expect(multiSelectTestkit.inputDriver.exists()).toBeTruthy();
      expect(multiSelectTestkit.dropdownLayoutDriver.exists()).toBeTruthy();
      expect(
        multiSelectTestkit.driver.getTagDriverByTagId('Alabama').exists(),
      ).toBeTruthy();
    });
  });
});
