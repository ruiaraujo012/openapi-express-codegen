import type { Interface } from '../client/interfaces/Interface';
import { sort } from './sort';

export const getInterfaceNames = (interfaces: Interface[]): string[] => {
    return interfaces.map(_interface => _interface.name).sort(sort);
};
