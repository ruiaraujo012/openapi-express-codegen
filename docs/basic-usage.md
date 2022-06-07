# Basic usage

```
$ express-gen --help

  Usage: express-gen [options]

  Options:
    -V, --version             output the version number
    -i, --input <value>       OpenAPI specification, can be a path, url or string content (required)
    -o, --output <value>      Output directory (required)
    --useUnionTypes           Use union types instead of enums
    --exportInterfaces  <value>  Write interfaces to disk (default: true)
    --exportModels <value>    Write models to disk (default: true)
    --exportSchemas <value>   Write schemas to disk (default: false)
    --indent <value>          Indentation options [4, 2, tab] (default: "4")
    --postfix <value>         Interface name postfix (default: "Generated")
    -h, --help                display help for command

  Examples
    $ express-gen --input ./spec.json --output ./generated
```

## Example

**package.json**

```json
{
    "scripts": {
        "generate": "express-gen --input ./spec.json --output ./generated"
    }
}
```

**NPX**

```
npx openapi-express-codegen --input ./spec.json --output ./generated
```

**Node.js**

```javascript
const OpenAPI = require('openapi-express-codegen');

OpenAPI.generate({
    input: './spec.yaml', // or './spec.json'
    output: './generated',
});

// Or by providing the content of the spec directly 🚀
OpenAPI.generate({
    input: require('./spec.yaml'), // or require('./spec.json')
    output: './generated',
});
```
