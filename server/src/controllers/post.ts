import express from 'express';
import db from '../utils/db';
import { catchError } from '../utils/error';
import * as response from '../utils/response';

var router = express.Router();

router
  .route('/')
  .get(
    catchError(async (req, res, next) => {
      const { pageNo, pageSize } = req.query;
      db.table('t_posts');

      const total = await db.count_all_results(false);
      db.page(pageNo, pageSize);
      const list = await db.select().findAll();
      response.json(res, { list, total });
    })
  )
  .put(
    catchError(async (req, res, next) => {
      let data;
      if (req.body instanceof Array) {
        data = await db.table('t_posts').insert_batch(req.body);
      } else {
        data = await db.table('t_posts').insert(req.body);
      }
      response.json(res, data);
    })
  )
  .post(
    catchError(async (req, res, next) => {
      const { id, ...rest } = req.body;
      const data = await db
        .table('t_posts')
        .where({ id })
        .update(rest);
      response.json(res, data);
    })
  )
  .delete(
    catchError(async (req, res, next) => {
      const { id } = req.body;
      const data = await db
        .table('t_posts')
        .where({ id })
        .delete();
      response.json(res, data);
    })
  );

export default router;
