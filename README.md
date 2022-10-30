# codegen-yaml-rewrite 
[https://www.npmjs.com/package/codegen-yaml-rewrite](npm link)

A simple package to rewrite the schema URL in graphql codegen.yaml file

## Installation

Use the package manager npm or yarn to install codegen-yaml-rewrite.

```js
npm install codegen-yaml-rewrite
```

```js
yarn add codegen-yaml-rewrite
```

## Requirement

A JSON config file should be created in the root folder named **codegen-rewrite-config.json**
with the following keys and values

```js
{
  "envPath": "./.env", // path to env file
  "targetYamlKey": "schema", // key to be replaced in the yaml
  "targetEnvKey": "NEXT_PUBLIC_GRAPHQL_ENDPOINT", // key to be used from env file
  "yamlPath": "./codegen.yaml" // path for codegen.yaml file
}
```

## Example of codegen.yaml

```yaml
schema: https://example.com/dev/graphql_api
generates:
  apps/exampleapp/graphql/generated.ts:
    plugins:
      - typescript
      - typescript-operations
```

## Usage

in the package.json use this with prestart

```javascript

  "scripts": {
    "prestart": "yarn codegen-yaml-rewrite && yarn generate",
  },

```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
