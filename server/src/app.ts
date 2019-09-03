import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import indexRouter from './controllers/index';
import scatchRouter from './controllers/scatch';
import compression from 'compression';

var app = express();

app.use(compression());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../../var/static')));
app.use('/', indexRouter);
app.use('/scatch', scatchRouter);
module.exports = app;
