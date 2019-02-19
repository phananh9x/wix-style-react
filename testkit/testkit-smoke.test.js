import React from 'react';
import { mount } from 'enzyme';
import { render, cleanup } from 'react-testing-library';

import {
  isEnzymeTestkitExists,
  isUniEnzymeTestkitExists,
} from 'wix-ui-test-utils/enzyme';
import { isTestkitExists, isUniTestkitExists } from 'wix-ui-test-utils/vanilla';

import AllComponents from './all-components';

import COMPONENT_DEFINITIONS from './component-definitions.js';
import TESTKIT_DEFINITIONS from './testkit-definitions';

import * as reactTestUtilsTestkitFactories from './index';
import * as enzymeTestkitFactories from './enzyme';

const noop = () => {};
const lowerFirst = a =>
  a
    .charAt(0)
    .toLowerCase()
    .concat(a.slice(1));

const attachHooks = (beforeAllHook, afterAllHook) => {
  beforeAll(async () => await beforeAllHook());
  afterAll(async () => await afterAllHook());
};

const DATA_HOOK_PROP_NAME = 'dataHook';

const DRIVER_ASSERTS = {
  enzyme: ({ name, component, props, beforeAllHook, afterAllHook }) => {
    describe('Enzyme testkits', () => {
      attachHooks(beforeAllHook, afterAllHook);

      it(`${name} should pass sanity test`, () =>
        expect(
          isEnzymeTestkitExists(
            React.createElement(component, props),
            enzymeTestkitFactories[`${lowerFirst(name)}TestkitFactory`],
            mount,
            { dataHookPropName: DATA_HOOK_PROP_NAME },
          ),
        ).toBe(true));
    });
  },

  vanilla: ({ name, component, props, beforeAllHook, afterAllHook }) => {
    describe('ReactTestUtils testkits', () => {
      attachHooks(beforeAllHook, afterAllHook);
      it(`${name} should pass sanity test`, () =>
        expect(
          isTestkitExists(
            React.createElement(component, props),
            reactTestUtilsTestkitFactories[`${lowerFirst(name)}TestkitFactory`],
            { dataHookPropName: DATA_HOOK_PROP_NAME },
          ),
        ).toBe(true));
    });
    describe('ReactTestUtils update dataHook', () => {
      attachHooks(beforeAllHook, afterAllHook);
      /* eslint-disable jest/no-disabled-tests */
      xit(`${name} should have an updated dataHook`, () => {
        /* eslint-enable jest/no-disabled-tests */
        const hook1 = 'my-data-hook-1';
        const hook2 = 'my-data-hook-2';
        const { rerender, container } = render(
          React.createElement(component, { ...props, dataHook: hook1 }),
        );
        expect(
          !!container.querySelector(`[data-hook="${hook1}"]`),
        ).toBeTruthy();

        rerender(React.createElement(component, { ...props, dataHook: hook2 }));
        expect(
          !!container.querySelector(`[data-hook="${hook2}"]`),
        ).toBeTruthy();
        cleanup();
      });
    });
  },
};

const UNIDRIVER_ASSERTS = {
  enzyme: ({ name, component, props, beforeAllHook, afterAllHook }) => {
    describe('Enzyme unidriver testkits', () => {
      attachHooks(beforeAllHook, afterAllHook);
      it(`${name} should pass sanity test`, () =>
        expect(
          isUniEnzymeTestkitExists(
            React.createElement(component, props),
            enzymeTestkitFactories[`${lowerFirst(name)}TestkitFactory`],
            mount,
            { dataHookPropName: DATA_HOOK_PROP_NAME },
          ),
        ).resolves.toBe(true));
    });
  },

  vanilla: ({ name, component, props, beforeAllHook, afterAllHook }) => {
    describe('ReactTestUtils unidriver testkits', () => {
      attachHooks(beforeAllHook, afterAllHook);
      it(`${name} should pass sanity test`, () =>
        expect(
          isUniTestkitExists(
            React.createElement(component, props),
            reactTestUtilsTestkitFactories[`${lowerFirst(name)}TestkitFactory`],
            { dataHookPropName: DATA_HOOK_PROP_NAME },
          ),
        ).resolves.toBe(true));
    });
  },
};

const EXPORT_ASSERTS = {
  enzyme: name => {
    describe('Enzyme testkit exports', () => {
      it(`should contain ${name}`, () =>
        expect(
          typeof enzymeTestkitFactories[`${lowerFirst(name)}TestkitFactory`],
        ).toBe('function'));
    });
  },

  vanilla: name => {
    describe('ReactTestUtils testkit exports', () => {
      it(`should contain ${name}`, () =>
        expect(
          typeof reactTestUtilsTestkitFactories[
            `${lowerFirst(name)}TestkitFactory`
          ],
        ).toBe('function'));
    });
  },
};

Object.keys({
  ...AllComponents,
  ...COMPONENT_DEFINITIONS,
  ...TESTKIT_DEFINITIONS,
}).forEach(name => {
  const definition = TESTKIT_DEFINITIONS[name] || {};

  const config = {
    beforeAllHook: noop,
    afterAllHook: noop,
    props: COMPONENT_DEFINITIONS[name] ? COMPONENT_DEFINITIONS[name].props : {},
    ...definition,
    name,
    component: AllComponents[name],
  };

  if (!definition.skipSanityTest) {
    const sanityAsserts = definition.unidriver
      ? UNIDRIVER_ASSERTS
      : DRIVER_ASSERTS;

    if (definition.drivers) {
      definition.drivers.forEach(driver => sanityAsserts[driver](config));
    } else {
      Object.keys(sanityAsserts).forEach(driver =>
        sanityAsserts[driver](config),
      );
    }
  }

  if (!definition.noTestkit) {
    EXPORT_ASSERTS.vanilla(name);
    EXPORT_ASSERTS.enzyme(name);
  }
});
