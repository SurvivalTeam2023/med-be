/* eslint-disable prettier/prettier */
import jwt_decode from 'jwt-decode';
import { ERROR_MESSAGE } from 'src/common/constants/messages.constant';
import { ErrorHelper } from 'src/helpers/error.helper';

interface JSONData {
    [key: string]: any;
}

export function findValueByKey(obj: JSONData, key: string): any {
    try {
        if (obj.hasOwnProperty(key)) {
            return obj[key];
        }

        for (let prop in obj) {
            if (typeof obj[prop] === 'object') {
                const result = findValueByKey(obj[prop], key);
                if (result) {
                    return result;
                }
            }
        }
    } catch (error) {
        ErrorHelper.BadRequestException(ERROR_MESSAGE.KEYCLOAK.SOMETHING_WRONG);

    }

    return null;
}