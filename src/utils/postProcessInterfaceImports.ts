import type { Interface } from '../client/interfaces/Interface';
import { sort } from './sort';
import { unique } from './unique';

/**
 * Set unique imports, sorted by name
 * @param interfaces
 */
export const postProcessInterfaceImports = (_interface: Interface): string[] => {
    return _interface.imports.filter(unique).sort(sort);
};
