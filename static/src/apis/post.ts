import { get, post } from 'utils/request';

/**
 * 获取帖子列表
 * @param pageNo 页码
 * @param pageSize 页容
 */
export function getPostList(pageNo = 1, pageSize = 10) {
  return get('/api/post', { pageNo, pageSize });
}

/**
 * 获取帖子
 * @param id 帖子id
 */
export function getPost(id: number) {
  return get(`/api/post/${id}`);
}
