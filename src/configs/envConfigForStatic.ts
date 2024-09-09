import * as process from 'node:process';

import * as dotenv from 'dotenv';

import { EnvConfigType } from './envConfigType';
import envConfiguration from './envConfiguration';

class EnvConfigForStatic {
  public get(): EnvConfigType {
    return envConfiguration();
  }
}

const envFileName = process.env.ENVIROMNEN || 'local';
dotenv.config({ path: `enviroments/${envFileName}.env` });
const ConfigurationStaticService = new EnvConfigForStatic();
export { ConfigurationStaticService };
