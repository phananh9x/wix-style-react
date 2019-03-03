import React from 'react';
import Text from '.';
import { SIZES, SKINS, WEIGHTS } from './constants';
import {
  createRendererWithDriver,
  createRendererWithUniDriver,
  cleanup,
} from '../../test/utils/react';
import textDriverFactory from './Text.driver';
import { textUniDriverFactory } from './Text.uni.driver';

describe('Text', () => {
  afterEach(() => cleanup());

  describe('[sync]', () => {
    runTests(createRendererWithDriver(textDriverFactory));
  });

  describe('[async]', () => {
    runTests(createRendererWithUniDriver(textUniDriverFactory));
  });

  function runTests(render) {
    describe('size prop', () => {
      it(`should be ${SIZES.medium} by default`, async () => {
        const { driver } = render(<Text>Hello</Text>);
        expect(await driver.getSize()).toBe(SIZES.medium);
      });

      Object.keys(SIZES).forEach(size => {
        it(`should be ${size}`, async () => {
          const { driver } = render(<Text size={size}>Hello</Text>);
          expect(await driver.getSize()).toBe(size);
        });
      });
    });

    describe('weight prop', () => {
      it(`should be ${WEIGHTS.thin} by default`, async () => {
        const { driver } = render(<Text>Hello</Text>);
        expect(await driver.getWeight()).toBe(WEIGHTS.thin);
      });

      Object.keys(WEIGHTS).forEach(weight => {
        it(`should be ${weight}`, async () => {
          const { driver } = render(<Text weight={weight}>Hello</Text>);
          expect(await driver.getWeight()).toBe(weight);
        });
      });
    });

    describe('secondary prop', () => {
      it('should be false by default', async () => {
        const { driver } = render(<Text>Hello</Text>);
        expect(await driver.isSecondary()).toBe(false);
      });

      it(`should be true`, async () => {
        const { driver } = render(<Text secondary>Hello</Text>);
        expect(await driver.isSecondary()).toBe(true);
      });
    });

    describe('skin prop', () => {
      it(`should be ${SKINS.standard} by default`, async () => {
        const { driver } = render(<Text>Hello</Text>);
        expect(await driver.getSkin()).toBe(SKINS.standard);
      });

      Object.keys(SKINS).forEach(skin => {
        it(`should be ${skin}`, async () => {
          const { driver } = render(<Text skin={skin}>Hello</Text>);
          expect(await driver.getSkin()).toBe(skin);
        });
      });
    });

    describe('light prop', () => {
      it('should be dark by default', async () => {
        const { driver } = render(<Text>Hello</Text>);
        expect(await driver.isLight()).toBe(false);
      });

      it('should be light', async () => {
        const { driver } = render(<Text light>Hello</Text>);
        expect(await driver.isLight()).toBe(true);
      });

      [SKINS.error, SKINS.success, SKINS.premium].forEach(skin => {
        it(`should be dark when skin is ${skin}`, async () => {
          const { driver } = render(
            <Text skin={skin} light>
              Hello
            </Text>,
          );
          expect(await driver.isLight()).toBe(false);
        });
      });
    });

    describe('tagName', () => {
      it(`should have default tagName of span`, async () => {
        const { driver } = render(<Text>Hello</Text>);
        expect(await driver.getTagName()).toBe('span');
      });

      it(`should have custom tagName of div`, async () => {
        const { driver } = render(<Text tagName="div">Hello</Text>);
        expect(await driver.getTagName()).toBe('div');
      });
    });

    describe('getText', () => {
      it(`should have the html passed as children`, async () => {
        const { driver } = render(
          <Text>
            Hello<bold>World</bold>
          </Text>,
        );
        expect(await driver.getText()).toEqual(
          expect.stringContaining('Hello'),
        );
        expect(await driver.getText()).toEqual(
          expect.stringContaining('<bold>World</bold>'),
        );
      });
    });
  }
});
