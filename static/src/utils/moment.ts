/**
 * 时间，日期辅助函数
 */
import { isDate } from './check-types';
/**
 * 格式化日期
 * @param val 时间戳/时间字符串
 * @param format 格式化字符串 yyyy-MM-dd HH:mm:ss
 */
export function formatDate(val: number | string | Date, fmt?: string) {
  const date = isDate(val) ? (val as Date) : val ? new Date(val) : new Date();
  fmt = fmt || 'yyyy-MM-dd HH:mm:ss';
  const obj = {
    y: date.getFullYear(), // 年份，注意必须用getFullYear
    M: date.getMonth() + 1, // 月份，注意是从0-11
    d: date.getDate(), // 日期
    w: date.getDay(), // 星期，注意是0-6
    H: date.getHours(), // 24小时制
    h: date.getHours() % 12 == 0 ? 12 : date.getHours() % 12, // 12小时制
    m: date.getMinutes(), // 分钟
    s: date.getSeconds(), // 秒
    S: date.getMilliseconds(), // 毫秒
  };
  for (const i in obj) {
    fmt = fmt.replace(new RegExp(i + '+', 'g'), function(m) {
      let val = obj[i] + '';
      for (let j = 0, len = val.length; j < m.length - len; j++)
        val = '0' + val;
      return m.length == 1 ? val : val.substring(val.length - m.length);
    });
  }
  return fmt;
}

// 0未开始，1已开始，2已结束
export type counterType = 0 | 1 | 2;

/**
 * 转换倒计时字符串
 * @param remainTimeStamp 剩余时间戳
 */
function transformCountDownStr(remainTimeStamp: number) {
  remainTimeStamp = remainTimeStamp / 1000;
  const day = Math.floor(remainTimeStamp / 3600 / 24);
  const hour = Math.floor((remainTimeStamp % (3600 * 24)) / 3600);
  const minute = Math.floor(((remainTimeStamp % (3600 * 24)) % 3600) / 60);
  const second = Math.floor(((remainTimeStamp % (3600 * 24)) % 3600) % 60);
  return `${day}天${hour}时${minute}分${second}秒`;
}

/**
 * 倒计时定时器
 * @param serverTime 服务端时间
 * @param limitStartTime 活动开始时间
 * @param limitEndTime 活动结束时间
 * @param cb 回调
 */
export function calCountDown(
  serverTime: number | string,
  limitStartTime: number | string,
  limitEndTime: number | string,
  countDownStrCallback: (countDownStr: string) => void,
  countDownTypeCallback?: (countType: counterType) => void
) {
  const serverTimeStamp =
    Math.floor(new Date(serverTime).getTime() / 1000) * 1000;
  const limitStartTimeStamp = new Date(limitStartTime).getTime();
  const limitEndTimeStamp = new Date(limitEndTime).getTime();

  // 客户端启动倒计时的时间戳
  const clientTimeStamp = new Date().getTime();
  // setTimeout的时间间隔
  const interval = 1000;
  // 触发setTimeout的次数
  let count = 0;
  // 剩余的时间戳
  let remainTimeStamp = 0;
  // 倒计时的类型
  let type: counterType = 0;
  let timer;
  // 初始化剩余时间戳和类型
  if (serverTimeStamp < limitStartTimeStamp) {
    remainTimeStamp = limitStartTimeStamp - serverTimeStamp;
    type = 0;
  } else if (serverTimeStamp < limitEndTimeStamp) {
    remainTimeStamp = limitEndTimeStamp - serverTimeStamp;
    type = 1;
  } else {
    type = 2;
  }

  // 倒计时函数
  function countDown() {
    // 计数+1
    count++;
    // 时间误差偏移
    const offset = new Date().getTime() - (clientTimeStamp + count * interval);
    // 下次触发setTimeout的时间间隔
    let nextTime = interval - offset;
    // 立即触发
    if (nextTime < 0) nextTime = 0;
    // 核心逻辑
    if (remainTimeStamp > 0) {
      remainTimeStamp = remainTimeStamp - interval;
      countDownStrCallback(
        `${transformCountDownStr(remainTimeStamp)}${
          type == 0 ? '后开始' : '后结束'
        }`
      );
      // console.log(`${remainTimeStamp}${type == 0 ? '后开始' : '后结束'}`);
      timer = setTimeout(countDown, nextTime);
    } else {
      // 如果剩余时间戳<=0，判断状态改变
      if (type == 0) {
        remainTimeStamp = limitEndTimeStamp - limitStartTimeStamp;
        type = 1;
        timer = setTimeout(countDown, nextTime);
      } else {
        type = 2;
        countDownStrCallback(`已结束`);
      }
      countDownTypeCallback && countDownTypeCallback(type);
    }
  }
  timer = setTimeout(countDown, interval);
  const res: { clear: Function; getType: Function } = {
    clear() {
      clearTimeout(timer);
    },
    getType() {
      return type;
    },
  };
  return res;
}
