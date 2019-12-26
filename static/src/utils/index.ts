/**
 * 节流
 * @param func 函数
 * @param delay 延迟
 */
export function throttle(func: Function, delay: number) {
  let timer;
  let start = Date.now();

  return function(...args) {
    clearTimeout(timer);
    const cur = Date.now();
    if (cur > start + delay) {
      func.call(this, ...args);
      start = cur;
    } else {
      timer = setTimeout(() => {
        func.call(this, ...args);
      }, delay);
    }
  };
}

/**
 * 防抖
 * @param func 函数
 * @param delay 延时
 * @param immediate 是否立即执行
 */
export function debounce(func: Function, delay: number, immediate = false) {
  let timer;

  return function(...args) {
    if (timer) clearTimeout(timer);
    if (immediate) {
      const callNow = !timer;
      timer = setTimeout(() => {
        timer = null;
      }, delay);
      if (callNow) func.call(this, ...args);
    } else {
      timer = setTimeout(() => {
        func.call(this, ...args);
      }, delay);
    }
  };
}
