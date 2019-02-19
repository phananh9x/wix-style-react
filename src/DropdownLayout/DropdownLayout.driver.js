import ReactTestUtils from 'react-dom/test-utils';
import styles from './DropdownLayout.scss';
import values from '../utils/operators/values';
import { isClassExists } from '../../test/utils';

const dropdownLayoutDriverFactory = ({ element }) => {
  const contentContainer = element.childNodes[0];
  const optionElements = element.querySelector(
    '[data-hook=dropdown-layout-options]',
  );
  const optionElementAt = position => optionElements.childNodes[position];
  const optionsLength = () => optionElements.childNodes.length;
  const doIfOptionExists = (position, onSuccess) => {
    if (optionsLength() <= position) {
      throw new Error(
        `index out of bounds, try to get option ${position} while only ${optionsLength()} options exists`,
      );
    }
    return onSuccess();
  };
  const getOptionDriver = position =>
    doIfOptionExists(position, () =>
      createOptionDriver(optionElementAt(position)),
    );

  return {
    exists: () => !!element,
    isShown: () => isClassExists(contentContainer, 'shown'),
    isDown: () => isClassExists(contentContainer, 'down'),
    isUp: () => isClassExists(contentContainer, 'up'),
    hasTheme: theme => isClassExists(element, `theme-${theme}`),
    tabIndex: () => element.tabIndex,
    optionsLength: () => optionsLength(),
    optionsScrollTop: () => optionElements.scrollTop,
    mouseEnterAtOption: position =>
      doIfOptionExists(position, () =>
        ReactTestUtils.Simulate.mouseEnter(optionElementAt(position)),
      ),
    mouseLeaveAtOption: position =>
      doIfOptionExists(position, () =>
        ReactTestUtils.Simulate.mouseLeave(optionElementAt(position)),
      ),
    mouseClickOutside: () =>
      document.body.dispatchEvent(new Event('mouseup', { cancelable: true })),
    isOptionExists: optionText =>
      [].filter.call(
        optionElements.childNodes,
        opt => opt.textContent === optionText,
      ).length > 0,
    /** returns if an option is hovered. notice that it checks by index and __not__ by id */
    isOptionHovered: position =>
      doIfOptionExists(position, () =>
        isClassExists(optionElementAt(position), 'hovered'),
      ),
    isOptionSelected: position =>
      doIfOptionExists(position, () =>
        isClassExists(optionElementAt(position), 'selected'),
      ),
    isOptionHoveredWithGlobalClassName: position =>
      doIfOptionExists(position, () =>
        isClassExists(optionElementAt(position), 'wixstylereactHovered'),
      ),
    isOptionSelectedWithGlobalClassName: position =>
      doIfOptionExists(position, () =>
        isClassExists(optionElementAt(position), 'wixstylereactSelected'),
      ),
    isOptionHeightSmall: position =>
      doIfOptionExists(position, () =>
        isClassExists(optionElementAt(position), 'smallHeight'),
      ),
    isOptionHeightBig: position =>
      doIfOptionExists(position, () =>
        isClassExists(optionElementAt(position), 'bigHeight'),
      ),
    isLinkOption: position =>
      optionElementAt(position).tagName.toLowerCase() === 'a',
    classes: () => optionElements.className,
    pressDownKey: () =>
      ReactTestUtils.Simulate.keyDown(element, { key: 'ArrowDown' }),
    pressUpKey: () =>
      ReactTestUtils.Simulate.keyDown(element, { key: 'ArrowUp' }),
    pressEnterKey: () =>
      ReactTestUtils.Simulate.keyDown(element, { key: 'Enter' }),
    pressSpaceKey: () => ReactTestUtils.Simulate.keyDown(element, { key: ' ' }),
    pressTabKey: () => ReactTestUtils.Simulate.keyDown(element, { key: 'Tab' }),
    pressEscKey: () =>
      ReactTestUtils.Simulate.keyDown(element, { key: 'Escape' }),
    optionContentAt: position =>
      doIfOptionExists(position, () => optionElementAt(position).textContent),
    /** @deprecated Use optionDriver*/
    optionAt: optionElementAt,
    /** Get option driver given an option index */
    optionDriver: createOptionDriver,
    /** Get an array of all options including dividers (drivers) */
    options: () => {
      const drivers = [];
      for (let position = 0; position < optionsLength(); position++) {
        drivers.push(getOptionDriver(position));
      }
      return drivers;
    },
    optionsContent: () =>
      values(optionElements.childNodes).map(option => option.textContent),
    clickAtOption: position =>
      doIfOptionExists(position, () =>
        ReactTestUtils.Simulate.mouseDown(optionElementAt(position)),
      ),
    clickAtOptionWithValue: value => {
      const option = values(optionElements.childNodes).find(
        _option => _option.innerHTML === value,
      );
      option && ReactTestUtils.Simulate.mouseDown(option);
    },
    isOptionADivider: position =>
      doIfOptionExists(position, () =>
        isClassExists(optionElementAt(position), 'divider'),
      ),
    mouseEnter: () => ReactTestUtils.Simulate.mouseEnter(element),
    mouseLeave: () => ReactTestUtils.Simulate.mouseLeave(element),
    hasTopArrow: () => !!element.querySelector(`.${styles.arrow}`),
    optionById(optionId) {
      return this.optionByHook(`dropdown-item-${optionId}`);
    },
    /** @deprecated This should be a private method since the hook include internal parts ('dropdown-divider-{id}, dropdown-item-{id})') */
    optionByHook: hook => {
      const option = optionElements.querySelector(`[data-hook=${hook}]`);
      if (!option) {
        throw new Error(`an option with data-hook ${hook} was not found`);
      }
      return createOptionDriver(option);
    },
  };
};

const createOptionDriver = option => ({
  element: () => option,
  mouseEnter: () => ReactTestUtils.Simulate.mouseEnter(option),
  mouseLeave: () => ReactTestUtils.Simulate.mouseLeave(option),
  isHovered: () => isClassExists(option, 'hovered'),
  isSelected: () => isClassExists(option, 'selected'),
  isHoveredWithGlobalClassName: () =>
    isClassExists(option, 'wixstylereactHovered'),
  isSelectedWithGlobalClassName: () =>
    isClassExists(option, 'wixstylereactSelected'),
  content: () => option.textContent,
  click: () => ReactTestUtils.Simulate.mouseDown(option),
  isDivider: () => isClassExists(option, 'divider'),
  isDisabled: () => isClassExists(option, 'disabled'),
});

export default dropdownLayoutDriverFactory;
