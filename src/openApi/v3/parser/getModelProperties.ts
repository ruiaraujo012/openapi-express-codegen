import { escapeName } from './escapeName';
import { findOneOfParentDiscriminator, mapPropertyValue } from '../../../utils/discriminator';
import { getPattern } from '../../../utils/getPattern';
import { getType } from './getType';
import type { Model } from '../../../client/interfaces/Model';
import type { OpenApi } from '../interfaces/OpenApi';
import type { OpenApiSchema } from '../interfaces/OpenApiSchema';
import type { getModel } from './getModel';

// Fix for circular dependency
export type GetModelFn = typeof getModel;

export const getModelProperties = (
  openApi: OpenApi,
  definition: OpenApiSchema,
  getModel: GetModelFn,
  parent?: Model,
): Model[] => {
  const models: Model[] = [];
  const discriminator = findOneOfParentDiscriminator(openApi, parent);

  for (const propertyName in definition.properties) {
    if (definition.properties.hasOwnProperty(propertyName)) {
      const property = definition.properties[propertyName];
      const propertyRequired = !!definition.required?.includes(propertyName);
      const propertyValues: Omit<
        Model,
        'export' | 'type' | 'base' | 'template' | 'link' | 'isNullable' | 'imports' | 'enum' | 'enums' | 'properties'
      > = {
        deprecated: property.deprecated === true,
        description: property.description || null,
        exclusiveMaximum: property.exclusiveMaximum,
        exclusiveMinimum: property.exclusiveMinimum,
        format: property.format,
        isDefinition: false,
        isReadOnly: property.readOnly === true,
        isRequired: propertyRequired,
        maxItems: property.maxItems,
        maxLength: property.maxLength,
        maxProperties: property.maxProperties,
        maximum: property.maximum,
        minItems: property.minItems,
        minLength: property.minLength,
        minProperties: property.minProperties,
        minimum: property.minimum,
        multipleOf: property.multipleOf,
        name: escapeName(propertyName),
        pattern: getPattern(property.pattern),
        uniqueItems: property.uniqueItems,
      };

      // eslint-disable-next-line eqeqeq
      if (parent && discriminator?.propertyName == propertyName) {
        models.push({
          base: `'${mapPropertyValue(discriminator, parent)}'`,
          enum: [],
          enums: [],
          export: 'reference',
          imports: [],
          isNullable: property.nullable === true,
          link: null,
          properties: [],
          template: null,
          type: 'string',
          ...propertyValues,
        });
      } else if (property.$ref) {
        const model = getType(property.$ref);

        models.push({
          base: model.base,
          enum: [],
          enums: [],
          export: 'reference',
          imports: model.imports,
          isNullable: model.isNullable || property.nullable === true,
          link: null,
          properties: [],
          template: model.template,
          type: model.type,
          ...propertyValues,
        });
      } else {
        const model = getModel(openApi, property);

        models.push({
          base: model.base,
          enum: model.enum,
          enums: model.enums,
          export: model.export,
          imports: model.imports,
          isNullable: model.isNullable || property.nullable === true,
          link: model.link,
          properties: model.properties,
          template: model.template,
          type: model.type,
          ...propertyValues,
        });
      }
    }
  }

  return models;
};
