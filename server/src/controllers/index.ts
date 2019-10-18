import express from 'express';
import db from '../utils/db';
import log4js from 'log4js';
import { catchError, ServiceError } from '../utils/error';
import SERVICE_CODE from '../constants/service-code';
import ERROR_CODE from '../constants/error-code';

const logger = log4js.getLogger('session');
// sessionLogger.level = 'debug';
var router = express.Router();

router.post(
  '/login',
  catchError(async (req, res) => {
    const { username, password } = req.body;
    const data: Array<Record<string, any>> = await db
      .select(['id', 'username'])
      .table('t_users')
      .where({
        username,
        password,
      })
      .findOne();
    if (req.session) {
      req.session.userInfo = data[0];
      logger.debug('userInfo:', data[0]);
    }
    throw new ServiceError(
      SERVICE_CODE.API,
      ERROR_CODE.BAD_REQUEST,
      '登录参数不对'
    );

    res.json(data);
  })
);

export default router;
