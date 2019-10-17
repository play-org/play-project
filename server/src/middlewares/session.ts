import express from 'express';
import session from 'express-session';
import connectRedis from 'connect-redis';
import path from 'path';
import * as config from '../utils/config';
import IORedis from 'ioredis';

const serverConfig = config.load(
  path.resolve(__dirname, '../../../var/server.config.json')
);
const sessionConfig = serverConfig['session'];
const redisConfig = sessionConfig['store'];
const RedisStore = connectRedis(session);

const redisClient = new IORedis(redisConfig);

export default function(
  req: express.Request,
  res: express.Response,
  next: express.NextFunction
) {
  const redisStore = new RedisStore({ client: redisClient as any });
  const sessionHandler = session({ ...sessionConfig, store: redisStore });
  sessionHandler(req, res, next);
}
