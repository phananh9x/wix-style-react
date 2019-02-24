export default function range(start, end) {
  const itemsAmount = Math.abs(start - end);
  const _range = Array.apply(null, { length: itemsAmount }).map(
    Number.call,
    Number,
  );

  if (start < end) {
    return _range.map(item => item + start);
  }

  return _range.map((_, index) => start - index);
}
