import express, { Request, Response, NextFunction } from 'express';
import db from '../utils/db';
var router = express.Router();

router.get('/', async (req, res, next) => {
  //
  const data = await db.table('t_users').select(['username', 'password']);
  res.json({ data });
});

export default router;
