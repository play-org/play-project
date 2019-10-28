import { post } from 'utils/request';
/**
 * 登录
 * @param username 用户名
 * @param password 密码
 */
export function login(username, password) {
  return post('/api/login', { username, password });
}
