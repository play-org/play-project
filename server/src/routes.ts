import site from './controllers/site';
import index from './controllers/index';
import user from './controllers/user';
import transform from './controllers/transform';
import book from './controllers/book';

export default {
  '/': site,
  '/api': index,
  '/api/user': user,
  '/api/transform': transform,
  '/api/book': book,
};
