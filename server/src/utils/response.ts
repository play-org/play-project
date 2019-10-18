import { Response } from 'express';
import { ServiceError } from './error';
import ERROR_CODE from '../constants/error-code';

export function json(res: Response, data: any) {
  res.json({
    success: true,
    statuscode: 200,
    errorcode: 0,
    errormsg: null,
    data,
  });
}

export function jsonp(res: Response, data: any) {
  res.jsonp({
    success: true,
    statuscode: 200,
    errorcode: 0,
    errormsg: null,
    data,
  });
}

/**
 * 错误响应（JSON数据结构）
 * @param  {Response} res 响应对象
 * @param  {ServiceError} err            错误对象（包装对象）
 */
export function error(res: Response, err: ServiceError) {
  const status = err.status || ERROR_CODE.INTERNAL_SERVER_ERROR;
  res.status(status).send({
    success: false,
    statuscode: status,
    errorcode: err.code,
    errormsg: err.message || '服务器错误',
    data: null,
  });
}

export function redirect(res: Response, url: string, status = 302) {
  res.redirect(status, url);
}
