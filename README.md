# OpenAPI Express Codegen

> Node.js library that generates express Typescript types based on the OpenAPI specification.

## Install

```
npm install openapi-express-codegen --save-dev
```

## Usage

```
$ express-gen --help

  Usage: express-gen [options]

  Options:
    -V, --version             output the version number
    -i, --input <value>       OpenAPI specification, can be a path, url or string content (required)
    -o, --output <value>      Output directory (required)
    --useUnionTypes           Use union types instead of enums
    --exportInterfaces <value>  Write interfaces to disk (default: true)
    --exportModels <value>    Write models to disk (default: true)
    --exportSchemas <value>   Write schemas to disk (default: false)
    --indent <value>          Indentation options [4, 2, tab] (default: "4")
    --postfix <value>         Interface name postfix (default: "Generated")
    -h, --help                display help for command

  Examples
    $ express-gen --input ./spec.json --output ./generated
```

# Documentation

- [Basic usage](docs/basic-usage.md)

# References

This project is based on: [openapi-typescript-codegen](https://github.com/ferdikoomen/openapi-typescript-codegen)
