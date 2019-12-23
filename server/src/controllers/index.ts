import express from 'express';
import log4js from 'log4js';
import { catchError } from '../utils/error';
import db from '../utils/db';
import * as response from '../utils/response';

const logger = log4js.getLogger('session');
// sessionLogger.level = 'debug';
var router = express.Router();

router.post(
  '/login',
  catchError(async (req, res) => {
    const { username, password } = req.body;
    const data: Record<string, any> = await db
      .select(['id', 'username'])
      .table('t_users')
      .where({
        username,
        password,
      })
      .findOne();
    if (req.session) {
      req.session.userInfo = data;
      logger.debug('userInfo:', data);
    }
    response.json(res, data);
  })
);

router.get(
  '/checkLogin',
  catchError(async (req, res) => {
    let ret = {
      isLogined: false,
      userInfo: null,
    };
    if (req.session && req.session.userInfo) {
      ret = {
        isLogined: true,
        userInfo: req.session.userInfo,
      };
    }
    response.json(res, ret);
  })
);

export default router;
