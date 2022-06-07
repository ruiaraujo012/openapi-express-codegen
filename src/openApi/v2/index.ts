import { getInterfaceVersion } from './parser/getInterfaceVersion';
import { getInterfaces } from './parser/getInterfaces';
import { getModels } from './parser/getModels';
import { getServer } from './parser/getServer';
import type { Client } from '../../client/interfaces/Client';
import type { OpenApi } from './interfaces/OpenApi';

/**
 * Parse the OpenAPI specification to a Client model that contains
 * all the models, interface and schema's we should output.
 * @param openApi The OpenAPI spec  that we have loaded from disk.
 */
export const parse = (openApi: OpenApi): Client => {
  const version = getInterfaceVersion(openApi.info.version);
  const server = getServer(openApi);
  const models = getModels(openApi);
  const interfaces = getInterfaces(openApi);

  return { interfaces, models, server, version };
};
