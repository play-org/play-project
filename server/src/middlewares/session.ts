import express from 'express';
import session, { SessionOptions } from 'express-session';
import connectRedis from 'connect-redis';
import path from 'path';
import IORedis, { RedisOptions } from 'ioredis';

import * as config from '../utils/config';

const sessionConf = config.get('session') as SessionOptions;
const redisConf = config.get('session.store') as RedisOptions;
const RedisStore = connectRedis(session);

const redisClient = new IORedis(redisConf);

export default function(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const redisStore = new RedisStore({ client: redisClient as any });
  const sessionHandler = session({ ...sessionConf, store: redisStore });
  sessionHandler(req, res, next);
}
