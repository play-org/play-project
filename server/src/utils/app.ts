import express, { Router } from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import compression from 'compression';
import routes from '../routes';
import middlewares from '../middlewares/middlewares';
import notFoundMiddleware from '../middlewares/404';
import errorMiddlleware from '../middlewares/error';
import * as logger from './logger';

export default function createApp() {
  const app = express();

  logger.init();

  app.set('etag', false);

  app.use(compression());
  app.use(morgan('dev'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser());

  app.use(express.static(path.join(__dirname, '../../var/static')));
  app.engine('html', require('ejs').renderFile);
  app.set('view engine', 'html');
  app.set('views', path.resolve('../var/static'));
  // use all middlewares，before route
  for (const middleware of middlewares) {
    if (typeof middleware === 'function') app.use(middleware);
  }
  // set routes
  for (const route in routes) {
    if (Object.prototype.hasOwnProperty.call(routes, route)) {
      const handle = (routes as Record<string, Router>)[route];
      if (typeof handle === 'function') app.use(route, handle);
    }
  }
  // 错误处理
  app.use(notFoundMiddleware);
  app.use(errorMiddlleware);

  // 跨域设置
  app.use(function(req, res) {
    res.header('Access-Control-Allow-Origin', req.get('Origin') || '*');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
      'Access-Control-Allow-Methods',
      'GET,HEAD,PUT,PATCH,POST,DELETE'
    );
    res.header('Access-Control-Expose-Headers', 'Content-Length');
    res.header(
      'Access-Control-Allow-Headers',
      'Accept, Authorization, Content-Type, X-Requested-With, Range'
    );
  });
  return app;
}
