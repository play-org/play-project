/**
 * ajax 工具封装
 * 1. 兼容 fetch 和 xhr
 */
import * as qs from './query-string';
import { isString } from './check-types';
import { getFetchError, FetchError } from './error';

export type RequestMethod =
  | 'GET'
  | 'HEAD'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  | 'DELETE'
  | 'OPTIONS';

export type RequestHeaders = Record<string, string>;

interface RequestOptions {
  // 是否强制用 xhr 处理请求
  useAjax?: boolean;
  // 方法
  method?: RequestMethod;
  // 请求头
  headers?: RequestHeaders;
  // 是否跨域
  cors?: boolean;
  // cookie
  credentials?: boolean;
  // 超时
  timeout?: number;
}

export interface ResponseData {
  success: boolean;
  statusCode: number;
  errorcode: string | number;
  errormsg: string | null;
  errorstack: string | null;
  nativecode: string | null;
  data: any | null;
}

const CONTENT_TYPE = {
  JSON: 'application/json',
  TEXT: 'text/plain',
  URLENCODED: 'application/x-www-form-urlencoded',
  form: 'multipart/form-data',
};
class Request {
  private _url;

  private _data;

  private _headers;

  // 方法
  private method;

  // 超时
  private timeout;

  // 强制使用 ajax
  private useAjax: boolean;

  // 跨域
  private cors: boolean;

  // 携带 cookie
  private credentials: boolean;

  // 超时 handler
  private fetchTimeoutTimer: number | undefined;

  // xhr handler
  private xhr: XMLHttpRequest | null | undefined;

  constructor(url: string, data: any, options: RequestOptions) {
    this.method = options.method || 'GET';
    this.useAjax = options.useAjax || false;
    this.credentials = options.credentials || false;
    this.timeout = options.timeout || 0;
    this.cors = options.cors || false;
    this.headers = options.headers || {};
    this.data = data;
    this.url = this.resolveUrl(url, data);
  }

  // 是否是带 query 参数的请求
  isQuery() {
    return ['GET', 'HEAD'].includes(this.method);
  }

  // 将 get, head 请求的数据拼接到 url
  resolveUrl(url: string, data: any) {
    if (this.isQuery() && data) {
      if (isString(data)) {
        url += /^\?/.test(data) ? data : `?${data}`;
      } else {
        url += `?${qs.stringify(data)}`;
      }
    }
    return url;
  }

  get url() {
    return this._url;
  }

  set url(val: string) {
    this._url = val;
    if (/^(?:http[s]?:)?\/\/(.*?)/i.test(val)) {
      const domain = RegExp.$1;
      // 当 api 接口域名与当前页面域名不一致，说明存在跨域请求
      // 跨域请求，设置 cors 属性为 true
      if (domain !== location.hostname) {
        this.cors = true;
      }
    }
  }

  get data() {
    return this._data;
  }

  set data(val: any) {
    // GET/HEAD 请求，参数已序列化在url上
    if (this.isQuery() || val == null) {
      this._data = null;
      return;
    }
    // json 请求数据，序列化
    if (this.headers['Content-Type'] === CONTENT_TYPE.JSON) {
      this._data = JSON.stringify(val);
      return;
    }

    // url编码的表单数据，querystring 格式化
    if (this.headers['Content-Type'] === CONTENT_TYPE.URLENCODED) {
      this._data = qs.stringify(val);
      return;
    }
    this._data = val;
  }

  get headers() {
    return this._headers;
  }

  set headers(val: Record<string, any>) {
    this._headers = { 'Content-Type': CONTENT_TYPE.JSON, ...val };
    // 拿到 headers 中的 ContentType
    const contentType = this.headers['Content-Type'];
    switch (contentType) {
      case CONTENT_TYPE.JSON:
        this._headers.Accept = CONTENT_TYPE.JSON;
        break;
      case CONTENT_TYPE.TEXT:
        this._headers.Accept = CONTENT_TYPE.TEXT;
        break;
      default:
        this.headers.Accept = '*/*';
    }
  }

  request() {
    if (window.fetch && !this.useAjax) {
      return this.requestByFetch();
    }
    return this.requestByXHR();
  }

  private async requestByFetch() {
    const settings: RequestInit = {
      body: this.data != null ? this.data : undefined,
      method: this.method,
      headers: this.headers,
      credentials: this.credentials ? 'include' : undefined,
      mode: this.cors ? 'cors' : undefined,
      cache: 'default',
    };

    const tasks: Array<Promise<any>> = [];
    // 超时
    if (this.timeout) tasks.push(this.createFetchTimeout());
    // 模拟 abort
    const { abortPromise, abort } = this.createFetchAbort();
    const fetchPromise = window
      .fetch(this.url, settings)
      .then(res => this.onFetchLoad(res))
      .catch(err => this.onFetchError(err));

    tasks.push(abortPromise, fetchPromise);
    const promise = Promise.race(tasks);
    // 挂载 abort 方法，便于外部手动 abort 请求
    (promise as any).abort = abort;

    return promise;
  }

  private createFetchTimeout(): Promise<FetchError> {
    return new Promise((_resolve, reject) => {
      this.fetchTimeoutTimer = window.setTimeout(() => {
        const err = getFetchError('TIMEOUT');
        reject(err);
      }, this.timeout);
    });
  }

