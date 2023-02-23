/* eslint-disable prettier/prettier */
import jwt_decode from 'jwt-decode';

export function getUserId(token: string) {
  let decoded_token = jwt_decode(token);
  let userId = decoded_token['sub'];
  return userId;
}
