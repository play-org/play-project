import express from 'express';
import db from '../utils/db';
import { catchError } from '../utils/error';
import * as response from '../utils/response';

const router = express.Router();

router
  .route('/')
  .get(
    catchError(async (req, res) => {
      const { pageNo, pageSize } = req.query;
      db.table('t_posts');

      const total = await db.count_all_results(false);
      db.page(pageNo, pageSize);
      const list = await db
        .select(['id', 'title', 'like_num', 'comment_num'])
        .findAll();
      response.json(res, { list, total });
    })
  )
  .put(
    catchError(async (req, res) => {
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
    catchError(async (req, res) => {
      const { id, ...rest } = req.body;
      const data = await db
        .table('t_posts')
        .where({ id })
        .update(rest);
      response.json(res, data);
    })
  )
  .delete(
    catchError(async (req, res) => {
      const { id } = req.body;
      const data = await db
        .table('t_posts')
        .where({ id })
        .delete();
      response.json(res, data);
    })
  );

router.get(
  '/:id',
  catchError(async (req, res) => {
    const { id } = req.params;
    // 查询帖子
    const { author_id, tags, categories, ...rest } = await db
      .select()
      .table('t_posts')
      .where({ id })
      .findOne();
    // 查询扩展表
    const p_user = db
      .select(['username', 'avatar'])
      .table('t_users')
      .where({ id: author_id })
      .findOne();

    const p_tag = db
      .select()
      .table('t_tags')
      .where_in('id', tags.split(','))
      .findAll();

    const p_category = db
      .select()
      .table('t_categories')
      .where_in('id', categories.split(','))
      .findAll();

    const [userInfo, tagInfo, categoryInfo] = await Promise.all([
      p_user,
      p_tag,
      p_category,
    ]);
    // 生成阅读数
    db.table('t_posts')
      .where({ id })
      .update({ read_num: rest.read_num + 1 });

    response.json(res, {
      ...rest,
      ...userInfo,
      tags: tagInfo,
      categories: categoryInfo,
    });
  })
);

export default router;
