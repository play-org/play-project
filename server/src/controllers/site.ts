import express from 'express';

const router = express.Router();

/* GET home page. */
router.get(/^\/(?!(api|transform))/, (req, res) => {
  res.render('index');
});
router.get('/transform', (req, res) => {
  // res.render('transform');
  res.send('123');
});

export default router;
