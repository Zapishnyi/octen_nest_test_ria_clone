import { AdminRoleEnum } from '../modules/users/enums/user-role.enum';

export type EnvConfigType = {
  app: AppConfigType;
  admin: AdminConfigType;
  mailer: MailerConfigType;
  sentry: SentryConfigType;
  postgres: PostgresConfigType;
  redis: RedisConfigType;
  jwt: JWTConfigType;
  aws: AwsConfig;
};

export type AdminConfigType = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  phone: string;
  role: AdminRoleEnum;
};
export type MailerConfigType = {
  host: string;
  port: string;
  email: string;
  from: string;
  pass: string;
};

export type SentryConfigType = {
  dsn: string;
  env: string;
  debug: boolean;
};

export type AppConfigType = {
  port: number;
  host: string;
};

export type PostgresConfigType = {
  port: number;
  host: string;
  user: string;
  password: string;
  dbName: string;
};
export type RedisConfigType = {
  port: number;
  host: string;
  password: string;
};
export type JWTConfigType = {
  accessSecret: string;
  accessExpire: number;
  refreshSecret: string;
  refreshExpire: number;
};
export type AwsConfig = {
  region: string;
  accessKeyId: string;
  secretAccessKey: string;
  bucketName: string;
  bucketURL: string;
  localBucket: string;
};
