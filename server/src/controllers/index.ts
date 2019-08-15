import express, { Request, Response, NextFunction } from 'express';
// import * as db from '../utils/db';
var router = express.Router();

/* GET home page. */
router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.render('index', { title: 'Express' });
});

router.get('/users', async (req: Request, res: Response, next: NextFunction) => {
  // const data = await db.query('select * from t_users');
  // res.json({ data });
});

export default router;
