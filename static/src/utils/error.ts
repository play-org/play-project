const REQUEST_STATUS = {
  SUCCESS: 200,
  MULTIPLE_CHOICES: 300,
  NOT_MODIFY: 304,
  ABORT: 400,
  ERROR: 500,
  TIMEOUT: 504,
};

const REQUEST_CODE = {
  SUCCESS: 200,
  ABORT: 1000,
  TIMEOUT: 1001,
  ERROR: 1002,
};

const REQUEST_MSG = {
  TIMEOUT: '请求超时',
  ERROR: '未知错误',
  ABORT: '请求被取消',
};

/**
 * FetchError类
 */
export class FetchError extends Error {
  private status: number = REQUEST_STATUS.SUCCESS;

  private code: string | number = REQUEST_CODE.SUCCESS;

  stack: string | undefined = undefined;

  constructor(
    code: string | number,
    status: number,
    msg: string,
    stack?: string | null
  ) {
    super(msg);
    this.code = code;
    this.status = status;
    if (stack) this.stack = stack;
  }
}

/**
 * 获取Error对象
 * @param type error类型
 */
export function getFetchError(type: 'ERROR' | 'TIMEOUT' | 'ABORT') {
  return new FetchError(
    REQUEST_CODE[type],
    REQUEST_STATUS[type],
    REQUEST_MSG[type]
  );
}
