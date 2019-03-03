import {
  description,
  columns,
  importExample as baseImportExample,
  code as liveCodeBase,
} from 'wix-storybook-utils/Sections';
import { sterilizeCode } from './sterilizeCodeForLive';
import { baseScope } from './Components/LiveCodeExample';

const liveCode = config => {
  const { source, autoRender, ...rest } = config;
  const sterilizedSource = sterilizeCode(source);
  const renderCompName = 'Example';
  function injectRender(src) {
    return `${src}\n\nrender(<${renderCompName}/>)`;
  }
  const _source = autoRender
    ? sterilizedSource
    : injectRender(sterilizedSource);

  return liveCodeBase({
    components: baseScope,
    compact: true,
    source: _source,
    autoRender: autoRender,
    ...rest,
  });
};

/**
 * Make a section take half width.
 * @param {function} section any section
 */
export const halfWidth = section =>
  columns({
    items: [section, description({})],
  });

export const importExample = source =>
  baseImportExample({
    title: 'Import',
    source: source,
  });

export const exampleDescription = () =>
  halfWidth(
    description({
      pretitle: '2.1.D',
      title: 'Empty State',
      description: 'Best for initial call to action',
    }),
  );

export const codeExampleFullWidth = ({
  title,
  pretitle,
  description: _description,
  code,
  codeConfig,
}) => {
  return [
    description({
      pretitle: pretitle,
      title: title,
      description: _description,
    }),
    liveCode({
      source: code,
      ...codeConfig,
    }),
  ];
};
