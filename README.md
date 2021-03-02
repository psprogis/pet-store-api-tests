
## Setup
Start petstore image locally:
```bash
docker run -d -e SWAGGER_HOST=http://petstore.swagger.io -e SWAGGER_URL=http://localhost  -e SWAGGER_BASE_PATH=/v2 -p 80:8080 ibnxotabu4/swagger-api-petstore
```

## TODO
1. extract host name to config (controllers, package.json, request.ts).

## Links
1. [fixed docker image](https://hub.docker.com/r/ibnxotabu4/swagger-api-petstore)
2. [understanding JSON schema](https://json-schema.org/understanding-json-schema/)
3. [online JSON schema generator](https://jsonschema.net/home)
4. [online JSON schema validator](https://www.jsonschemavalidator.net/)
5. [node.js module for JSON schema validation](https://ajv.js.org/)
6. [swagger parser](https://www.npmjs.com/package/@apidevtools/swagger-parser)
