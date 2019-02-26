import { getStylableState } from '../../../test/utils/stylable-uni-testkit';
import toggleStyles from './ToggleIcon.st.css';

export const toggleIconPrivateDriverFactory = base => {
  const element = base.$('[data-hook="toggle-icon"]');
  const isSelected = async () =>
    (await getStylableState(element, toggleStyles, 'selected')) === 'true';
  return {
    exists: async () => await element.exists(),
    childExists: async selector => await element.$(selector).exists(),
    isSelected: async () => await isSelected(),
    click: async () => await element.click(),
  };
};
