import { resolve } from 'path';

import type { Interface } from '../client/interfaces/Interface';
import type { Indent } from '../Indent';
import { writeFile } from './fileSystem';
import { formatCode as f } from './formatCode';
import { formatIndentation as i } from './formatIndentation';
import type { Templates } from './registerHandlebarTemplates';

/**
 * Generate interfaces using the Handlebar template and write to disk.
 * @param interfaces Array of Interfaces to write
 * @param templates The loaded handlebar templates
 * @param outputPath Directory to write the generated files to
 * @param useUnionTypes Use union types instead of enums
 * @param indent Indentation options (4, 2 or tab)
 * @param postfix Interface name postfix
 */
export const writeClientInterfaces = async (
    interfaces: Interface[],
    templates: Templates,
    outputPath: string,
    useUnionTypes: boolean,
    indent: Indent,
    postfix: string
): Promise<void> => {
    for (const _interface of interfaces) {
        const file = resolve(outputPath, `${_interface.name}${postfix}.ts`);
        const templateResult = templates.exports.interface({
            ..._interface,
            useUnionTypes,
            postfix,
        });
        await writeFile(file, i(f(templateResult), indent));
    }
};
