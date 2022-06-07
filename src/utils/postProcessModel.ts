import { postProcessModelEnum } from './postProcessModelEnum';
import { postProcessModelEnums } from './postProcessModelEnums';
import { postProcessModelImports } from './postProcessModelImports';
import type { Model } from '../client/interfaces/Model';

/**
 * Post processes the model.
 * This will clean up any double imports or enum values.
 * @param model
 */
export const postProcessModel = (model: Model): Model => {
  return {
    ...model,
    enum: postProcessModelEnum(model),
    enums: postProcessModelEnums(model),
    imports: postProcessModelImports(model),
  };
};
