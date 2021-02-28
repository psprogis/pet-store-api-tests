import Ajv from 'ajv';

export function validate(schema: any, body: any) {
    const ajv = new Ajv({
        strict: false,
        allErrors: true,
        verbose: true,
    });

    const validateFn = ajv.compile(schema);
    const valid = validateFn(body);

    if ( !valid ) {
        throw new Error(`Schema validation error: ${JSON.stringify({
            validationErrors: validateFn.errors
        }, null, 4)}`);
    }
}
