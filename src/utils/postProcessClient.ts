import { postProcessInterface } from './postProcessInterface';
import { postProcessModel } from './postProcessModel';
import type { Client } from '../client/interfaces/Client';

/**
 * Post process client
 * @param client Client object with all the models, interfaces, etc.
 */
export const postProcessClient = (client: Client): Client => {
  return {
    ...client,
    interfaces: client.interfaces.map((_interface) => postProcessInterface(_interface)),
    models: client.models.map((model) => postProcessModel(model)),
  };
};
