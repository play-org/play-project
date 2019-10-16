import express from 'express';
import db from '../utils/db';
import log4js from 'log4js';

const logger = log4js.getLogger('session');
// sessionLogger.level = 'debug';
var router = express.Router();

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  // TODO:封装 findOne 和 findAll，内部数据处理
  const data: Array<Record<string, any>> = await db
    .table('t_users')
    .where({
      username,
      password,
    })
    .select(['id', 'username']);
  if (req.session) {
    req.session.userInfo = data[0];
    logger.debug('userInfo:', data[0]);
  }
  res.json(data);
});

export default router;
