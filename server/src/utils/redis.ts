import IORedis from 'ioredis';
import path from 'path';
import * as config from './config';

const serverConfig = config.load(path.resolve(__dirname, '../../../var/server.config.json'));

export function init() {
  // new IORedis(redisConfig);
}
