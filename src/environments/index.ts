import * as dotenv from 'dotenv';

dotenv.config();
const SERVER_PORT: number = +process.env.SERVER_PORT || 8081;
const SWAGGER_URL: string = process.env.SWAGGER_URL || 'docs';
const DB_HOST: string = process.env.DB_HOST || 'localhost';
const DB_PORT: string = process.env.DB_PORT || '5432';
const DB_USERNAME: string = process.env.DB_USERNAME || 'postgres';
const DB_PASSWORD: string = process.env.DB_PASSWORD || '123456';
const DB_DATABASE: string = process.env.DB_DATABASE || 'postgres';
const APP_BASE_URL_PREFIX: string = process.env.APP_BASE_URL_PREFIX || 'api';
export {
  APP_BASE_URL_PREFIX,
  SERVER_PORT,
  SWAGGER_URL,
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_DATABASE,
};
