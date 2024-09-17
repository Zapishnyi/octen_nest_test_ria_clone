import * as process from 'node:process';

import { AdminRoleEnum } from '../modules/users/enums/user-role.enum';
import { EnvConfigType } from './envConfigType';

export default (): EnvConfigType => ({
  app: {
    port: Number(process.env.APP_PORT) /*|| 3000*/,
    host: process.env.APP_HOST /*|| '0.0.0.0'*/,
  },
  admin: {
    first_name: process.env.FIRST_NAME,
    last_name: process.env.LAST_NAME,
    email: process.env.MAIL,
    password: process.env.PASSWORD,
    phone: process.env.PHONE,
    role: AdminRoleEnum[process.env.ROLE],
  },
  mailer: {
    host: process.env.SMTP_SERVER,
    port: process.env.SMTP_PORT,
    email: process.env.SMTP_EMAIL,
    from: process.env.FROM,
    pass: process.env.IMAP_PASS,
  },
  sentry: {
    dsn: process.env.SENTRY_DSN,
    env: process.env.NODE_ENV,
    debug: !!process.env.DEBUG,
  },
  postgres: {
    port: Number(process.env.POSTGRES_PORT),
    host: process.env.POSTGRES_HOST,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    dbName: process.env.POSTGRES_DB,
  },
  redis: {
    port: Number(process.env.REDIS_PORT),
    host: process.env.REDIS_HOST,
    password: process.env.REDIS_PASSWORD,
  },
  jwt: {
    accessSecret: process.env.JWT_ACCESS_SECRET,
    accessExpire: Number(process.env.JWT_ACCESS_EXPIRE),
    refreshSecret: process.env.JWT_REFRESH_SECRET,
    refreshExpire: Number(process.env.JWT_REFRESH_EXPIRE),
  },
  aws: {
    region: process.env.AWS_S3_REGION,
    accessKeyId: process.env.AWS_S3_KEY_ID,
    secretAccessKey: process.env.AWS_S3_ACCESS_KEY,
    bucketName: process.env.AWS_S3_BUCKET_NAME,
    bucketURL: process.env.AWS_S3_BUCKET_URL,
    localBucket: process.env.AWS_S3_LOCAL_BUCKET,
  },
});
