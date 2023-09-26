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
const AI_SERVICE_URL: string =
  process.env.AI_SERVICE_URL || 'http://167.86.69.42:8899';

const OPENAI_API_KEY: string = process.env.OPENAI_KEY || '';


//fmc
const FCM_PROJECT_ID = process.env.FCM_PROJECT_ID
const CLIENT_EMAIL = process.env.CLIENT_EMAIL
const PRIVATE_KEY = "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDXPX03bzLYCFyb\n/aKVjntM3kTrW7KEOGRjjXKl7ot32GuN2MKpz3rnluvEE7qsV0pEElbc0VVZgKJX\noLiTmElK78uV7e2OdQNif+i6Kj0/groYEPwstUvzz5E2FfvtlZM1hF76Cq3F5KPb\npMHQ4gBOhrsQ8k+BJQNwYMA0I7VpQgzNRRM+6CQZik8cvEO++Tw/68Sw80z8K35u\nhSjNJvNTD3E0ydAInZsO6HqdgwkWo1++k7HML31lgr9qYnfFs+S4NrihkAcAxC9p\n4l3l14cE50PlFHJH7A1LoBoGkg4UxyisWZz4DYk0FD9cn9S8eC9CqJ03+jL3DhiA\ntoW1PN8ZAgMBAAECggEAMRl/xPOC37EYnyT+v6sfCWvywNXMJUlP7T3JF30RJ6eg\n8VyvG1mPKeFNqw7tGH9ZG6orUngWRjKH1gF92X11yrhk8rCx7jtXKFMRXdZg3moN\n1YuaWwCIcPe6omHldE8Yo66sk9F3zprXnjU5WVMUytUFO1prNISjAjGv5rT2nync\n7RnL0TbOCac6l2N3+eHRGwe/Q7Ikoqe+Yd7Q9BOoIs0p0LsU8Jxu6/IKwIZtT8H2\nTn0h4qD3egFgn0NErtp5Ly3X9b7QKwS1+2kXvJ3D3XHJG8gpq1ogTgVKSZmTu5Zy\nFsCXjRrcuXr9I3EICFp9iOYsj6t21HpoqEztsNoO4QKBgQDwgiw2XDliAVnHf5hf\no0Mk1kbuo4Yn4NlmE9IpdbtHr0FM90G5Or4SmXz2Ra7FdimAIrSmCphZa/7OIMWS\n5y3F42KZWl93rmwzEb3jiJwZ+GuENzkzBskGev/LWoKl9vbHJ5OHLAeqLRwbknaC\nfWdI+CMHl2ktlyXcfWvRUws2vQKBgQDlGqim/zM9g70/nXKIvz8iDJQv0xzugKcL\nnu8WcXj0cTMO8LL4+tnSW7fGMPjpanIqq/Fla5SR9gHtpXdtngziOCD0PGw4cEuS\nLM0PCZu4v88qiei3O1F420i7L+pT/kTcuHnPj4AjPgtOzBOMgwnP8B0JP9nkHw4y\nCOGZZnqtjQKBgB/3vXawRXRQZ6WLwS4dHkScMqtvktpkGaFmyw11t6HsmopnZxX+\nx9rjCegWFQfsD9IXStmzGNLx9tlhI8HF9qCR+74UdBINXhZfqlS/CLiu+2OEj5bH\ntRqmaK+X5Tu4Gs8X5JUX9iDZhB3qFtR7ZKofSVCuAG3t5DttdFJLbnclAoGAA5jg\njwawwkWAQjBxrO37ysgRx5J0ANaqSMdtD5gmgwgH+jMTTE97/g6MmyMHtXqDYmIi\nvynqQkRvkVCoyGLT5vVkpxEPze8NcLUdXyASftscIJnbuozG4bPnt3CwKDN011Za\nK0UgiO0fdlRD9k/UZpxpiEylWiyWp3h2Oldek70CgYEA6hcOUHf0VQ1oWjMyNnpw\n8u9t/DrWhmWcwzeITf5dWAE3WFIWR3GZEMWEGJDm8Lfx8F4vpxaT/unXibtA+Iw5\nUrN47m7UKbwmqOMYeGQhjmLqWJ2DDwIk6pBhOeyzkWupxYwm4a61EW/cmQyfegay\nvtdoj6HJXURHxp1G0+uoKSA=\n-----END PRIVATE KEY-----"
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
  AI_SERVICE_URL,
  OPENAI_API_KEY,
  FCM_PROJECT_ID,
  CLIENT_EMAIL,
  PRIVATE_KEY
};
