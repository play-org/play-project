import express from 'express';
import db from '../utils/db';
import { catchError } from '../utils/error';
import * as response from '../utils/response';
const router = express.Router();

router.get(
  '/',
  catchError(async (req, res, next) => {
    const data = await db.table('t_users').select(['username', 'password']);
    response.json(res, { data });
  })
);

export default router;
