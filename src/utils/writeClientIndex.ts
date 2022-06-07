/* eslint-disable max-params */
import { resolve } from 'path';

import { Templates } from './registerHandlebarTemplates';
import { sortInterfacesByName } from './sortInterfacesByName';
import { sortModelsByName } from './sortModelsByName';
import { writeFile } from './fileSystem';
import type { Client } from '../client/interfaces/Client';

/**
 * Generate the OpenAPI client index file using the Handlebar template and write it to disk.
 * The index file just contains all the exports you need to use the client as a standalone
 * library. But yuo can also import individual models and interfaces directly.
 * @param client Client object, containing, models, schemas and interfaces
 * @param templates The loaded handlebar templates
 * @param outputPath Directory to write the generated files to
 * @param useUnionTypes Use union types instead of enums
 * @param exportInterfaces Generate interfaces
 * @param exportModels Generate models
 * @param exportSchemas Generate schemas
 * @param postfix Interface name postfix
 */
export const writeClientIndex = async (
  client: Client,
  templates: Templates,
  outputPath: string,
  useUnionTypes: boolean,
  exportInterfaces: boolean,
  exportModels: boolean,
  exportSchemas: boolean,
  postfix: string,
): Promise<void> => {
  const templateResult = templates.index({
    exportInterfaces,
    exportModels,
    exportSchemas,
    interfaces: sortInterfacesByName(client.interfaces),
    models: sortModelsByName(client.models),
    postfix,
    server: client.server,
    useUnionTypes,
    version: client.version,
  });

  await writeFile(resolve(outputPath, 'index.ts'), templateResult);
};
