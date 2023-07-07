import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';
import * as mime from 'mime-types';

export function IsFileType(allowedTypes: string[], validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            name: 'isFileType',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value: Express.Multer.File, args: ValidationArguments) {
                    if (!value) {
                        return true; // Skip validation if value is not provided
                    }
                    const fileType = mime.lookup(value.originalname);
                    return allowedTypes.includes(fileType);
                },
            },
        });
    };
}
