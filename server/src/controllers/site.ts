import express, { Request, Response, NextFunction } from 'express';
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});
router.get('/transform', (req, res, next) => {
  res.render('transform');
});

export default router;