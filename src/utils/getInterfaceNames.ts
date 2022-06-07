import { sort } from './sort';
import type { Interface } from '../client/interfaces/Interface';

export const getInterfaceNames = (interfaces: Interface[]): string[] => {
  return interfaces.map((_interface) => _interface.name).sort(sort);
};
