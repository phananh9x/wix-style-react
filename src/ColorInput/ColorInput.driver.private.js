import { colorInputDriverFactory as publicDriverFactory } from './ColorInput.driver';
import { getStylableState } from '../../test/utils/stylable-uni-testkit';
import hashStyles from './components/Hash.st.css';
import viewerStyles from './components/ColorViewer.st.css';

export const colorInputPrivateDriverFactory = base => {
  const isHashDisabled = async () =>
    (await getStylableState(
      base.$('[data-hook="colorinput-hash"]'),
      hashStyles,
      'disabled',
    )) === 'true';

  const getViewerSize = async () =>
    await getStylableState(
      base.$('[data-hook="colorinput-viewer"]'),
      viewerStyles,
      'size',
    );
  return {
    ...publicDriverFactory(base),
    isHashDisabled,
    isViewerNull: async () =>
      await base.$('[data-hook="colorinput-viewer-line"]').exists(),
    getViewerSize,
  };
};
