/* eslint-disable max-params */
import { getInterfaceName } from './getInterfaceName';
import { getOperationErrors } from './getOperationErrors';
import { getOperationName } from './getOperationName';
import { getOperationParameters } from './getOperationParameters';
import { getOperationResponseHeader } from './getOperationResponseHeader';
import { getOperationResponses } from './getOperationResponses';
import { getOperationResults } from './getOperationResults';
import { sortByRequired } from './sortByRequired';
import type { OpenApi } from '../interfaces/OpenApi';
import type { OpenApiOperation } from '../interfaces/OpenApiOperation';
import type { Operation } from '../../../client/interfaces/Operation';
import type { OperationParameters } from '../../../client/interfaces/OperationParameters';

export const getOperation = (
  openApi: OpenApi,
  url: string,
  method: string,
  tag: string,
  op: OpenApiOperation,
  pathParams: OperationParameters,
): Operation => {
  const interfaceName = getInterfaceName(tag);
  const operationName = getOperationName(url, method, op.operationId);

  // Create a new operation object for this method.
  const operation: Operation = {
    deprecated: op.deprecated === true,
    description: op.description || null,
    errors: [],
    imports: [],
    interface: interfaceName,
    method: method.toUpperCase(),
    name: operationName,
    parameters: [...pathParams.parameters],
    parametersBody: pathParams.parametersBody,
    parametersCookie: [...pathParams.parametersCookie],
    parametersForm: [...pathParams.parametersForm],
    parametersHeader: [...pathParams.parametersHeader],
    parametersPath: [...pathParams.parametersPath],
    parametersQuery: [...pathParams.parametersQuery],
    path: url,
    responseHeader: null,
    results: [],
    summary: op.summary || null,
  };

  // Parse the operation parameters (path, query, body, etc).
  if (op.parameters) {
    const parameters = getOperationParameters(openApi, op.parameters);

    operation.imports.push(...parameters.imports);
    operation.parameters.push(...parameters.parameters);
    operation.parametersPath.push(...parameters.parametersPath);
    operation.parametersQuery.push(...parameters.parametersQuery);
    operation.parametersForm.push(...parameters.parametersForm);
    operation.parametersHeader.push(...parameters.parametersHeader);
    operation.parametersCookie.push(...parameters.parametersCookie);
    operation.parametersBody = parameters.parametersBody;
  }

  // Parse the operation responses.
  if (op.responses) {
    const operationResponses = getOperationResponses(openApi, op.responses);
    const operationResults = getOperationResults(operationResponses);

    operation.errors = getOperationErrors(operationResponses);
    operation.responseHeader = getOperationResponseHeader(operationResults);

    operationResults.forEach((operationResult) => {
      operation.results.push(operationResult);
      operation.imports.push(...operationResult.imports);
    });
  }

  operation.parameters = operation.parameters.sort(sortByRequired);

  return operation;
};
