import express from 'express';
import connectRedis from 'connect-redis';
import session, { SessionOptions } from 'express-session';
import IORedis, { RedisOptions } from 'ioredis';

import * as config from '../utils/config';

export default function(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const sessionConf = config.get('session') as SessionOptions;
  const redisConf = config.get('session.store') as RedisOptions;

  const RedisStore = connectRedis(session);
  const redisClient = new IORedis(redisConf);
  const redisStore = new RedisStore({ client: redisClient as any });
  const sessionHandler = session({ ...sessionConf, store: redisStore });
  sessionHandler(req, res, next);
}
