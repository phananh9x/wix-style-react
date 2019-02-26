import { getStylableState } from '../../../test/utils/stylable-uni-testkit';
import toggleStyles from './ToggleButton.st.css';

export const toggleButtonPrivateDriverFactory = base => {
  const isSelected = async () =>
    (await getStylableState(base, toggleStyles, 'selected')) === 'true';
  return {
    exists: async () => await base.exists(),
    getToggleText: async () => await base.text(),
    prefixExists: async () => await base.$('[data-hook="prefix"]').exists(),
    childExists: async selector => await base.$(selector).exists(),
    isSelected: async () => await isSelected(),
    click: async () => await base.click(),
    getNative: async () => await base.getNative(),
  };
};
