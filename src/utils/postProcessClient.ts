import type { Client } from '../client/interfaces/Client';
import { postProcessInterface } from './postProcessInterface';
import { postProcessModel } from './postProcessModel';

/**
 * Post process client
 * @param client Client object with all the models, interfaces, etc.
 */
export const postProcessClient = (client: Client): Client => {
    return {
        ...client,
        models: client.models.map(model => postProcessModel(model)),
        interfaces: client.interfaces.map(_interface => postProcessInterface(_interface)),
    };
};
