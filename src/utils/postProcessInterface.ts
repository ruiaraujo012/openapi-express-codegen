import { postProcessInterfaceImports } from './postProcessInterfaceImports';
import { postProcessInterfaceOperations } from './postProcessInterfaceOperations';
import type { Interface } from '../client/interfaces/Interface';

export const postProcessInterface = (_interface: Interface): Interface => {
  const clone = { ..._interface };

  clone.operations = postProcessInterfaceOperations(clone);
  clone.operations.forEach((operation) => {
    clone.imports.push(...operation.imports);
  });
  clone.imports = postProcessInterfaceImports(clone);

  return clone;
};
