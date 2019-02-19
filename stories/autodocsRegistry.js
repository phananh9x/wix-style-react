import reg from '../autodocs-registry/autodocs-registry.json';

function getKeyFromComp(comp) {
  // TODO: reuse logic from ui-autotools/packages/registry, or have registry include the 'key' in every metadata object.

  // Should return displayName first, as if it's set, it means that it was set explicitly
  // (we get "name" by default)
  return comp.displayName || comp.name || '';
}

export function getParsedSource(comp) {
  const key = getKeyFromComp(comp);

  return reg[key];
}
