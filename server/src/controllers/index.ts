import express from 'express';
import log4js from 'log4js';
import { catchError } from '../utils/error';
<<<<<<< HEAD
import * as response from '../utils/response';
=======
import db from '../utils/db';
import * as response from '../utils/response';

>>>>>>> 17cd4a277b35e5e9425e7f19ce68c81f3277b131
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
    response.json(res, data);
  })
);

export default router;
