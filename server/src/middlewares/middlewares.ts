/**
 * express中间件列表
 * @author luoying
 * @since 17/07/27
 */

import express from 'express';
import session from './session';

// 将middlewares目录下的所有中间件，组合成中间件列表统一导出
const middlewares: express.RequestHandler[] = [session];

export default middlewares;
