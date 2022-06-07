import { sort } from './sort';
import type { Model } from '../client/interfaces/Model';

export const getModelNames = (models: Model[]): string[] => {
  return models.map((model) => model.name).sort(sort);
};
