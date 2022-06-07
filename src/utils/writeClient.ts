/* eslint-disable max-params */
import { resolve } from 'path';

import { isSubDirectory } from './isSubdirectory';
import { mkdir, rmdir } from './fileSystem';
import { writeClientIndex } from './writeClientIndex';
import { writeClientInterfaces } from './writeClientInterfaces';
import { writeClientModels } from './writeClientModels';
import { writeClientSchemas } from './writeClientSchemas';
import type { Client } from '../client/interfaces/Client';
import type { Indent } from '../Indent';
import type { Templates } from './registerHandlebarTemplates';

/**
 * Write our OpenAPI client, using the given templates at the given output
 * @param client Client object with all the models, interfaces, etc.
 * @param templates Templates wrapper with all loaded Handlebars templates
 * @param output The relative location of the output directory
 * @param useUnionTypes Use union types instead of enums
 * @param exportInterfaces Generate interfaces
 * @param exportModels Generate models
 * @param exportSchemas Generate schemas
 * @param exportSchemas Generate schemas
 * @param indent Indentation options (4, 2 or tab)
 * @param postfix Interface name postfix
 */
export const writeClient = async (
  client: Client,
  templates: Templates,
  output: string,
  useUnionTypes: boolean,
  exportInterfaces: boolean,
  exportModels: boolean,
  exportSchemas: boolean,
  indent: Indent,
  postfix: string,
): Promise<void> => {
  const outputPath = resolve(process.cwd(), output);
  const outputPathModels = resolve(outputPath, 'models');
  const outputPathSchemas = resolve(outputPath, 'schemas');
  const outputPathInterfaces = resolve(outputPath, 'interfaces');

  if (!isSubDirectory(process.cwd(), output)) {
    throw new Error(`Output folder is not a subdirectory of the current working directory`);
  }

  if (exportInterfaces) {
    await rmdir(outputPathInterfaces);
    await mkdir(outputPathInterfaces);
    await writeClientInterfaces(client.interfaces, templates, outputPathInterfaces, useUnionTypes, indent, postfix);
  }

  if (exportSchemas) {
    await rmdir(outputPathSchemas);
    await mkdir(outputPathSchemas);
    await writeClientSchemas(client.models, templates, outputPathSchemas, useUnionTypes, indent);
  }

  if (exportModels) {
    await rmdir(outputPathModels);
    await mkdir(outputPathModels);
    await writeClientModels(client.models, templates, outputPathModels, useUnionTypes, indent);
  }

  if (exportInterfaces || exportSchemas || exportModels) {
    await mkdir(outputPath);
    await writeClientIndex(
      client,
      templates,
      outputPath,
      useUnionTypes,
      exportInterfaces,
      exportModels,
      exportSchemas,
      postfix,
    );
  }
};
