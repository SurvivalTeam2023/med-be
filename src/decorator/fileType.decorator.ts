import * as mime from 'mime-types';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';

@ValidatorConstraint({ name: 'fileType', async: false })
export class FileTypeValidator implements ValidatorConstraintInterface {
    validate(value: Express.Multer.File[], args: ValidationArguments) {
        if (!Array.isArray(value)) {
            return false;
        }

        const allowedTypes: string[] = args.constraints[0];

        for (const file of value) {
            const fileType = mime.lookup(file.originalname);

            if (!allowedTypes.includes(fileType)) {
                return false;
            }
        }

        return true;
    }

    defaultMessage(args: ValidationArguments) {
        return 'Invalid file type.';
    }
}
