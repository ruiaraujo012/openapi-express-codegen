import { Indent } from './Indent';
import { parse as parseV2 } from './openApi/v2';
import { parse as parseV3 } from './openApi/v3';
import { getOpenApiSpec } from './utils/getOpenApiSpec';
import { getOpenApiVersion, OpenApiVersion } from './utils/getOpenApiVersion';
import { isString } from './utils/isString';
import { postProcessClient } from './utils/postProcessClient';
import { registerHandlebarTemplates } from './utils/registerHandlebarTemplates';
import { writeClient } from './utils/writeClient';

export { Indent } from './Indent';

export type Options = {
    input: string | Record<string, any>;
    output: string;
    useUnionTypes?: boolean;
    exportInterfaces?: boolean;
    exportModels?: boolean;
    exportSchemas?: boolean;
    indent?: Indent;
    postfix?: string;
    write?: boolean;
};

/**
 * Generate the OpenAPI client. This method will read the OpenAPI specification and based on the
 * given language it will generate the client, including the typed models, validation schemas,
 * interface layer, etc.
 * @param input The relative location of the OpenAPI spec
 * @param output The relative location of the output directory
 * @param useUnionTypes Use union types instead of enums
 * @param exportInterfaces Generate interfaces
 * @param exportModels Generate models
 * @param exportSchemas Generate schemas
 * @param indent Indentation options (4, 2 or tab)
 * @param postfix Interface name postfix
 * @param write Write the files to disk (true or false)
 */
export const generate = async ({
    input,
    output,
    useUnionTypes = false,
    exportInterfaces = true,
    exportModels = true,
    exportSchemas = false,
    indent = Indent.SPACE_4,
    postfix = 'Interface',
    write = true,
}: Options): Promise<void> => {
    const openApi = isString(input) ? await getOpenApiSpec(input) : input;
    const openApiVersion = getOpenApiVersion(openApi);
    const templates = registerHandlebarTemplates({
        useUnionTypes,
    });

    switch (openApiVersion) {
        case OpenApiVersion.V2: {
            const client = parseV2(openApi);
            const clientFinal = postProcessClient(client);
            if (!write) break;
            await writeClient(
                clientFinal,
                templates,
                output,
                useUnionTypes,
                exportInterfaces,
                exportModels,
                exportSchemas,
                indent,
                postfix
            );
            break;
        }

        case OpenApiVersion.V3: {
            const client = parseV3(openApi);
            const clientFinal = postProcessClient(client);
            if (!write) break;
            await writeClient(
                clientFinal,
                templates,
                output,
                useUnionTypes,
                exportInterfaces,
                exportModels,
                exportSchemas,
                indent,
                postfix
            );
            break;
        }
    }
};

export default {
    generate,
};
