import { get, post } from 'utils/request';

export function getPostList(pageNo = 1, pageSize = 10) {
  return get('/api/post', { pageNo, pageSize });
}
