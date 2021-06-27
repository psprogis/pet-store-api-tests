import { allure } from 'allure-mocha/dist/MochaAllureReporter';

export function AllureStep(message: string) {
    return (target: Object, property: string, descriptor: PropertyDescriptor) => {
        const origFunction = descriptor.value;

        descriptor.value = function (...args: any[]) {
            return allure.step(
                message,
                async () => {
                    allure.createAttachment(
                        `${message} arguments`,
                        JSON.stringify(args, null, 4),
                        'application/json' as any
                    );

                    const result = await origFunction.apply(this, args);

                    allure.createAttachment(
                        `${message} result`,
                        JSON.stringify(result, null, 4),
                        'application/json' as any
                    );

                    return result;
                }
            );
        }

        return descriptor;
    }
}
