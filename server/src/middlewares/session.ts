import connectRedis from 'connect-redis';
import session, { SessionOptions } from 'express-session';
import IORedis, { RedisOptions } from 'ioredis';

import * as config from '../utils/config';

const sessionConf = config.get('session') as SessionOptions;
const redisConf = config.get('session.store') as RedisOptions;

const RedisStore = connectRedis(session);
export const redisClient = new IORedis(redisConf);
export const redisStore = new RedisStore({ client: redisClient as any });

export default session({ ...sessionConf, store: redisStore });
