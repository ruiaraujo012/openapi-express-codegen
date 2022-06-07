/* eslint-disable no-process-env */
import { dirname, extname, resolve } from 'path';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { precompile } from 'handlebars';
import { readFileSync } from 'fs';
import { terser } from 'rollup-plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

/**
 * Custom plugin to parse handlebar imports and precompile
 * the template on the fly. This reduces runtime by about
 * half on large projects.
 */
const handlebarsPlugin = () => ({
  load: (file) => {
    if (extname(file) === '.hbs') {
      const template = readFileSync(file, 'utf8').toString().trim();
      const templateSpec = precompile(template, {
        knownHelpers: {
          camelCase: true,
          containsSpaces: true,
          enumerator: true,
          equals: true,
          escapeComment: true,
          escapeDescription: true,
          ifdef: true,
          intersection: true,
          notEquals: true,
          union: true,
        },
        knownHelpersOnly: true,
        noEscape: true,
        preventIndent: true,
        strict: true,
      });

      return `export default ${templateSpec};`;
    }

    return null;
  },
  resolveId: (file, importer) => {
    if (extname(file) === '.hbs') {
      return resolve(dirname(importer), file);
    }

    return null;
  },
});

const getPlugins = () => {
  const plugins = [
    nodeResolve(),
    commonjs({
      sourceMap: false,
    }),
    handlebarsPlugin(),
    typescript({
      module: 'esnext',
    }),
  ];

  if (process.env.NODE_ENV === 'development') {
    return plugins;
  }

  return [...plugins, terser()];
};

export default {
  external: ['camelcase', 'commander', 'fs-extra', 'handlebars', 'json-schema-ref-parser'],
  input: './src/index.ts',
  output: {
    exports: 'named',
    file: './build/index.js',
    format: 'cjs',
  },
  plugins: getPlugins(),
};
