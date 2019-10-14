import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import * as reducers from 'reducers';

const _reducers = combineReducers({ ...reducers });
// 开启chrome redux-dev-tool调试
const extension = (window as any).__REDUX_DEVTOOLS_EXTENSION__;
const devTool = extension ? extension() : (f: any) => f;

const enhancer = compose(
  applyMiddleware(thunk),
  devTool
);

export default createStore(_reducers, enhancer);
