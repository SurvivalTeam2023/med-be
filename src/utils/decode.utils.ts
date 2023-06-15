/* eslint-disable prettier/prettier */
import jwt_decode from 'jwt-decode';
import { ERROR_MESSAGE } from 'src/common/constants/messages.constant';
import { ErrorHelper } from 'src/helpers/error.helper';

export function getUserId(token: string): string {
  try {
    let decoded_token = jwt_decode(token);
    let userId = decoded_token['sub'];
    return userId;
  } catch (error) {
    ErrorHelper.UnAuthorizeException(ERROR_MESSAGE.KEYCLOAK.INVALID_TOKEN);
  }
}