  private createFetchAbort() {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    let abort: () => void = () => {};
    const abortPromise = new Promise((_resolve, reject) => {
      abort = () => {
        const err = getFetchError('ABORT');
        reject(err);
      };
    });
    return { abortPromise, abort };
  }

  private onFetchLoad(res: Response) {
    this.finallyFetch();
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      const { status } = res;

      const result = await this.parseFetchData(res);
      if ((status < 200 || status > 300) && status !== 304) {
        const err = getFetchError('ERROR');
        reject(err);
      } else {
        resolve(this.parseResponse(result));
      }
    });
  }

  private onFetchError(err) {
    this.finallyFetch();
    throw err;
  }

  private finallyFetch() {
    if (this.fetchTimeoutTimer) {
      window.clearTimeout(this.fetchTimeoutTimer);
      this.fetchTimeoutTimer = 0;
    }
  }

  private parseFetchData(res: Response) {
    let result;
    switch (this.headers.Accept) {
      case CONTENT_TYPE.JSON:
        result = res.json();
        break;
      case CONTENT_TYPE.TEXT:
        result = res.text();
        break;
      default:
        result = '';
        break;
    }
    return result;
  }

  private async requestByXHR() {
    const xhr = new XMLHttpRequest();
    this.xhr = xhr;
    xhr.withCredentials = this.credentials;
    xhr.open(this.method, this.url);

    for (const name in this.headers) {
      if (Object.prototype.hasOwnProperty.call(this.headers, name)) {
        xhr.setRequestHeader(name, this.headers[name]);
      }
    }

    // 包装 Promise 异步模式
    const promise = new Promise<any>((resolve, reject) => {
      // 错误事件捕捉
      xhr.onerror = this.onXHRError(reject);
      // 取消请求事件捕捉
      xhr.onabort = this.onXHRAbort(reject);
      // 超时限制
      if (this.timeout) {
        xhr.timeout = this.timeout;
        xhr.ontimeout = this.onXHRTimeout(reject);
      }
      xhr.onload = this.onXHRLoad(resolve, reject);
    });

    xhr.send(this.data);

    // 挂载 abort 方法，便于外部手动 abort 请求
    (promise as any).abort = xhr.abort;

    return promise;
  }

  private onXHRLoad(
    resolve: (value?: any) => void,
    reject: (reason?: any) => void
  ) {
    return () => {
      if (!this.xhr) return;
      const { xhr } = this;
      if (xhr.readyState === 4) {
        this.finallyXHR();

        let result: any = xhr.responseText || '';
        if (this.headers.Accept === CONTENT_TYPE.JSON) {
          result = result ? JSON.parse(result) : {};
        }

        const { status } = xhr;
        // <200 || >=300 异常 http status，抛出错误
        if (status < 200 || (status >= 300 && status !== 304)) {
          const err = getFetchError('ERROR');
          reject(err);
        } else {
          resolve(this.parseResponse(result));
        }
      }
    };
  }

  private onXHRError(reject: (reason?: any) => void) {
    return () => {
      const err = getFetchError('ERROR');
      reject(err);
      this.finallyXHR();
    };
  }

  private onXHRAbort(reject: (reason?: any) => void) {
    return () => {
      const err = getFetchError('ABORT');
      reject(err);
      this.finallyXHR();
    };
  }

  private onXHRTimeout(reject: (reason?: any) => void) {
    return () => {
      const err = getFetchError('TIMEOUT');

      reject(err);
      this.finallyXHR();
    };
  }

  private finallyXHR() {
    if (!this.xhr) return;
    // 释放 xhr
    this.xhr = null;
  }

  parseResponse(result) {
    if (this.headers.Accept === CONTENT_TYPE.JSON) {
      if (Object.prototype.hasOwnProperty.call(result, 'success')) {
        return result.data;
      }
    }
    return result;
  }
}

function request(url, data, options: RequestOptions) {
  const req = new Request(url, data, options);
  return req
    .request()
    .then(data => {
      return data;
    })
    .catch(error => {
      throw error;
    });
}
// head
function head(url: string, data?: any, options: RequestOptions = {}) {
  options.method = 'HEAD';
  return request(url, data, options);
}
// get
function get(url: string, data?: any, options: RequestOptions = {}) {
  options.method = 'GET';
  return request(url, data, options);
}
// post
function post(url: string, data?: any, options: RequestOptions = {}) {
  options.method = 'POST';
  return request(url, data, options);
}
// put
function put(url: string, data?: any, options: RequestOptions = {}) {
  options.method = 'PUT';
  return request(url, data, options);
}
// patch
function patch(url: string, data?: any, options: RequestOptions = {}) {
  options.method = 'PATCH';
  return request(url, data, options);
}
// delete
function del(url: string, data?: any, options: RequestOptions = {}) {
  options.method = 'DELETE';
  return request(url, data, options);
}
// options
function options(url: string, options: RequestOptions = {}) {
  options.method = 'OPTIONS';
  return request(url, null, options);
}

export { get, head, options, post, put, patch, del };

export default request;
