import express, { Request, Response, NextFunction } from 'express';
import db from '../utils/db';
var router = express.Router();

router.get('/users', async (req, res, next) => {
  //
  const data = await db.table('t_users').select(['username', 'password']);
  res.json({ data });
});

router
  .route('/books')
  .get(async (req, res, next) => {
    // hello
    const { id, title, author, pageNo, pageSize } = req.query;
    db.table('t_books');
    db.order_by('id', 'asc');
    db.order_by('title', 'desc');
    if (title) db.like({ title: `${title}%` });
    const total = await db.count_all_results(false);
    db.page(pageNo, pageSize);
    const data = await db.select(['author', 'title']);
    res.json({ data, total });
  })
  .put(async (req, res, next) => {
    let data;
    if (req.body instanceof Array) {
      data = await db.table('t_books').insert_batch(req.body);
    } else {
      data = await db.table('t_books').insert(req.body);
    }
    res.json(data);
  })
  .post(async (req, res, next) => {
    const { id, ...rest } = req.body;
    const data = await db
      .table('t_books')
      .where({ id })
      .update(rest);
    res.json(data);
  })
  .delete(async (req, res, next) => {
    const { id } = req.body;
    const data = await db
      .table('t_books')
      .where({ id })
      .delete();
    res.json(data);
  });

export default router;
