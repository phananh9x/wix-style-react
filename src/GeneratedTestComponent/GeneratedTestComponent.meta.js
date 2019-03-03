import GeneratedTestComponent from './GeneratedTestComponent';
import Registry from '@ui-autotools/registry';

const metadata = Registry.getComponentMetadata(GeneratedTestComponent);

metadata.exportedFrom({
  path: 'src/GeneratedTestComponent/GeneratedTestComponent.js',
});
