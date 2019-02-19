import SegmentedToggle from '.';
import Registry from '@ui-autotools/registry';

const metadata = Registry.getComponentMetadata(SegmentedToggle);

metadata.exportedFrom({
  path: 'src/SegmentedToggle/index.js',
  exportName: 'Image',
  baseStylePath: 'src/components/image/image.st.css',
});
