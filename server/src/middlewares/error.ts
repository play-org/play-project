import { Request, Response } from 'express';
import log4js from 'log4js';
import { ServiceError } from '../utils/error';
import SERVICE_CODE from '../constants/service-code';
import ERROR_CODE from '../constants/error-code';
import * as response from '../utils/response';

const appLogger = log4js.getLogger('app');

export default function(err: ServiceError, req: Request, res: Response) {
  if (!err.status) err.status = ERROR_CODE.INTERNAL_SERVER_ERROR;
  if (!err.code) err.code = SERVICE_CODE.UNKONWN + err.status;

  const logData = {
    method: req.method,
    path: req.path,
    status: err.status,
    code: err.code,
    message: err.message || '服务器错误',
  };
  appLogger.error(`${req.path} ${err.code} - ${logData.message} %j`, logData);

  const msg = err.message;

  const accept = req.get('accept') || '';

  if (/application\/json/i.test(accept) || /^\/api\//.test(req.originalUrl)) {
    response.error(res, err);
    return;
  }

  // html response
  const body = `<h1>${err.code}</h1><h2>${err.message}</h2><p>${msg}</p>`;
  res.status(err.status).send(body);
}
