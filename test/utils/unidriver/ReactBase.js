import { Simulate } from 'react-dom/test-utils';

/**
 *Temporary workaround for implementing missing Unidriver methods in React/DOM only.
 *
 * @param {UniDriver} base
 */
export function ReactBase(base, document) {
  const htmlElement = () => {
    if (base.type !== 'react') {
      throw new Error('Supported only in React/DOM.');
    }
    return base.getNative();
  };

  const pendingUnidriverFixes = {
    attr: async key => {
      if (base.type === 'react') {
        const attr = await base.attr(key);
        return attr ? attr : null;
      } else {
        return base.attr(key);
      }
    },
    enterValue: async value => {
      if (base.type === 'react') {
        const elem = await htmlElement();
        const { name, type } = elem;
        Simulate.change(elem, {
          target: { name, type, value },
        });
      } else {
        return base.enterValue(value);
      }
    },
    /**
     * Workaround Unidriver react adapter's implementation which dispatches a RAL event, that gets nullified by React.
     * Pending fix in unidriver.
     */
    click: async () => {
      if (base.type === 'react') {
        // setting button 0 is now needed in React 16+ as it's not set by react anymore
        // 15 - https://github.com/facebook/react/blob/v15.6.1/src/renderers/dom/client/syntheticEvents/SyntheticMouseEvent.js#L45
        // 16 - https://github.com/facebook/react/blob/master/packages/react-dom/src/events/SyntheticMouseEvent.js#L33

        Simulate.click(await htmlElement(), { button: 0 });
      } else {
        return base.click();
      }
    },
  };

  return {
    ...pendingUnidriverFixes,
    pressKey: async key => Simulate.keyDown(await htmlElement(), { key }),
    mouseLeave: async () => Simulate.mouseLeave(await htmlElement()),
    tagName: async () => (await htmlElement()).tagName,
    tabIndex: async () => (await htmlElement()).tabIndex,
    readOnly: async () => (await htmlElement()).readOnly,
    innerHtml: async () => (await htmlElement()).innerHTML,
    focus: async () => {
      const elm = await htmlElement();
      elm.focus();
      Simulate.focus(elm); // TODO: Is this redundant?
    },
    isFocus: async () => {
      return (
        (await document.getNative()).activeElement === (await htmlElement())
      );
    },
    blur: async () => {
      const elm = await htmlElement();
      elm.blur();
      Simulate.blur(elm); // TODO: Is this redundant?
    },
    keyup: async () => Simulate.keyUp(await htmlElement()),
    keydown: async key => Simulate.keyDown(await htmlElement(), key),
    paste: async () => Simulate.paste(await htmlElement()),
    required: async () => (await htmlElement()).required,
    defaultValue: async () => (await htmlElement()).defaultValue,
    textContent: async () => (await htmlElement()).textContent,
    selectionStart: async () => (await htmlElement()).selectionStart,
    getStyle: async () => (await htmlElement()).style,
    getClassList: async () => (await htmlElement()).classList,
    children: async () => (await htmlElement()).children,
  };
}
