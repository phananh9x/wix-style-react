import { ReactBase } from '../../test/utils/unidriver/ReactBase';
import eventually from '../../test/utils/eventually';
import { reactUniDriver } from 'unidriver/react';

const arrowDirection = {
  top: 'bottom',
  bottom: 'top',
  left: 'right',
  right: 'left',
};

export const teskitTooltip = (base, body) => {
  const getContentRoot = async () => {
    const contentRootHook = await base.attr('data-content-hook');
    if (!contentRootHook) {
      throw new Error(
        `Tooltip.driver: contentRootHook attribute must exist on the Tooltip's root element`,
      );
    }
    return body.$(`[data-hook="${contentRootHook}"]`);
  };

  const isShown = async () => (await getContentRoot()).exists();

  const getTooltipContent = async () =>
    await (await getContentRoot()).$('.tooltip');

  const getArrowPlacement = async () => {
    const classes = await (await getContentRoot())
      .$('[data-hook="tooltip-arrow"]')
      .attr('class');

    return arrowDirection[classes.split(' ')[2]];
  };

  const getContent = async () => {
    let content = await getTooltipContent();

    while ((await ReactBase(content).children()).length > 0) {
      content = reactUniDriver((await ReactBase(content).children())[0]);
    }
    return ReactBase(content).innerHtml();
  };
  const hoverAndGetContent = async (timeout, interval) => {
    await base.hover(base);
    return eventually(
      async () => {
        if (!(await isShown())) {
          throw new Error('Tooltip not visible');
        }
        const content = await getContent();
        await ReactBase(base).mouseLeave();
        return content;
      },
      {
        timeout,
        interval,
      },
    );
  };

  const getContentStyleValue = async value => {
    const style = await (await getTooltipContent()).attr('style');
    return style.includes(value)
      ? style
          .split(';')
          .find(css => new RegExp(value).test(css))
          .replace(`${value}: `, '')
          .replace(' ', '')
      : undefined;
  };

  return {
    exists: async () => base.exists(),
    click: async () => await base.click(),
    focus: async () => await ReactBase(base).focus(),
    blur: async () => await ReactBase(base).blur(),
    isShown,
    /** @Deprecated WSR drivers should not expose internal elements */
    getTooltipWrapper: async () =>
      await (await getTooltipContent()).getNative(), // eslint-disable-line no-restricted-properties
    mouseEnter: async () => await base.hover(base),
    mouseLeave: async () => await ReactBase(base).mouseLeave(),
    hasErrorTheme: async () => (await getTooltipContent()).hasClass('error'),
    hasDarkTheme: async () => (await getTooltipContent()).hasClass('dark'),
    hasLightTheme: async () => (await getTooltipContent()).hasClass('light'),
    hasAnimationClass: async () =>
      await (await getContentRoot()).$('.fadeIn').exists(),
    getChildren: async () => await ReactBase(base).innerHtml(),
    getContent,
    getPlacement: async () => await getArrowPlacement(),
    getMaxWidth: async () => await getContentStyleValue('max-width'),
    getMinWidth: async () => await getContentStyleValue('min-width'),
    getAlignment: async () => await getContentStyleValue('text-align'),
    getPadding: async () => await getContentStyleValue('padding'),
    hasArrow: async () =>
      await (await getContentRoot()).$('[data-hook="tooltip-arrow"]').exists(),
    hoverAndGetContent: async ({ timeout = 1000, interval = 50 } = {}) =>
      await hoverAndGetContent(timeout, interval),
  };
};
