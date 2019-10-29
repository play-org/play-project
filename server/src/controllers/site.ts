import express, { Request, Response, NextFunction } from 'express';
var router = express.Router();

/* GET home page. */
router.get(/^\/(?!(api|transform))/, (req, res, next) => {
  res.render('index');
});
router.get('/transform', (req, res, next) => {
  // res.render('transform');
  res.send('123');
});

export default router;
