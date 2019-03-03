export function sterilizeCode(code) {
  const filteredLines = code
    .split('\n')
    .filter(
      line =>
        !(
          line.startsWith('import') ||
          line.startsWith('export') ||
          line.includes('eslint-disable')
        ),
    );

  return filteredLines.join('\n');
}
