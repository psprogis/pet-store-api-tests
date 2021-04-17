import { cleanEnv, str, url } from 'envalid';

export const CONFIG = cleanEnv(process.env, {
    PETSTORE_URL: url({
        default: 'http://localhost',
        desc: 'api url to be tested',
    }),
    PETSTORE_API_PREFIX_PATH: str({
        default: '/v2',
        desc: 'prefix part in url path to be prepended to all requests'
    }),
    PETSTORE_SWAGGER_URL: url({
        default: 'http://localhost/v2/swagger.json',
        desc: 'url to swagger json documentation'
    }),
});