import path from 'path';
import * as config from './utils/config';
// 加载配置
config.load(
  path.resolve(__dirname, '../../var/server.config.json'),
  path.resolve(__dirname, '../../var/static.config.json'),
  path.resolve(__dirname, '../../package.json'),
  path.resolve(__dirname, '../../config.json')
);
const createApp = require('./utils/app').default;
const app = createApp();

export default app;
