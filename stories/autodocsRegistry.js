import reg from '../autodocs-registry/autodocs-registry.json';
import { getCompName } from '@ui-autotools/registry';

export function getParsedSource(comp) {
  const key = getCompName(comp);

  return reg[key];
}
