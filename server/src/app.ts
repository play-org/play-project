import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import siteRouter from './controllers/site';
import indexRouter from './controllers/index';
import transformRouter from './controllers/transform';
import compression from 'compression';
import * as config from './utils/config';

const RUNTIME_ENV = config.load(path.resolve(__dirname, '../../var/server.config.json'))
  .RUNTIME_ENV;
const app = express();
app.set('RUNTIME_ENV', RUNTIME_ENV);

app.use(compression());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// 跨域设置
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET,HEAD,PUT,PATCH,POST,DELETE');
  res.header('Access-Control-Expose-Headers', 'Content-Length');
  res.header(
    'Access-Control-Allow-Headers',
    'Accept, Authorization, Content-Type, X-Requested-With, Range'
  );
  if (req.method === 'OPTIONS') {
    return res.send(200);
  } else {
    return next();
  }
});
app.use(express.static(path.join(__dirname, '../../var/static')));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('views', path.resolve('../var/static'));
app.use('/', siteRouter);
app.use('/api', indexRouter);
app.use('/api/transform', transformRouter);

module.exports = app;
