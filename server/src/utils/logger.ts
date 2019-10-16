import log4js from 'log4js';

/**
 * 配置logger
 */
export function init() {
  log4js.configure({
    appenders: {
      console: {
        type: 'stdout',
      },
    },
    categories: {
      default: {
        appenders: ['console'],
        level: 'debug',
      },
    },
  });
}
