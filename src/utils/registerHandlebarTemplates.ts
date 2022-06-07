import Handlebars from 'handlebars/runtime';

import { registerHandlebarHelpers } from './registerHandlebarHelpers';
import partialBase from '../templates/partials/base.hbs';
import partialExportComposition from '../templates/partials/exportComposition.hbs';
import partialExportEnum from '../templates/partials/exportEnum.hbs';
import partialExportInterface from '../templates/partials/exportInterface.hbs';
import partialExportType from '../templates/partials/exportType.hbs';
import partialHeader from '../templates/partials/header.hbs';
import partialIsNullable from '../templates/partials/isNullable.hbs';
import partialIsReadOnly from '../templates/partials/isReadOnly.hbs';
import partialIsRequired from '../templates/partials/isRequired.hbs';
import partialParameters from '../templates/partials/parameters.hbs';
import partialResult from '../templates/partials/result.hbs';
import partialSchema from '../templates/partials/schema.hbs';
import partialSchemaArray from '../templates/partials/schemaArray.hbs';
import partialSchemaComposition from '../templates/partials/schemaComposition.hbs';
import partialSchemaDictionary from '../templates/partials/schemaDictionary.hbs';
import partialSchemaEnum from '../templates/partials/schemaEnum.hbs';
import partialSchemaGeneric from '../templates/partials/schemaGeneric.hbs';
import partialSchemaInterface from '../templates/partials/schemaInterface.hbs';
import partialType from '../templates/partials/type.hbs';
import partialTypeArray from '../templates/partials/typeArray.hbs';
import partialTypeDictionary from '../templates/partials/typeDictionary.hbs';
import partialTypeEnum from '../templates/partials/typeEnum.hbs';
import partialTypeGeneric from '../templates/partials/typeGeneric.hbs';
import partialTypeInterface from '../templates/partials/typeInterface.hbs';
import partialTypeIntersection from '../templates/partials/typeIntersection.hbs';
import partialTypeReference from '../templates/partials/typeReference.hbs';
import partialTypeUnion from '../templates/partials/typeUnion.hbs';
import templateExportInterface from '../templates/exportInterface.hbs';
import templateExportModel from '../templates/exportModel.hbs';
import templateExportSchema from '../templates/exportSchema.hbs';
import templateIndex from '../templates/index.hbs';

export interface Templates {
  index: Handlebars.TemplateDelegate;
  exports: {
    model: Handlebars.TemplateDelegate;
    schema: Handlebars.TemplateDelegate;
    interface: Handlebars.TemplateDelegate;
  };
}

/**
 * Read all the Handlebar templates that we need and return on wrapper object
 * so we can easily access the templates in out generator / write functions.
 */
export const registerHandlebarTemplates = (root: { useUnionTypes: boolean }): Templates => {
  registerHandlebarHelpers(root);

  // Main templates (entry points for the files we write to disk)
  const templates: Templates = {
    exports: {
      interface: Handlebars.template(templateExportInterface),
      model: Handlebars.template(templateExportModel),
      schema: Handlebars.template(templateExportSchema),
    },
    index: Handlebars.template(templateIndex),
  };

  // Partials for the generations of the models, interfaces, etc.
  Handlebars.registerPartial('exportEnum', Handlebars.template(partialExportEnum));
  Handlebars.registerPartial('exportInterface', Handlebars.template(partialExportInterface));
  Handlebars.registerPartial('exportComposition', Handlebars.template(partialExportComposition));
  Handlebars.registerPartial('exportType', Handlebars.template(partialExportType));
  Handlebars.registerPartial('header', Handlebars.template(partialHeader));
  Handlebars.registerPartial('isNullable', Handlebars.template(partialIsNullable));
  Handlebars.registerPartial('isReadOnly', Handlebars.template(partialIsReadOnly));
  Handlebars.registerPartial('isRequired', Handlebars.template(partialIsRequired));
  Handlebars.registerPartial('parameters', Handlebars.template(partialParameters));
  Handlebars.registerPartial('result', Handlebars.template(partialResult));
  Handlebars.registerPartial('schema', Handlebars.template(partialSchema));
  Handlebars.registerPartial('schemaArray', Handlebars.template(partialSchemaArray));
  Handlebars.registerPartial('schemaDictionary', Handlebars.template(partialSchemaDictionary));
  Handlebars.registerPartial('schemaEnum', Handlebars.template(partialSchemaEnum));
  Handlebars.registerPartial('schemaGeneric', Handlebars.template(partialSchemaGeneric));
  Handlebars.registerPartial('schemaInterface', Handlebars.template(partialSchemaInterface));
  Handlebars.registerPartial('schemaComposition', Handlebars.template(partialSchemaComposition));
  Handlebars.registerPartial('type', Handlebars.template(partialType));
  Handlebars.registerPartial('typeArray', Handlebars.template(partialTypeArray));
  Handlebars.registerPartial('typeDictionary', Handlebars.template(partialTypeDictionary));
  Handlebars.registerPartial('typeEnum', Handlebars.template(partialTypeEnum));
  Handlebars.registerPartial('typeGeneric', Handlebars.template(partialTypeGeneric));
  Handlebars.registerPartial('typeInterface', Handlebars.template(partialTypeInterface));
  Handlebars.registerPartial('typeReference', Handlebars.template(partialTypeReference));
  Handlebars.registerPartial('typeUnion', Handlebars.template(partialTypeUnion));
  Handlebars.registerPartial('typeIntersection', Handlebars.template(partialTypeIntersection));
  Handlebars.registerPartial('base', Handlebars.template(partialBase));

  return templates;
};
