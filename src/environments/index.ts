/* eslint-disable prettier/prettier */
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
//keycloak config
const KEYCLOAK_HOST: string = process.env.KEYCLOAK_HOST || '167.86.69.42';
const KEYCLOAK_REALM_ClIENT: string =
  process.env.KEYCLOAK_REALM_ClIENT || 'med-app';
const REALM_PRODUCTION = process.env.REALM_PRODUCTION || 'null';
const KEYCLOAK_CLIENT_ID: string = process.env.KEYCLOAK_CLIENT_ID || 'med-app';
const KEYCLOAK_CLIENT_SECRECT: string =
  process.env.KEYCLOAK_CLIENT_SECRECT || '7h37hsWaRV4vRnHJxFBAc3PZ4yDkFGGb';
const KEYCLOAK_ADMIN_ID: string = process.env.KEYCLOAK_ADMIN_ID || 'tam';
const KEYCLOAK_ADMIN_PASSWORD: string =
  process.env.KEYCLOAK_ADMIN_PASSWORD || '123456';

//paypal config
const PAYPAL_PRODUCT_ID: string = process.env.PAYPAL_PRODUCT_ID || 'null';
const PAYPAL_CLIENT_ID: string = process.env.PAYPAL_CLIENT_ID || 'null';
const PAYPAL_CLIENT_SECRET: string = process.env.PAYPAL_CLIENT_SECRET || 'null';
const PAYPAL_URL: string =
  process.env.PAYPAL_URL || 'https://api-m.sandbox.paypal.com';

//aws config
const AWS_ACCESS_KEY_ID: string = process.env.AWS_ACCESS_KEY_ID || 'null';
const AWS_SECRET_ACCESS_KEY: string =
  process.env.AWS_SECRET_ACCESS_KEY || 'null';
const AWS_REGION: string = process.env.AWS_REGION || 'ap-southeast-1';
const BUCKET_NAME: string = process.env.BUCKET_NAME || 'null';
export {
  KEYCLOAK_ADMIN_ID,
  KEYCLOAK_ADMIN_PASSWORD,
  BUCKET_NAME,
  REALM_PRODUCTION,
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
  KEYCLOAK_HOST,
  KEYCLOAK_CLIENT_ID,
  KEYCLOAK_CLIENT_SECRECT,
  PAYPAL_PRODUCT_ID,
  PAYPAL_CLIENT_ID,
  PAYPAL_CLIENT_SECRET,
  PAYPAL_URL,
};
