import { storySettings } from './storySettings';

const countries = [
  { name: 'Alabama', code: 'AL' },
  { name: 'Alaska', code: 'AK' },
  { name: 'Arizona', code: 'AZ' },
  { name: 'Arkansas', code: 'AR' },
  { name: 'California', code: 'CA' },
  { name: 'North Carolina', code: 'NC' },
  { name: 'Colorado', code: 'CO' },
  { name: 'Connecticut', code: 'CT' },
  { name: 'Delaware', code: 'DL' },
  { name: 'Florida', code: 'FL' },
  { name: 'Georgia', code: 'GA' },
  { name: 'Hawaii', code: 'HI' },
  { name: 'Idaho', code: 'IL' },
  { name: 'Illinois', code: 'IN' },
  { name: 'Indiana', code: 'IA' },
];

export const options = countries.map(country => ({
  ...country,
  value: country.name, // This can be any ReactNode
  id: country.code,
}));

let nextTagId = 1;

function createTag({ countryName, countryCode }) {
  return {
    id: countryCode || String(nextTagId++), // When tag ids correspond to option ids, then MultiSelect will show only unselected options.
    label: `${countryName} (${countryCode || '?'})`,
  };
}

export default {
  componentProps: (setState, getState) => ({
    dataHook: storySettings.dataHook,
    value: '',
    tags: [],
    options,

    predicate: option => {
      return option.name.toLowerCase().includes(getState().value.toLowerCase());
    },

    onChange: e => setState({ value: e.target.value }),

    onSelect: option => {
      setState({
        tags: [
          ...getState().tags,
          createTag({ countryName: option.name, countryCode: option.code }),
        ],
      });
    },
    onManuallyInput: values => {
      const tags = values.map(value =>
        createTag({
          countryName: value,
        }),
      );
      const currentTags = getState().tags;
      const newTags = currentTags.concat(tags);
      // FIXME: This doesn't seem to work )-:
      setState({ tags: newTags });
    },
    onRemoveTag: tagId =>
      setState({
        tags: getState().tags.filter(currTag => currTag.id !== tagId),
      }),
    upgrade: true,
  }),
};
