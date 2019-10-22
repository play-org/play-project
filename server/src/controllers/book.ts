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
      db.table('t_books');
      // db.order_by('id', 'asc');
      // db.order_by('title', 'desc');
      // if (title) db.like({ title: `${title}%` });
      const total = await db.count_all_results(false);
      db.page(pageNo, pageSize);
      const data = await db.select(['author', 'title']).findAll();
      response.json(res, { data, total });
    })
  )
  .put(
    catchError(async (req, res, next) => {
      let data;
      if (req.body instanceof Array) {
        data = await db.table('t_books').insert_batch(req.body);
      } else {
        data = await db.table('t_books').insert(req.body);
      }
      response.json(res, data);
    })
  )
  .post(
    catchError(async (req, res, next) => {
      const { id, ...rest } = req.body;
      const data = await db
        .table('t_books')
        .where({ id })
        .update(rest);
      response.json(res, data);
    })
  )
  .delete(
    catchError(async (req, res, next) => {
      const { id } = req.body;
      const data = await db
        .table('t_books')
        .where({ id })
        .delete();
      response.json(res, data);
    })
  );

export default router;
