import site from './controllers/site';
import index from './controllers/index';
import user from './controllers/user';
// import transform from './controllers/transform';
import post from './controllers/post';

export default {
  '/': site,
  '/api': index,
  '/api/user': user,
  '/api/post': post,
  // '/api/transform': transform,
};
