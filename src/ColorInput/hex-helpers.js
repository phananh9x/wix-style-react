const contains = (...array) => number => array.includes(number);

const hexRules = [
  {
    when: contains(0),
    make: () => '',
  },
  {
    when: contains(1),
    make: hex => '#' + hex[0].repeat(6),
  },
  {
    when: contains(2),
    make: hex => '#' + (hex[0] + hex[1]).repeat(3),
  },
  {
    when: contains(3, 4, 5),
    make: hex => '#' + hex[0].repeat(2) + hex[1].repeat(2) + hex[2].repeat(2),
  },
  {
    when: length => contains(6)(length) || length > 6,
    make: hex => '#' + hex.slice(0, 6),
  },
];

export const validateHex = hex => {
  if (hex === '' || !hex) {
    return hex;
  }
  const hexArray = hex.replace('#', '');
  const hexLength = hexArray.length;

  return hexRules.find(({ when }) => when(hexLength)).make(hexArray);
};

export const extractHex = hex =>
  `#${hex.toUpperCase().replace(/[^A-F0-9]/g, '')}`;
