import { RequestHandler, NextFunction, Request, Response } from 'express';
import log4js from 'log4js';
import SERVICE_CODE from '../constants/service-code';
import ERROR_CODE from '../constants/error-code';

const requestLogger = log4js.getLogger('request:api');

export class ServiceError extends Error {
  // 错误码=服务码+状态码
  code: string;

  // 状态码
  status: ERROR_CODE;

  constructor(
    serviceCode: SERVICE_CODE = SERVICE_CODE.UNKONWN,
    status: ERROR_CODE = ERROR_CODE.INTERNAL_SERVER_ERROR,
    msg = '未知错误'
  ) {
    super(msg);
    const code = serviceCode + status;
    this.code = code;
    this.status = status;
  }
}

export function catchError(handler: RequestHandler) {
  return (req: Request, res: Response, next: NextFunction) => {
    requestLogger.info('node api: %s', req.baseUrl + req.route.path);
    return Promise.resolve(handler(req, res, next)).catch(err => {
      next(err);
    });
  };
}
