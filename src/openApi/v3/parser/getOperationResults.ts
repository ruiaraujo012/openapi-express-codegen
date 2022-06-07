/* eslint-disable id-length */
import type { Model } from '../../../client/interfaces/Model';
import type { OperationResponse } from '../../../client/interfaces/OperationResponse';

const areEqual = (a: Model, b: Model): boolean => {
  const equal = a.type === b.type && a.base === b.base && a.template === b.template;

  if (equal && a.link && b.link) {
    return areEqual(a.link, b.link);
  }

  return equal;
};

export const getOperationResults = (operationResponses: OperationResponse[]): OperationResponse[] => {
  const operationResults: OperationResponse[] = [];

  // Filter out success response codes, but skip "204 No Content"
  operationResponses.forEach((operationResponse) => {
    const { code } = operationResponse;

    if (code && code !== 204 && code >= 200 && code < 300) {
      operationResults.push(operationResponse);
    }
  });

  if (!operationResults.length) {
    operationResults.push({
      base: 'void',
      code: 200,
      description: '',
      enum: [],
      enums: [],
      export: 'generic',
      imports: [],
      in: 'response',
      isDefinition: false,
      isNullable: false,
      isReadOnly: false,
      isRequired: false,
      link: null,
      name: '',
      properties: [],
      template: null,
      type: 'void',
    });
  }

  return operationResults.filter((operationResult, index, arr) => {
    return (
      arr.findIndex((item) => {
        return areEqual(item, operationResult);
      }) === index
    );
  });
};
