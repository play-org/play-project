import site from './controllers/site';
import index from './controllers/index';
import user from './controllers/user';
import transform from './controllers/transform';

export default {
  '/': site,
  '/api': index,
  '/api/user': user,
  '/api/transform': transform,
};
