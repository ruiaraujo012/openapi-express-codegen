#!/usr/bin/env node
/* eslint-disable no-process-exit */

'use strict';

const path = require('path');
const { program } = require('commander');
const pkg = require('../package.json');

const params = program
  .name('express-gen')
  .usage('[options]')
  .version(pkg.version)
  .requiredOption('-i, --input <value>', 'OpenAPI specification, can be a path, url or string content (required)')
  .requiredOption('-o, --output <value>', 'Output directory (required)')
  .option('--useUnionTypes', 'Use union types instead of enums')
  .option('--exportInterfaces <value>', 'Write interfaces to disk', true)
  .option('--exportModels <value>', 'Write models to disk', true)
  .option('--exportSchemas <value>', 'Write schemas to disk', false)
  .option('--indent <value>', 'Indentation options [4, 2, tabs]', '4')
  .option('--postfix <value>', 'Generated name postfix', 'Generated')
  .parse(process.argv)
  .opts();

const OpenAPI = require(path.resolve(__dirname, '../build/index.js'));

if (OpenAPI) {
  OpenAPI.generate({
    exportInterfaces: JSON.parse(params.exportInterfaces) === true,
    exportModels: JSON.parse(params.exportModels) === true,
    exportSchemas: JSON.parse(params.exportSchemas) === true,
    indent: params.indent,
    input: params.input,
    output: params.output,
    postfix: params.postfix,
    useUnionTypes: params.useUnionTypes,
  })
    .then(() => {
      process.exit(0);
    })
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
}
