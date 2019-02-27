import publicDriverFactory, { getItemAt } from './Accordion.driver';

export const accordionPrivateDriverFactory = base => ({
  ...publicDriverFactory(base),
  getAmmountOfItems: async () =>
    base.$$('[data-hook="accordion-item"]').count(),
  hoverOnItem: async idx => await getItemAt(idx, base).hover(),
});
