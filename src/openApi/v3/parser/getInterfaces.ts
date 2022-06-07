import type { Interface } from '../../../client/interfaces/Interface';
import { unique } from '../../../utils/unique';
import type { OpenApi } from '../interfaces/OpenApi';
import { getOperation } from './getOperation';
import { getOperationParameters } from './getOperationParameters';

/**
 * Get the OpenAPI interfaces
 */
export const getInterfaces = (openApi: OpenApi): Interface[] => {
    const interfaces = new Map<string, Interface>();
    for (const url in openApi.paths) {
        if (openApi.paths.hasOwnProperty(url)) {
            // Grab path and parse any global path parameters
            const path = openApi.paths[url];
            const pathParams = getOperationParameters(openApi, path.parameters || []);

            // Parse all the methods for this path
            for (const method in path) {
                if (path.hasOwnProperty(method)) {
                    switch (method) {
                        case 'get':
                        case 'put':
                        case 'post':
                        case 'delete':
                        case 'options':
                        case 'head':
                        case 'patch':
                            // Each method contains an OpenAPI operation, we parse the operation
                            const op = path[method]!;
                            const tags = op.tags?.length ? op.tags.filter(unique) : ['Default'];
                            tags.forEach(tag => {
                                const operation = getOperation(openApi, url, method, tag, op, pathParams);

                                // If we have already declared a service, then we should fetch that and
                                // append the new method to it. Otherwise we should create a new service object.
                                const service: Interface = interfaces.get(operation.interface) || {
                                    name: operation.interface,
                                    operations: [],
                                    imports: [],
                                };

                                // Push the operation in the service
                                service.operations.push(operation);
                                service.imports.push(...operation.imports);
                                interfaces.set(operation.interface, service);
                            });
                            break;
                    }
                }
            }
        }
    }
    return Array.from(interfaces.values());
};
