import { isString, isObject } from './check-types';

/**
 * 解析query-string
 * @param str query字符串
 * @param sep 参数组分隔符，默认是&
 * @param eq key-value分隔符，默认是=
 */
export function parse(str: string, sep: string = '&', eq: string = '=') {
  const obj: Record<string, any> = {};
  // 传入不合法直接返回空对象
  if (!str || !isString(str)) return obj;
  // 剥除url上的search之前部分
  str = str.replace(/.*?\?/, '');
  const groups = str.split(sep);
  for (const group of groups) {
    const keyvalue = group.split(eq);
    var key = decodeURIComponent(keyvalue[0]);
    var value = decodeURIComponent(keyvalue[1]);
    // only key
    if (keyvalue.length === 1) {
      obj[key] = false;
      continue;
    }
    // array
    if (obj[key] !== void 0) {
      if (!Array.isArray(obj[key])) {
        obj[key] = [obj[key]];
      }
      obj[key].push(value);
      continue;
    }
    // obj
    obj[key] = value;
  }
  return obj;
}
/**
 * 格式化query字符串
 * @param obj query对象
 * @param sep 参数组分隔符，默认是&
 * @param eq key-value分隔符，默认是=
 */
export function stringify(obj: Record<string, any>, sep = '&', eq = '=') {
  // 对象，数组，字符串
  if (!obj || !isObject(obj)) return '';
  const qs: string[] = [];
  const keys = Object.keys(obj);
  for (const key of keys) {
    const value = obj[key];
    // array
    if (Array.isArray(value)) {
      const ks = value.map((val: any) => {
        return [encodeURIComponent(key), encodeURIComponent(val)].join(eq);
      });
      qs.push(...ks);
      continue;
    }
    if (key && value !== void 0) {
      qs.push([encodeURIComponent(key), encodeURIComponent(value)].join(eq));
    }
  }
  return qs.join(sep);
}
