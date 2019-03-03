import React from 'react';
import eventually from '../../test/utils/eventually';
import {
  createRendererWithDriver,
  createRendererWithUniDriver,
  cleanup,
} from '../../test/utils/react';
import Tooltip from './Tooltip';
import { buttonTestkitFactory } from '../../testkit';
import Button from '../Button';

import tooltipDriverFactory from './Tooltip.driver';
import { teskitTooltip } from './Tooltip.uni.driver';

describe('Tooltip', () => {
  describe('[sync]', () => {
    runTests(createRendererWithDriver(tooltipDriverFactory));
  });

  describe('[async]', () => {
    runTests(createRendererWithUniDriver(teskitTooltip));
  });

  function runTests(render) {
    afterEach(() => cleanup());
    const children = <div>Here there is a children</div>;
    const _props = {
      showDelay: 5,
      hideDelay: 5,
      content: "I'm the content",
    };

    it('should be hidden by default', async () => {
      const { driver } = render(<Tooltip {..._props}>{children}</Tooltip>);
      expect(await driver.isShown()).toBe(false);
    });

    it('should show a tooltip once hovering', async () => {
      const { driver } = render(<Tooltip {..._props}>{children}</Tooltip>);

      expect(await driver.isShown()).toBe(false);

      await driver.mouseEnter();

      await eventually(async () => {
        expect(await driver.isShown()).toBe(true);
      });
    });

    it('should hide when mouse leaving', async () => {
      const { driver } = render(
        <Tooltip dataHook="tooltip" {..._props}>
          {children}
        </Tooltip>,
      );

      await driver.mouseEnter();

      await eventually(async () => {
        expect(await driver.isShown()).toBe(true);
      });

      await driver.mouseLeave();

      await eventually(async () => {
        expect(await driver.isShown()).toBe(false);
      });
    });

    it('should test inner component', async () => {
      const dataHook = 'button_data_hook';
      const buttonContent = (
        <Button dataHook={dataHook} size="small">
          Button content
        </Button>
      );
      const { driver } = render(
        <Tooltip showDelay={5} hideDelay={5} content={buttonContent}>
          {children}
        </Tooltip>,
      );

      expect(await driver.isShown()).toBe(false);

      await driver.mouseEnter();

      await eventually(async () => {
        expect(await driver.isShown()).toBe(true);
      });

      const buttonTestkit = buttonTestkitFactory({
        wrapper: await driver.getTooltipWrapper(),
        dataHook,
      });

      expect(await buttonTestkit.getButtonTextContent()).toBe('Button content');
    });

    it('should not override focus event', async () => {
      const onFocus = jest.fn();
      const onFocusedChild = (
        <div onFocus={onFocus}>Here there is a children</div>
      );
      const { driver } = render(
        <Tooltip {..._props}>{onFocusedChild}</Tooltip>,
      );
      await driver.focus();
      expect(onFocus).toBeCalled();
    });

    it('should not override blur event', async () => {
      const onBlur = jest.fn();
      const onBluredChild = <div onBlur={onBlur}>Here there is a children</div>;
      const { driver } = render(<Tooltip {..._props}>{onBluredChild}</Tooltip>);
      await driver.blur();
      expect(onBlur).toHaveBeenCalled();
    });

    it('should not override click event', async () => {
      const onClick = jest.fn();
      const onClickedChild = (
        <div onClick={onClick}>Here there is a children</div>
      );
      const { driver } = render(
        <Tooltip {..._props}>{onClickedChild}</Tooltip>,
      );
      await driver.click();
      expect(onClick).toHaveBeenCalled();
    });

    it('should not override mouse enter event', async () => {
      const onMouseEnter = jest.fn();
      const onMouseEnteredChild = (
        <div onMouseEnter={onMouseEnter}>Here there is a children</div>
      );
      const { driver } = render(
        <Tooltip {..._props}>{onMouseEnteredChild}</Tooltip>,
      );
      await driver.mouseEnter();
      expect(onMouseEnter).toHaveBeenCalled();
    });

    it('should not override mouse leave event', async () => {
      const onMouseLeave = jest.fn();
      const onMouseLeavedChild = (
        <div onMouseLeave={onMouseLeave}>Here there is a children</div>
      );
      const { driver } = render(
        <Tooltip {..._props}>{onMouseLeavedChild}</Tooltip>,
      );
      await driver.mouseLeave();
      expect(onMouseLeave).toHaveBeenCalled();
    });

    describe('`theme` prop', () => {
      ['Error', 'Dark', 'Light'].map(theme => {
        it(`should apply ${theme} theme`, async () => {
          const { driver } = render(
            <Tooltip theme={theme.toLowerCase()} {..._props}>
              {children}
            </Tooltip>,
          );
          await driver.mouseEnter();
          await eventually(async () => {
            expect(await driver[`has${theme}Theme`]()).toBe(true);
          });
        });
      });
    });

    it('should have a children', async () => {
      const { driver } = render(<Tooltip {..._props}>{children}</Tooltip>);
      expect(await driver.getChildren()).toBe('Here there is a children');
    });

    it('should have a content', async () => {
      const { driver } = render(<Tooltip {..._props}>{children}</Tooltip>);
      await eventually(async () => {
        expect(await driver.hoverAndGetContent()).toBe("I'm the content");
      });
    });

    it('should cancel mouse leave, when followed by mouse enter immediately', async () => {
      const { driver } = render(<Tooltip {..._props}>{children}</Tooltip>);
      await driver.mouseEnter();
      await driver.mouseLeave();
      await driver.mouseEnter();
      await eventually(async () => {
        expect(await driver.isShown()).toBe(true);
      });
    });

    it('should call onShow when tooltip is shown', async () => {
      const onShow = jest.fn();
      const { driver } = render(
        <Tooltip {...{ ..._props, onShow }}>{children}</Tooltip>,
      );

      await driver.mouseEnter();

      expect(onShow).not.toHaveBeenCalled();

      await eventually(async () => {
        expect(onShow).toHaveBeenCalled();
        expect(await driver.isShown()).toBe(true);
      });
    });

    it('should call onHide when tooltip is hidden', async () => {
      const onHide = jest.fn();

      const { driver } = render(
        <Tooltip {...{ ..._props, onHide }}>{children}</Tooltip>,
      );

      await driver.mouseEnter();

      await eventually(async () => {
        expect(await driver.isShown()).toBe(true);
      });

      await driver.mouseLeave();

      await eventually(async () => {
        expect(await driver.isShown()).toBe(false);
        expect(onHide).toHaveBeenCalled();
      });
    });

    it('should append to element selected', async () => {
      const el = document.createElement('div');

      const { driver } = render(
        <Tooltip {..._props} appendTo={el}>
          {children}
        </Tooltip>,
      );

      await driver.mouseEnter();

      await eventually(async () => {
        expect(el.childElementCount).toEqual(1);
      });
    });

    describe('custom triggers', () => {
      it('should hide tooltip', async () => {
        const props = {
          ..._props,
          hideTrigger: 'custom',
          showTrigger: 'custom',
          children,
        };
        const { driver, rerender } = render(<Tooltip {...props} />);

        await driver.mouseEnter();

        await eventually(async () =>
          expect(await driver.isShown()).toBe(false),
        );

        rerender(<Tooltip {...props} active />);

        await eventually(async () => expect(await driver.isShown()).toBe(true));

        rerender(<Tooltip {...props} active={false} />);

        await eventually(async () =>
          expect(await driver.isShown()).toBe(false),
        );
      });

      it('should not show tooltip when transitioned to both active and disabled', async () => {
        const props = {
          ..._props,
          hideTrigger: 'custom',
          showTrigger: 'custom',
          active: false,
          disabled: false,
          children,
        };
        const { driver, rerender } = render(<Tooltip {...props} />);

        expect(await driver.isShown()).toBe(false);

        rerender(<Tooltip {...props} active disabled />);

        expect(await driver.isShown()).toBe(false);
      });

      it('should close tooltip when disabled changed to true when was active true before', async () => {
        const props = {
          ..._props,
          hideTrigger: 'custom',
          showTrigger: 'custom',
          active: true,
          disabled: false,
          children,
        };
        const { driver, rerender } = render(<Tooltip {...props} />);

        await eventually(async () => expect(await driver.isShown()).toBe(true));

        rerender(<Tooltip {...props} disabled />);

        await eventually(async () =>
          expect(await driver.isShown()).toBe(false),
        );
      });
    });

    describe('placement attribute', () => {
      ['top', 'bottom', 'left', 'right'].map(place => {
        it(`should set ${place}`, async () => {
          const { driver } = render(
            <Tooltip {..._props} placement={place}>
              {children}
            </Tooltip>,
          );
          await driver.mouseEnter();
          await eventually(async () => {
            expect(await driver.getPlacement()).toBe(place);
          });
        });
      });
    });

    describe('maxWidth attribute', () => {
      it('should set default maxWidth 204', async () => {
        const { driver } = render(<Tooltip {..._props}>{children}</Tooltip>);
        await driver.mouseEnter();
        await eventually(async () => {
          expect(await driver.getMaxWidth()).toBe('204px');
        });
      });

      it('should set custom maxWidth', async () => {
        const props = { ..._props, maxWidth: '400px' };
        const { driver } = render(<Tooltip {...props}>{children}</Tooltip>);
        await driver.mouseEnter();
        await eventually(async () => {
          expect(await driver.getMaxWidth()).toBe('400px');
        });
      });
    });

    describe('minWidth attribute', () => {
      it('should not have any min-width as default', async () => {
        const { driver } = render(<Tooltip {..._props}>{children}</Tooltip>);

        await driver.mouseEnter();

        await eventually(async () => {
          expect(await driver.getMinWidth()).toBe(undefined);
        });
      });

      it('should set custom min-width', async () => {
        const props = { ..._props, minWidth: '150px' };
        const { driver } = render(<Tooltip {...props}>{children}</Tooltip>);

        await driver.mouseEnter();

        await eventually(async () => {
          expect(await driver.getMinWidth()).toBe('150px');
        });
      });
    });

    describe('alignment attribute', () => {
      it('should set default left', async () => {
        const { driver } = render(<Tooltip {..._props}>{children}</Tooltip>);

        await driver.mouseEnter();

        await eventually(async () => {
          expect(await driver.getAlignment()).toBe('left');
        });
      });
    });

    describe('padding attribute', () => {
      it('should set default to none', async () => {
        const { driver } = render(<Tooltip {..._props}>{children}</Tooltip>);

        await driver.mouseEnter();

        await eventually(async () => {
          expect(await driver.getPadding()).toBe(undefined);
        });
      });
      it('should set custom padding', async () => {
        const props = { ..._props, padding: '5px' };
        const { driver } = render(<Tooltip {...props}>{children}</Tooltip>);
        await driver.mouseEnter();
        await eventually(async () => {
          expect(await driver.getPadding()).toBe('5px');
        });
      });
    });

    describe('showArrow prop', () => {
      const props = {
        ..._props,
        content: 'This is the content',
      };

      it('should have an arrow by default', async () => {
        const { driver } = render(<Tooltip {...props}>{children}</Tooltip>);
        await driver.mouseEnter();
        await eventually(async () => {
          expect(await driver.hasArrow()).toBe(true);
        });
      });

      it('should not show an arrow if `showArrow` is set to false', async () => {
        const { driver } = render(
          <Tooltip {...props} showArrow={false}>
            {children}
          </Tooltip>,
        );
        await driver.mouseEnter();
        await eventually(async () => {
          expect(await driver.hasArrow()).toBe(false);
        });
      });
    });

    describe('popover', () => {
      it('should show a tooltip on click', async () => {
        const { driver } = render(
          <Tooltip popover {..._props}>
            {children}
          </Tooltip>,
        );
        await driver.click();
        await eventually(async () => {
          expect(await driver.isShown()).toBe(true);
        });
      });

      it('should hide a tooltip on click', async () => {
        const { driver } = render(
          <Tooltip popover {..._props}>
            {children}
          </Tooltip>,
        );

        await driver.click();

        await eventually(async () => {
          expect(await driver.isShown()).toBe(true);
        });

        await driver.click();
        await eventually(async () => {
          expect(await driver.isShown()).toBe(false);
        });
      });
    });

    it('should exist with default props when appendToParent', async () => {
      const { driver } = render(
        <Tooltip {..._props} appendToParent>
          {children}
        </Tooltip>,
      );

      await driver.mouseEnter();

      await eventually(async () => {
        expect(await driver.isShown()).toBe(true);
        expect(await driver.getContent()).toBe("I'm the content");
        expect(await driver.hasLightTheme()).toBe(true);
        expect(await driver.getPlacement()).toBe('top');
      });
    });

    describe('theme', () => {
      it('should have dark theme when appendToParent', async () => {
        const { driver } = render(
          <Tooltip {..._props} appendToParent theme="dark">
            {children}
          </Tooltip>,
        );
        await driver.mouseEnter();
        await eventually(async () => {
          expect(await driver.hasDarkTheme()).toBe(true);
        });
      });

      it('should have error theme when appendToParent', async () => {
        const { driver } = render(
          <Tooltip {..._props} appendToParent theme="error">
            {children}
          </Tooltip>,
        );
        await driver.mouseEnter();
        await eventually(async () => {
          expect(await driver.hasErrorTheme()).toBe(true);
        });
      });
    });

    describe('contentHook', () => {
      const defaultProps = {
        showDelay: 5,
        hideDelay: 5,
        content: "I'm the content",
        children,
      };

      it('isShown should work when child is a Custom Component', async () => {
        const { driver } = render(
          <Tooltip
            showDelay={5}
            dataHook="my-tooltip"
            content="I'm the content"
          >
            <Button />
          </Tooltip>,
        );
        await driver.mouseEnter();

        await eventually(async () => {
          expect(await driver.isShown()).toBe(true);
        });
      });

      it('isShown should differentiate between different tooltips given dataHooks provided', async () => {
        const { driver: firstTooltipDriver } = render(
          <Tooltip {...defaultProps} dataHook="firstTooltip" />,
        );
        const { driver: secondTooltipDriver } = render(
          <Tooltip {...defaultProps} dataHook="secondTooltip" />,
        );

        await firstTooltipDriver.mouseEnter();

        await eventually(async () => {
          expect(await firstTooltipDriver.isShown()).toBe(true);
          expect(await secondTooltipDriver.isShown()).toBe(false);
        });
      });

      it('isShown should differentiate between different tooltips given dataHooks NOT provided', async () => {
        const { driver: firstTooltipDriver } = render(
          <Tooltip {...defaultProps} />,
        );
        const { driver: secondTooltipDriver } = render(
          <Tooltip {...defaultProps} />,
        );

        await firstTooltipDriver.mouseEnter();

        await eventually(async () => {
          expect(await firstTooltipDriver.isShown()).toBe(true);
          expect(await secondTooltipDriver.isShown()).toBe(false);
        });
      });

      it('should keep contentHook when re-rendered', async () => {
        const { container, rerender } = render(<Tooltip {...defaultProps} />);
        const contentHook1 = container
          .querySelector(`[data-content-hook]`)
          .getAttribute('data-content-hook');

        rerender(<Tooltip {...defaultProps} showDelay={6} />);

        const contentHook2 = container
          .querySelector(`[data-content-hook]`)
          .getAttribute('data-content-hook');

        expect(contentHook1).toBe(contentHook2);
      });

      it('should update contentHook when dataHook changes', async () => {
        const { container, rerender, driver } = render(
          <Tooltip {...defaultProps} dataHook="firstDataHook" />,
        );

        await driver.mouseEnter();
        await eventually(async () => expect(await driver.isShown()).toBe(true));

        const contentHook1 = container
          .querySelector(`[data-content-hook]`)
          .getAttribute('data-content-hook');
        expect(contentHook1).toContain('firstDataHook');

        expect(
          !!document.body.querySelector(`[data-hook="${contentHook1}"]`),
        ).toBe(true);

        await driver.mouseLeave();

        await eventually(async () =>
          expect(await driver.isShown()).toBe(false),
        );

        rerender(<Tooltip {...defaultProps} dataHook="secondDataHook" />);

        await driver.mouseEnter();

        await eventually(async () => expect(await driver.isShown()).toBe(true));

        const contentHook2 = container
          .querySelector(`[data-content-hook]`)
          .getAttribute('data-content-hook');
        expect(contentHook2).toContain('secondDataHook');

        expect(
          !!document.body.querySelector(`[data-hook="${contentHook2}"]`),
        ).toBe(true);
      });

      it('should differentiate between different tooltips for all related driver methods', async () => {
        const { driver: firstDriver } = render(
          <Tooltip
            {...defaultProps}
            theme="error"
            showTrigger="click"
            placement="top"
          />,
        );
        const { driver: secondDriver } = render(
          <Tooltip
            {...defaultProps}
            theme="dark"
            showTrigger="click"
            placement="bottom"
          />,
        );

        const { driver: thirdDriver } = render(
          <Tooltip
            {...defaultProps}
            theme="light"
            showTrigger="click"
            showImmediately
            showArrow={false}
          />,
        );

        await firstDriver.click();
        await secondDriver.click();
        await thirdDriver.click();

        await eventually(async () => {
          expect(await await firstDriver.isShown()).toBe(true);
          expect(await await secondDriver.isShown()).toBe(true);
          expect(await await thirdDriver.isShown()).toBe(true);
        });

        expect(await firstDriver.hasErrorTheme()).toBe(true);
        expect(await firstDriver.hasDarkTheme()).toBe(false);
        expect(await firstDriver.hasLightTheme()).toBe(false);
        expect(await firstDriver.hasAnimationClass()).toBe(true);
        expect(await firstDriver.hasArrow()).toBe(true);
        expect(await firstDriver.getPlacement()).toBe('top');

        expect(await secondDriver.hasErrorTheme()).toBe(false);
        expect(await secondDriver.hasDarkTheme()).toBe(true);
        expect(await secondDriver.hasLightTheme()).toBe(false);
        expect(await secondDriver.getPlacement()).toBe('bottom');

        expect(await thirdDriver.hasErrorTheme()).toBe(false);
        expect(await thirdDriver.hasDarkTheme()).toBe(false);
        expect(await thirdDriver.hasLightTheme()).toBe(true);
        expect(await thirdDriver.hasAnimationClass()).toBe(false);
        expect(await thirdDriver.hasArrow()).toBe(false);
      });
    });

    describe('rerender tests', () => {
      it('should remove a tooltip immediately once the component is destroyed', async () => {
        const { driver } = render(
          <Tooltip {..._props} hideDelay={1000}>
            {children}
          </Tooltip>,
        );
        await driver.mouseEnter();
        await eventually(async () => expect(await driver.isShown()).toBe(true));
        cleanup();
        expect(await driver.isShown()).toBe(false);
      });
    });

    describe('fadeIn class tests', () => {
      it('should have fadeIn class and delay when showImmediately is unspecified', async () => {
        const { driver } = render(
          <Tooltip {..._props} content={<div>HELLO WORLD</div>}>
            {children}
          </Tooltip>,
        );
        await driver.mouseEnter();
        await eventually(async () => {
          expect(await driver.hasAnimationClass()).toBe(true);
        });
      });

      it('should have fadeIn class and delay when showImmediately is false', async () => {
        const { driver } = render(
          <Tooltip
            {..._props}
            content={<div>HELLO WORLD</div>}
            showImmediately={false}
          >
            {children}
          </Tooltip>,
        );
        driver.mouseEnter();
        await eventually(async () => {
          expect(await driver.hasAnimationClass()).toBe(true);
        });
      });

      it('should not have fadeIn class and no delay when showImmediately is true', async () => {
        const { driver } = render(
          <Tooltip {..._props} content={<div>HELLO WORLD</div>} showImmediately>
            {children}
          </Tooltip>,
        );
        await driver.mouseEnter();
        expect(await driver.hasAnimationClass()).toBe(false);
      });
    });
  }
});
