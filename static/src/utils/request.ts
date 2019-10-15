/**
 * ajax 工具封装
 */

/**
 * 1. 兼容fetch和xhr
 * 2. 错误统一处理
 */

function request(url, data, options: any) {
  // ajax 和 fetch
  if (!window.fetch) {
    // fetch
    return fetch(url, options).then(res => res.json());
  } else {
    return new Promise((resolve, reject) => {
      // ajax
      var xhr = new XMLHttpRequest();
      xhr.open(options.method || 'get', url);
      xhr.setRequestHeader('Content-type', 'application/json');

      xhr.onload = function() {
        // 请求结束后,在此处写处理代码
        resolve(JSON.parse(xhr.responseText));
      };
      xhr.send(JSON.stringify(data));
    });
  }
}

function get(url: string, data, options: any) {
  return request(url, null, { method: 'get' });
}

function post(url: string, data, options: any) {
  return request(url, data, { method: 'post' });
}

export { get, post };
export default request;
