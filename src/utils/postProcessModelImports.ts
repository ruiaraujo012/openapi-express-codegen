import { sort } from './sort';
import { unique } from './unique';
import type { Model } from '../client/interfaces/Model';

/**
 * Set unique imports, sorted by name
 * @param model The model that is post-processed
 */
export const postProcessModelImports = (model: Model): string[] => {
  return model.imports
    .filter(unique)
    .sort(sort)
    .filter((name) => model.name !== name);
};
