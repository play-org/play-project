import fs from 'fs';
import path from 'path';

const config: Record<string, any> = {};

/**
 * 加载 json
 * @param filename 文件名
 */
function loadJSON(filename: string) {
  const content = fs.readFileSync(filename, 'utf8');
  return JSON.parse(content);
}

/**
 * 合并配置
 * @param conf1 被合并的配置
 * @param conf2 合并的配置
 */
function mergeConf(conf1: Record<string, any>, conf2: Record<string, any>) {
  for (const key in conf2) {
    if (Object.prototype.hasOwnProperty.call(conf2, key)) {
      const val = conf2[key];
      const type = Object.prototype.toString.call(val);
      if (type === '[object Object]') {
        if (!conf1[key]) conf1[key] = {};
        mergeConf(conf1[key], val);
      } else {
        conf1[key] = val;
      }
    }
  }
}

/**
 * 获取单项配置
 * @param conf 配置
 * @param key 键
 */
function getInternally(conf: Record<string, any>, key: string) {
  const keys = key.split('.');
  let result = conf;
  for (const k of keys) {
    result = result[k];
    if (result == null) return null;
  }
  return result;
}

/**
 * 设置单项配置
 * @param conf 配置
 * @param key 键
 * @param value 值
 */
function setInternally(conf: Record<string, any>, key: string, value: any) {
  const keys = key.split('.');
  const valKey = keys[keys.length - 1];
  let result = conf;
  for (let i = 0; i < keys.length - 1; i += 1) {
    result = result[keys[i]];
    if (result == null) break;
  }
  const type = Object.prototype.toString.call(result);
  if (result && type === '[object Object]') result[valKey] = value;
}

/**
 * 加载配置文件
 * @param serverConfPath 服务端配置
 * @param staticConfPath 前端配置
 * @param packagePath package.json路径
 * @param outConfPath config文件输出路径，方便调试
 */
export function load(
  serverConfPath: string,
  staticConfPath: string,
  packagePath: string,
  outConfPath: string
) {
  const serverConf = serverConfPath ? loadJSON(serverConfPath) : {};
  const staticConf = staticConfPath ? loadJSON(staticConfPath) : {};
  const packageConf = packagePath ? loadJSON(packagePath) : {};
  if (serverConf) {
    mergeConf(config, serverConf);
  }
  // 合并var/static.config.json配置
  if (staticConf) {
    mergeConf(config, { static: staticConf });
  }
  if (packageConf) {
    config.name = packageConf.name;
    config.version = packageConf.version;
  }
  const configFile = outConfPath || path.resolve(__dirname, './config.json');
  fs.writeFileSync(configFile, JSON.stringify(config, null, '  '), 'utf8');
  console.info('[CONFIG] The Configuration Center Has Been Loaded.');
  if (process.env.NODE_ENV === 'development') {
    // 打印配置中心内容，方便在控制台查看配置内容
    console.info(JSON.stringify(config));
  }
  return config;
}

/**
 * 获取配置
 * @param key 键
 */
export function get(key: string) {
  return getInternally(config, key);
}

/**
 * 设置配置
 * @param key 键
 * @param value 值
 */
export function set(key: string, value: any) {
  setInternally(config, key, value);
}
