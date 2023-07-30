import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';


export function IsFileType(allowedTypes: string[], validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'isFileType',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [allowedTypes],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    if (!value) return true; // If no file is provided, skip validation

                    const [allowedTypes] = args.constraints;
                    const fileMimetype = value.mimetype;

                    return allowedTypes.some((allowedType) => fileMimetype.startsWith(allowedType));
                },
                defaultMessage(args: ValidationArguments) {
                    const [allowedTypes] = args.constraints;
                    return `File type should be one of the following: ${allowedTypes.join(', ')}`;
                },
            },
        });
    };
}
