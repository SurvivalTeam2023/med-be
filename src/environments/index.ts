import * as dotenv from 'dotenv';

dotenv.config();
const SERVER_PORT: number = +process.env.SERVER_PORT || 8081;
const SWAGGER_URL: string = process.env.SWAGGER_URL || 'docs';
const DB_HOST: string = process.env.DB_HOST || 'localhost';
const DB_PORT: string = process.env.DB_PORT || '5432';
const DB_USERNAME: string = process.env.DB_USERNAME || 'admin';
const DB_PASSWORD: string = process.env.DB_PASSWORD || '123123';
const DB_DATABASE: string = process.env.DB_DATABASE || 'med-be';
const APP_BASE_URL_PREFIX: string = process.env.APP_BASE_URL_PREFIX || 'api';
const KEYCLOAK_HOST: string = process.env.KEYCLOAK_HOST || 'localhost';
const KEYCLOAK_REALM_ClIENT: string =
  process.env.KEYCLOAK_REALM_ClIENT || 'med-app';
const KEYCLOAK_CLIENT_ID: string = process.env.KEYCLOAK_CLIENT_ID || 'med-app';
const KEYCLOAK_CLIENT_SECRECT: string =
  process.env.KEYCLOAK_CLIENT_SECRECT || 'EwfsGCeuMDHS2At96ftlzZtN6Mz9aY09';
const AWS_ACCESS_KEY_ID: string = process.env.AWS_ACCESS_KEY_ID || 'null';
const AWS_SECRET_ACCESS_KEY: string =
  process.env.AWS_SECRET_ACCESS_KEY || 'null';
const AWS_REGION: string = process.env.AWS_REGION || 'null';
const REALM_PRODUCTION = process.env.REALM_PRODUCTION || 'null';
export {
  REALM_PRODUCTION,
  KEYCLOAK_HOST,
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_ACCESS_KEY,
  AWS_REGION,
  APP_BASE_URL_PREFIX,
  SERVER_PORT,
  SWAGGER_URL,
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
  KEYCLOAK_REALM_ClIENT,
  KEYCLOAK_CLIENT_ID,
  KEYCLOAK_CLIENT_SECRECT,
};
