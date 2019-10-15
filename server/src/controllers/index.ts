import express, { Request, Response, NextFunction } from 'express';
import db from '../utils/db';
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
  console.log(req.session);
  if (req.session) {
    console.log(1);
    req.session.userInfo = data[0];
  }
  console.log(data[0]);
  res.json(data);
});

export default router;
