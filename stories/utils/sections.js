import {
  description,
  columns,
  importExample as baseImportExample,
} from 'wix-storybook-utils/Sections';

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
